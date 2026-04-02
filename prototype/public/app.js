/* ===================================================
   MOVEWORKS AI ASSISTANT DEMO — app.js
   =================================================== */

const conversationHistory = [];
let isStreaming = false;

// ── TOOLTIP ENGINE ────────────────────────────────────
// Single fixed div appended to <body> — never clipped
// by any parent overflow:hidden / overflow:auto
(function initTooltips() {
  const tip = document.createElement('div');
  tip.id = 'mw-tooltip';
  document.body.appendChild(tip);

  let hideTimer = null;

  function showTip(el) {
    const text = el.getAttribute('data-tooltip');
    if (!text) return;

    clearTimeout(hideTimer);
    tip.classList.remove('visible', 'arrow-left', 'arrow-right');
    tip.textContent = text;

    // Move off-screen first so offsetWidth reflects new content
    // without a visible flash — NO inline opacity (that would
    // override the .visible class and keep the tooltip invisible)
    tip.style.left = '-9999px';
    tip.style.top  = '-9999px';
    void tip.offsetWidth; // force layout so dimensions are accurate

    const tipW = tip.offsetWidth || 240;
    const tipH = tip.offsetHeight || 72;
    const GAP  = 12;
    const VP_W = window.innerWidth;
    const VP_H = window.innerHeight;
    const rect = el.getBoundingClientRect();

    // Prefer LEFT of element — intel panel is on the right edge,
    // so there's always room in the chat area to the left
    let left = rect.left - tipW - GAP;
    let arrowClass = 'arrow-right'; // arrow points → toward the element

    if (left < 8) {
      // Fall back to right of element
      left = rect.right + GAP;
      arrowClass = 'arrow-left';
    }

    // Clamp horizontal so tooltip never exits viewport right
    if (left + tipW > VP_W - 8) left = VP_W - tipW - 8;

    // Vertical: center on element, clamp within viewport
    let top = rect.top + rect.height / 2 - tipH / 2;
    if (top < 8) top = 8;
    if (top + tipH > VP_H - 8) top = VP_H - tipH - 8;

    tip.style.left = left + 'px';
    tip.style.top  = top  + 'px';
    tip.classList.add(arrowClass, 'visible');
  }

  function hideTip() {
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => tip.classList.remove('visible'), 120);
  }

  // Use event delegation on the whole document so dynamically
  // created elements (system-item, reasoning-step) are covered
  document.addEventListener('mouseover', e => {
    const target = e.target.closest('[data-tooltip]');
    if (target) showTip(target);
  });

  document.addEventListener('mouseout', e => {
    const target = e.target.closest('[data-tooltip]');
    if (target) hideTip();
  });

  // Hide on scroll inside any panel (tooltip position would be stale)
  document.addEventListener('scroll', hideTip, true);
})();

// ── SEND MESSAGE ──────────────────────────────────────
async function sendMessage() {
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text || isStreaming) return;

  input.value = '';
  input.style.height = 'auto';
  setStreamingState(true);

  appendMessage('user', text);
  conversationHistory.push({ role: 'user', content: text });

  const typingEl = showTypingIndicator();
  resetIntelPanel();

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: conversationHistory }),
    });

    if (!response.ok) throw new Error(`Server error: ${response.status}`);

    typingEl.remove();

    const msgEl = appendStreamingMessage();
    const bubbleEl = msgEl.querySelector('.msg-bubble');

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    let fullText = '';
    let jsonParsed = false;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop();

      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        const raw = line.slice(6).trim();
        if (!raw) continue;

        try {
          const event = JSON.parse(raw);

          if (event.type === 'token') {
            fullText += event.text;
            // Try to parse JSON as it streams — show response text progressively
            if (!jsonParsed) {
              const extracted = tryExtractResponse(fullText);
              if (extracted !== null) {
                jsonParsed = true;
                bubbleEl.innerHTML = formatResponse(extracted) + '<span class="streaming-cursor"></span>';
                scrollToBottom();
              }
            } else {
              // Update the response text progressively
              const extracted = tryExtractResponse(fullText);
              if (extracted !== null) {
                bubbleEl.innerHTML = formatResponse(extracted) + '<span class="streaming-cursor"></span>';
                scrollToBottom();
              }
            }
          }

          if (event.type === 'done') {
            fullText = event.full;
            const parsed = tryParseJSON(fullText);
            if (parsed) {
              bubbleEl.innerHTML = formatResponse(parsed.response);
              updateIntelPanel(parsed);
              conversationHistory.push({ role: 'assistant', content: fullText });
            } else {
              bubbleEl.innerHTML = formatResponse(fullText);
              conversationHistory.push({ role: 'assistant', content: fullText });
            }
            scrollToBottom();
          }

          if (event.type === 'error') {
            bubbleEl.textContent = 'An error occurred. Please try again.';
          }
        } catch (_) { /* skip malformed SSE lines */ }
      }
    }

  } catch (err) {
    typingEl?.remove();
    appendMessage('assistant', 'Sorry, I encountered an error: ' + err.message);
    console.error(err);
  } finally {
    setStreamingState(false);
  }
}

// ── QUICK SEND ────────────────────────────────────────
function sendQuick(text) {
  const input = document.getElementById('chatInput');
  input.value = text;
  autoResize(input);
  sendMessage();
}

// ── KEYBOARD ─────────────────────────────────────────
function handleKeyDown(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
}

function autoResize(el) {
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 160) + 'px';
}

// ── STREAMING STATE ───────────────────────────────────
function setStreamingState(streaming) {
  isStreaming = streaming;
  const btn = document.getElementById('sendBtn');
  const input = document.getElementById('chatInput');
  btn.disabled = streaming;
  input.disabled = streaming;
  document.querySelectorAll('.quick-btn').forEach(b => b.disabled = streaming);
}

// ── APPEND MESSAGES ───────────────────────────────────
function appendMessage(role, text) {
  const container = document.getElementById('chatMessages');
  const el = document.createElement('div');
  el.className = `message ${role}`;
  const initial = role === 'user' ? 'JR' : 'M';
  el.innerHTML = `
    <div class="msg-avatar">${initial}</div>
    <div class="msg-content">
      <div class="msg-bubble">${formatResponse(text)}</div>
      <div class="msg-time">${getTime()}</div>
    </div>`;
  container.appendChild(el);
  scrollToBottom();
  return el;
}

function appendStreamingMessage() {
  const container = document.getElementById('chatMessages');
  const el = document.createElement('div');
  el.className = 'message assistant streaming';
  el.innerHTML = `
    <div class="msg-avatar">M</div>
    <div class="msg-content">
      <div class="msg-bubble"><span class="streaming-cursor"></span></div>
      <div class="msg-time">${getTime()}</div>
    </div>`;
  container.appendChild(el);
  scrollToBottom();
  return el;
}

function showTypingIndicator() {
  const container = document.getElementById('chatMessages');
  const el = document.createElement('div');
  el.className = 'message assistant typing-indicator';
  el.innerHTML = `
    <div class="msg-avatar">M</div>
    <div class="msg-content">
      <div class="msg-bubble">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    </div>`;
  container.appendChild(el);
  scrollToBottom();
  return el;
}

// ── INTEL PANEL ───────────────────────────────────────
function resetIntelPanel() {
  document.getElementById('intentDisplay').innerHTML = '<span class="placeholder-text">Analyzing...</span>';
  document.getElementById('metConfidence').textContent = '—';
  document.getElementById('metUnderstanding').textContent = '—';
  document.getElementById('metRetrieval').textContent = '—';
  document.getElementById('metActionType').textContent = '—';
  document.getElementById('barConfidence').style.width = '0%';
  document.getElementById('barUnderstanding').style.width = '0%';
  document.getElementById('reasoningSteps').innerHTML = '<div class="reasoning-placeholder">Processing...</div>';
  document.getElementById('systemsList').innerHTML = '<div class="systems-placeholder">Querying systems...</div>';
  // Reset safety
  ['safetyPII', 'safetyAuth', 'safetyPrompt', 'safetyAudit'].forEach(id => {
    const el = document.getElementById(id);
    el.className = 'safety-item ok';
    el.querySelector('.safety-icon').textContent = '✓';
    el.querySelector('.safety-status').textContent = 'Checking...';
  });
}

function updateIntelPanel(parsed) {
  const m = parsed.ml_metrics || {};
  const steps = parsed.reasoning_steps || [];
  const systems = parsed.systems_accessed || [];
  const flags = m.safety_flags || [];

  // Intent
  const intent = m.intent || 'unknown';
  document.getElementById('intentDisplay').innerHTML =
    `<div class="intent-badge">🎯 ${escHtml(intent)}</div>`;

  // Metrics
  const conf = parseFloat(m.confidence) || 0;
  const confPct = Math.round(conf * 100);
  document.getElementById('metConfidence').textContent = confPct + '%';
  document.getElementById('barConfidence').style.width = confPct + '%';
  document.getElementById('barConfidence').style.background = confPct >= 90 ? 'var(--mw-green)' : confPct >= 75 ? 'var(--accent-yellow)' : 'var(--accent-red)';

  const und = parseInt(m.understanding_score) || 0;
  document.getElementById('metUnderstanding').textContent = und + '/100';
  document.getElementById('barUnderstanding').style.width = und + '%';

  document.getElementById('metRetrieval').textContent = (m.retrieval_hits ?? '—').toString();

  const actionType = m.action_type || 'autonomous';
  const actionEl = document.getElementById('metActionType');
  actionEl.textContent = actionType.replace(/_/g, ' ');
  actionEl.className = 'metric-value small action-' + (
    actionType === 'autonomous' ? 'autonomous' :
    actionType === 'confirmation_required' ? 'confirmation' : 'escalation'
  );

  // Reasoning Steps
  const stepsEl = document.getElementById('reasoningSteps');
  if (steps.length === 0) {
    stepsEl.innerHTML = '<div class="reasoning-placeholder">No reasoning steps captured.</div>';
  } else {
    stepsEl.innerHTML = steps.map((s, i) => `
      <div class="reasoning-step"
        data-tooltip="Step ${i + 1} of the agentic reasoning loop: the model's internal decision at this point in the chain-of-thought before selecting a tool or generating a response.">
        <div class="step-num">${i + 1}</div>
        <div class="step-text">${escHtml(s)}</div>
      </div>`).join('');
  }

  // Systems
  const sysEl = document.getElementById('systemsList');
  if (systems.length === 0) {
    sysEl.innerHTML = '<div class="systems-placeholder">No external systems accessed.</div>';
  } else {
    sysEl.innerHTML = systems.map(s => `
      <div class="system-item"
        data-tooltip="${escAttr(s.system + ': ' + (s.action || '') + (s.latency_ms ? ' — ' + s.latency_ms + 'ms API latency' : ''))}">
        <div class="system-header">
          <div class="system-name">${escHtml(s.system)}</div>
          <div class="system-latency">${s.latency_ms ? s.latency_ms + 'ms' : ''}</div>
        </div>
        <div class="system-action">${escHtml(s.action || '')}</div>
        <div class="system-result">${escHtml(s.result || '')}</div>
      </div>`).join('');
  }

  // Safety
  const statusMap = {
    safetyPII: 'PII Detection',
    safetyAuth: 'Authorization Check',
    safetyPrompt: 'Prompt Safety',
    safetyAudit: 'Audit Logged',
  };

  ['safetyPII', 'safetyAuth', 'safetyPrompt', 'safetyAudit'].forEach(id => {
    const el = document.getElementById(id);
    const hasFlag = flags.some(f => f.toLowerCase().includes(id.replace('safety', '').toLowerCase()));
    if (hasFlag) {
      el.className = 'safety-item warn';
      el.querySelector('.safety-icon').textContent = '⚠';
      el.querySelector('.safety-status').textContent = 'Flagged';
    } else {
      el.className = 'safety-item ok';
      el.querySelector('.safety-icon').textContent = '✓';
      const statusTexts = {
        safetyPII: 'Clean', safetyAuth: 'Passed',
        safetyPrompt: 'Clean', safetyAudit: 'Logged'
      };
      el.querySelector('.safety-status').textContent = statusTexts[id];
    }
  });
}

// ── JSON PARSING HELPERS ──────────────────────────────
function tryExtractResponse(raw) {
  try {
    const cleaned = raw.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();
    const parsed = JSON.parse(cleaned);
    if (parsed && parsed.response) return parsed.response;
  } catch (_) {}

  // Try extracting response field from partial JSON
  const match = raw.match(/"response"\s*:\s*"((?:[^"\\]|\\.)*)"/s);
  if (match) {
    try {
      return JSON.parse('"' + match[1] + '"');
    } catch (_) {
      return match[1].replace(/\\n/g, '\n').replace(/\\"/g, '"');
    }
  }
  return null;
}

function tryParseJSON(raw) {
  try {
    const cleaned = raw.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();
    const parsed = JSON.parse(cleaned);
    if (parsed && parsed.response) return parsed;
  } catch (_) {}
  return null;
}

// ── FORMATTING ────────────────────────────────────────
function formatResponse(text) {
  if (!text) return '';
  return escHtml(text)
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code style="background:rgba(0,195,122,0.1);padding:1px 5px;border-radius:3px;font-family:monospace;font-size:12px;color:var(--mw-green)">$1</code>')
    .replace(/\n\n/g, '<br><br>')
    .replace(/\n/g, '<br>');
}

function escHtml(str) {
  if (typeof str !== 'string') return String(str);
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// For data-tooltip attribute values — must escape quotes and ampersands
function escAttr(str) {
  if (typeof str !== 'string') return String(str);
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function scrollToBottom() {
  const el = document.getElementById('chatMessages');
  el.scrollTop = el.scrollHeight;
}
