# Winning the Enterprise Front Door: A Core ML Strategy for the Moveworks AI Assistant

**A Strategic Product Vision for the Moveworks Business Unit at ServiceNow**

Prepared by: Rahul Mishra | Date: April 2026 | Prepared for: ServiceNow — Moveworks Business Unit

---

## Table of Contents
1. Executive Summary
2. The Problem Statement
3. Market & Competitive Landscape
4. Strategic Vision: The Enterprise Front Door
5. Use Cases & Employee Journey
6. Core ML Architecture
7. ML Performance Framework: Latency, Accuracy, Relevance
8. Phased Roadmap
9. Go-to-Market & Adoption Strategy
10. KPIs & Success Metrics
11. Risks & Mitigations
12. Appendix: Sources & References

---

## 1. Executive Summary

**Purpose of this document:** This paper outlines a strategic product vision and execution roadmap for the Moveworks AI Assistant — covering the employee experience, the agentic reasoning architecture, and the Core ML investments required to make the AI Assistant the daily front door for every enterprise employee. It is written to ground product strategy in user reality, competitive dynamics, and ML fundamentals — and to translate that into a concrete roadmap with clear success metrics.

---

Enterprise employees spend an estimated 20% of their workweek — one full day — searching for information, waiting for IT requests to be resolved, navigating HR processes, and chasing approvals across fragmented systems (McKinsey Global Institute, 2025 Knowledge Worker Productivity Study). At a 10,000-person company, that is 2,000 person-days of productivity lost every week — not to meaningful work, but to the invisible friction of navigating the modern enterprise. The irony is that almost all of this work is automatable. The knowledge exists inside the organization. The systems exist. The gap is a front door that can understand what an employee actually needs and act on it — across every system, in natural language, in seconds.

Moveworks was built to close that gap. The acquisition by ServiceNow in 2023 created the most powerful enterprise AI platform in the world: Moveworks' conversational AI and reasoning layer fused with ServiceNow's ITSM backbone, workflow orchestration, and access to 8,100 enterprise customers. The opportunity is not incremental. It is categorical: **building the AI layer that sits in front of every enterprise system and becomes the single most-used application in the organization.**

The strategic imperative is grounded in three realities. First, the AI assistant market is at an inflection point. Microsoft Copilot has 300 million Microsoft 365 seats to push its assistant through — and is doing so aggressively. Google Gemini is embedding into Workspace at the same scale. But both are productivity-surface assistants, not enterprise-action assistants. They help employees write emails and summarize documents. They do not resolve an IT ticket, approve a time-off request, trigger an onboarding workflow, or provision software access. **That action layer is where Moveworks wins — or loses.** Second, agentic AI has arrived. The wave of single-turn LLM chatbots is already obsolete. Employees do not want a Q&A bot. They want an AI that understands their intent, determines the right sequence of actions, calls the right enterprise systems, and returns with a completed outcome — not a list of links. The Core ML architecture required to deliver that reliably at enterprise scale — multi-step reasoning, enterprise-grounded retrieval, tool orchestration, safety rails, and real-time performance — is the hardest problem in enterprise AI and the deepest moat Moveworks can build. Third, daily usage is the metric that matters. An AI assistant that employees use once and abandon changes nothing. An AI assistant that employees open first thing every morning — before email, before Slack, before their ticketing system — is transformational. Winning the Front Door means being so reliably useful, so fast, and so understanding that the AI Assistant becomes the default interface to enterprise work.

The strategy rests on three pillars: **Understand** (achieve state-of-the-art NLU for the full breadth of enterprise intents across all domains and languages), **Reason** (build agentic multi-step reasoning that completes goals, not just answers questions), and **Act** (execute reliably across 500+ enterprise system integrations with human-in-the-loop escalation where stakes require it). These pillars compound: better understanding generates richer signals for reasoning; better reasoning enables more reliable action; better action creates the usage data that trains better understanding.

The roadmap is three phases: **Foundation** (achieve best-in-class understanding quality and high-confidence action execution on the highest-frequency enterprise use cases), **Expansion** (extend agentic reasoning to complex multi-step workflows across all major enterprise verticals), **Leadership** (establish Moveworks as the definitive enterprise front door through proactive intelligence and cross-system workflow orchestration that no competitor can replicate).

This is not a chatbot product. It is the operating system for the modern enterprise workforce.

---

## 2. The Problem Statement

There is a pattern playing out inside every enterprise right now. An employee needs something — a software license, an answer about their benefits, a password reset, an approval to onboard a new vendor. They open a browser. They try to remember which system handles which request. They navigate to a portal, fill out a form, submit a ticket, and wait. Three days later, a human reviews the request, asks a clarifying question the form should have captured, and eventually resolves it. The employee spent 40 minutes on a task that should have taken 90 seconds.

Multiply this by 10,000 employees and 52 weeks, and you have the invisible tax of the modern enterprise — hundreds of thousands of person-hours annually spent on high-volume, low-complexity work that should be automated, but isn't.

The problem has four dimensions:

**Fragmentation.** The average large enterprise runs 364 SaaS applications (Okta Business at Work, 2025). No employee knows which system handles which request. IT tickets land in ServiceNow. HR requests go to Workday. Travel and expense flows through Concur. Knowledge lives in Confluence, SharePoint, and a dozen departmental wikis. Employees are expected to be the integration layer — and they consistently fail at it, because the cognitive load is unreasonable. Every system has a different interface, a different login, a different vocabulary.

**Intent-action distance.** Even when an employee knows which system to use, the distance between what they want to accomplish and the action required to accomplish it is enormous. "I need to add a direct report to my team" is a 12-step process across three systems: an HRIS update, an org chart approval, and a new hire onboarding workflow. "I need VPN access for a contractor" requires knowledge of which access provisioning form exists, which approvals are required, and which IT admin handles the queue. The intent is simple. The action is complex. No current system bridges this gap except a human.

**Knowledge inaccessibility.** Enterprise knowledge is distributed, inconsistently maintained, and buried in formats that require deep search expertise to surface. A new employee trying to understand the parental leave policy, a sales rep trying to find the enterprise pricing model, an engineer trying to understand the data retention policy for a new product — all of these require knowing where to look, how to search, and how to interpret results that are often outdated or contradictory. LLMs trained on general knowledge cannot answer these questions accurately. Only a system grounded in the organization's actual documents, policies, and data can.

**The human escalation bottleneck.** The consequence of all three above is that humans become the integration layer by default. IT helpdesk agents spend the majority of their time on requests that are fully documented and fully automatable. HR business partners field questions whose answers are in the employee handbook. This is expensive — fully loaded IT helpdesk costs average $22 per ticket (HDI Service and Support Practices Survey, 2025) — and it is demoralizing for the skilled employees doing it.

I experienced this exact problem at Amazon, building Alexa's next-generation agentic system. The moment we moved from single-turn Q&A to multi-step task completion — the moment the AI was expected to understand an intent and execute it across multiple systems — the complexity of the ML challenge increased by an order of magnitude. Understanding "remind me about my meeting tomorrow" is trivial. Understanding "reschedule my afternoon and brief the team on the change" requires intent disambiguation, calendar access, reasoning about priorities, draft communication generation, and multi-system execution — all within 2 seconds and with zero tolerance for error. The ML systems that can do this reliably are the ones that win. The ones that can't become demos that never get used twice.

Moveworks exists to solve this problem at enterprise scale. The question is not whether the problem is real — every CHRO, CIO, and CFO knows it is. The question is whether the ML foundation is strong enough to be trusted with it.

---

## 3. Market & Competitive Landscape

The enterprise AI assistant market is a $47B opportunity by 2029 (IDC, 2025 Enterprise AI Market Forecast), and it is the most contested terrain in enterprise software. Every major platform vendor — Microsoft, Google, Salesforce, SAP — is racing to embed AI assistance into their surfaces. A wave of AI-native startups — Glean, Guru, Leena AI, Aisera — is attacking from the bottom. Understanding where Moveworks wins, where it is exposed, and what the durable differentiation is requires honest competitive analysis.

### Microsoft Copilot
**Strength:** 300 million Microsoft 365 seats, deep integration with Office applications, Teams as the dominant enterprise communication surface, Azure AI infrastructure.  
**Limitation:** Copilot is a productivity-surface assistant, not an action assistant. It excels at document summarization, email drafting, and meeting recap. It does not resolve IT tickets, provision access, execute onboarding workflows, or integrate with non-Microsoft systems. It operates within the Microsoft ecosystem — enterprises with Workday, ServiceNow, SAP, and Salesforce get partial coverage at best.  
**Moveworks response:** Moveworks is action-native, system-agnostic, and purpose-built for enterprise workflow execution. Microsoft helps employees work on documents. Moveworks helps employees get things done across every system in the enterprise.

### Google Gemini for Workspace
**Strength:** Deep integration with Gmail, Docs, Meet, Drive. Multi-modal capabilities. Strong NLU from Google's research base.  
**Limitation:** Google Workspace assistant is, like Copilot, productivity-surface focused. Limited enterprise workflow execution outside Google's ecosystem. Enterprise customers running on non-Google infrastructure see minimal benefit from Gemini's action capabilities.  
**Moveworks response:** Same as Microsoft — the depth of enterprise action coverage and system integration breadth is the differentiator.

### Glean
**Strength:** Enterprise search with strong semantic retrieval, broad connector ecosystem (100+ integrations), growing AI assistant layer on top of search.  
**Limitation:** Glean's core motion is search, not action. It surfaces information but does not execute workflows. An employee can find the IT ticket form through Glean; they cannot submit and track resolution through it. The action layer is nascent.  
**Moveworks response:** Moveworks is action-native. Search is table stakes. The moat is completing the task, not surfacing documents about it.

### ServiceNow Now Assist (Organic)
**Strength:** Native ServiceNow integration, strong in ITSM and HRSD use cases, existing enterprise relationships, deep workflow engine.  
**Limitation:** Limited to ServiceNow's platform. Does not span cross-system workflows involving Workday, SAP, Salesforce, Okta, or other enterprise applications. Scope is the ServiceNow platform, not the enterprise as a whole.  
**Moveworks response:** The Moveworks + ServiceNow combination is the answer to this limitation. Moveworks provides the cross-system intelligence and conversational layer. ServiceNow provides the workflow backbone. Combined, the coverage is genuinely enterprise-wide in a way neither can achieve independently.

### Leena AI / Aisera
**Strength:** Focused enterprise AI assistant players, strong in specific verticals (HR, IT), growing agentic capability.  
**Limitation:** Scale, model quality, and enterprise trust at the level Moveworks and ServiceNow represent. Limited integration depth compared to the full Moveworks connector ecosystem.  
**Moveworks response:** Moveworks has 500+ enterprise integrations, a proven deployment track record at Fortune 500 scale, and is now backed by ServiceNow's infrastructure and customer relationships.

### The Durable Moat
Moveworks' sustainable competitive advantage is not any single feature. It is the combination of: **(1) proprietary enterprise action training data** — billions of enterprise interactions across IT, HR, finance, and operations that no competitor can replicate; **(2) 500+ pre-built enterprise integrations** with deep action depth, not just read-only connectors; **(3) agentic reasoning architecture** capable of multi-step, multi-system task completion; and **(4) ServiceNow's enterprise relationships and ITSM backbone** as the distribution and workflow engine. This combination is not achievable by any single competitor in a three-year window.

---

## 4. Strategic Vision: The Enterprise Front Door

The Moveworks AI Assistant has one north star: **become the first application every employee opens in the morning and the last one they close at night.**

This is not hyperbole. It is a precise, measurable, and achievable product goal — and it has a clear ML strategy behind it. The "Front Door" means that when an employee needs to accomplish anything inside their company — get help, find information, request access, submit an approval, onboard a new hire, understand a policy — they turn to the Moveworks AI Assistant before they open any other system. Not because they are required to. Because it is faster, smarter, and more reliable than any alternative.

Winning the Front Door requires mastery of four capabilities:

**Radical Understanding.** The AI Assistant must understand what an employee actually means — not what they typed. Enterprise language is idiomatic, domain-specific, multilingual, and often imprecise. "I can't get into the thing" should resolve to an IT access issue. "Need the doc from last quarter's all-hands" should surface the specific meeting recording and slide deck. "My new hire starts Monday" should trigger an onboarding workflow that spans IT provisioning, HR setup, and facilities access. The NLU model must achieve >95% intent accuracy across all enterprise domains — not 70%, which produces an assistant that fails one in three interactions and destroys trust.

**Agentic Completion.** Understanding intent is necessary but not sufficient. The AI Assistant must complete goals, not answer questions. When an employee says "I need Salesforce access," the response cannot be a link to a form. It must be: confirm the employee's role, determine the appropriate Salesforce license tier, identify the approver, initiate the access request, notify the approver, and confirm completion back to the employee — all autonomously, with human-in-the-loop escalation only where policy requires it. This is the agentic action layer, and it is the hardest ML engineering challenge in enterprise AI.

**Enterprise Grounding.** Every response the AI Assistant generates must be grounded in the organization's actual knowledge — not in general LLM training data. An IT policy question should return the company's actual IT security policy, updated as of the last modification date. A benefits question should return the current year's benefits guide for the employee's specific location and employment status. This requires a retrieval architecture that indexes enterprise knowledge across every integrated system, maintains freshness, handles permission scoping, and resolves conflicts between sources — at query time, in under 500ms.

**Trust at Scale.** Enterprise AI that employees trust operates differently from consumer AI that employees tolerate. Every action must be auditable. Every response that touches sensitive data must respect permission boundaries. Every escalation to a human must be seamless and context-complete. Trust is not built through impressive demos. It is built through consistency, accuracy, and the absence of failures — accumulated over millions of interactions.

These four capabilities are not independent product features. They are an integrated ML system. Radical understanding generates training signals that improve agentic reasoning. Agentic reasoning depends on enterprise grounding for action accuracy. Trust at scale depends on all three working reliably. The Core ML investments required to build and maintain this system — the NLU pipeline, the retrieval architecture, the reasoning engine, the evaluation framework — are the product strategy. Everything else is distribution.

---

## 5. Use Cases & Employee Journey

The Moveworks AI Assistant spans every employee-facing function in the enterprise. Below are the highest-impact use cases that define the daily value proposition.

### IT Resolution — The Highest-Frequency Domain
**Employee experience without Moveworks:** Employee cannot access Zoom. Opens ServiceNow portal, navigates to IT request form, selects "Software & Access" category, describes the issue in a text field, submits. Receives automated acknowledgment. 4 hours later, IT agent reads the ticket, attempts remote diagnosis, schedules a callback. Issue resolved 6–24 hours after initial report. Total: 25–45 minutes of employee time, 4–24 hours of elapsed time.

**Employee experience with Moveworks:** Employee types "I can't access Zoom" in the Moveworks AI Assistant. The assistant identifies the intent (application access failure), queries the identity provider (Okta) to confirm the employee's Zoom license status, detects that the license expired, initiates a license renewal via the ServiceNow workflow engine, confirms renewal completion with Zoom's API, and responds: "Your Zoom license was expired. I've renewed it — you should be able to log in now. Let me know if you're still having trouble." Total: 45 seconds. Zero IT agent involvement.

**Target resolution rate:** 85% of Tier-1 IT requests fully resolved without human escalation.

### HR Self-Service — The Highest-Stakes Domain
**Common employee needs:** PTO balance and accrual, parental leave policy, benefits enrollment deadlines, payroll questions, performance review timelines, relocation policy, equity vesting schedules.

**Moveworks approach:** All HR knowledge indexed in real time from Workday, the HR knowledge base, and policy documents. Retrieval scoped to the employee's location, employment status, and seniority band. Intent classification distinguishes between information requests ("What's my PTO balance?") and action requests ("I want to submit a time-off request for next week"). Action requests trigger Workday workflow integrations directly from the conversation.

**Target:** 90% of HR informational queries resolved without HR business partner contact. 80% of PTO and leave requests submitted and confirmed entirely within the AI Assistant.

### Knowledge Retrieval — The Highest-Volume Domain
**The challenge:** Enterprise knowledge is distributed across Confluence, SharePoint, Google Drive, Notion, Slack archives, email threads, and application-specific documentation. Without semantic search that spans all sources simultaneously, employees either waste time searching multiple systems or give up and ask a human.

**Moveworks approach:** Unified semantic index across all integrated knowledge sources. Multi-hop retrieval that can synthesize an answer from multiple documents (e.g., "What are the data residency requirements for EU customers?" may require combining the data governance policy, the EU privacy addendum, and the infrastructure architecture doc). Provenance tracking so employees can see which documents informed each answer. Freshness scoring so that outdated documents are de-ranked relative to current ones.

**Target:** Mean time to information < 30 seconds for 95% of knowledge queries. Employee-rated answer quality > 4.2/5.0.

### Agentic Workflows — The Highest-Differentiation Domain
The highest-value use cases are multi-step, multi-system workflows that currently require either a human or a complex custom automation. Examples:

**New employee onboarding:** Employee's manager types "My new hire Jordan starts Monday." Moveworks: creates IT provisioning ticket (laptop, email, application access), triggers HR onboarding workflow in Workday (I-9 completion, benefits enrollment), sends Jordan a personalized onboarding message with first-day instructions, schedules a Zoom orientation with the IT team, and confirms all steps complete — without the manager touching any of those systems.

**Vendor onboarding:** Procurement specialist needs to add a new software vendor. Moveworks: identifies the vendor onboarding workflow, collects required information through a conversational form, initiates security review in the GRC system, routes to the appropriate approver, tracks approval status, and notifies the specialist when complete.

**Access certification:** IT compliance needs quarterly access review. Moveworks: identifies all users with elevated permissions, sends targeted review requests to each manager, collects approvals/denials through natural conversation (via Slack or Teams), aggregates results, and submits the completed certification to the GRC system — eliminating weeks of manual follow-up.

These agentic workflows represent the fullest expression of the Front Door vision: an AI that doesn't just understand what you need, but gets it done.

---

## 6. Core ML Architecture

The Moveworks AI Assistant is not a single model — it is a coordinated system of ML components that work together to deliver reliable, accurate, and fast enterprise assistance. Understanding the architecture is essential to understanding the product strategy, because every ML investment decision is a product investment decision.

### 6.1 NLU Pipeline: Enterprise Intent Understanding

The foundation is a fine-tuned large language model optimized for enterprise intent classification and entity extraction. This is not a general-purpose LLM prompt. It is a purpose-built NLU system with several key properties:

**Enterprise domain coverage:** Trained on hundreds of millions of enterprise service interactions across IT, HR, finance, facilities, legal, and operations. General-purpose LLMs trained on internet data do not understand "I need elevated access to the prod-db-west-2 RDS instance for a hotfix deployment" or "I need to submit a 409A amendment for my equity grant" with the precision required for action execution. Domain specificity is not a minor improvement — it is the difference between 70% and 95% intent accuracy.

**Multilingual parity:** Moveworks operates in enterprises with global workforces. The NLU system must achieve near-parity accuracy across 100+ languages — not by translating to English first (which degrades performance for non-English intents), but through genuinely multilingual training. A Spanish-speaking employee in Mexico City and an English-speaking employee in New York with identical service needs should receive identical resolution rates.

**Contextual disambiguation:** Enterprise requests are often incomplete. "I need access" could mean application access, physical access, data access, or VPN access. The NLU system must engage in intelligent clarification — asking the minimum number of questions necessary to disambiguate intent — rather than defaulting to a generic response or triggering the wrong action. This requires a slot-filling architecture that tracks conversation context and determines which missing information is action-blocking.

**Continuous learning:** Every interaction is a training signal. When an employee rephrases a request because the first interpretation was wrong, the system learns. When a newly submitted ticket type appears in volume (indicating a new enterprise need), the NLU system must detect and adapt. The model retraining pipeline — data labeling, fine-tuning, evaluation, A/B testing, and deployment — must operate on a weekly cycle, not a quarterly one.

### 6.2 Retrieval-Augmented Generation (RAG): Enterprise Grounding

The retrieval system is the trust infrastructure of the AI Assistant. Every factual claim the assistant makes must be grounded in enterprise knowledge — not hallucinated from LLM training data.

**Architecture:** A hybrid retrieval system combining dense vector search (for semantic similarity) with sparse keyword search (for precise term matching, critical for technical documentation, policy numbers, and regulatory language). Results are re-ranked by a cross-encoder that scores relevance in the context of the specific query — not just individual document relevance.

**Permission scoping:** The retrieval system must respect enterprise access controls at the document level. An employee asking about executive compensation data should not receive documents they are not authorized to access, even if those documents are technically indexed. Integration with the enterprise identity provider (Okta, Azure AD) ensures retrieval scoping mirrors system-of-record permissions — not a copy that can drift out of sync.

**Freshness and versioning:** Enterprise knowledge changes continuously — benefits packages update annually, IT policies update with every regulatory change, pricing documents update with every contract cycle. The retrieval system must index changes in near-real-time and surface the most current version of any document. Stale knowledge is a trust-destroyer: an employee who acts on an outdated policy and encounters a problem will not trust the AI Assistant again.

**Multi-hop reasoning:** Complex knowledge queries require synthesizing information from multiple documents. "What are the steps to transfer my vested RSUs to a new brokerage account?" may require combining the equity plan document, the brokerage partnership guide, the tax withholding policy, and the HRIS update procedure. The retrieval system must identify relevant documents across sources and pass them to the reasoning layer as a coherent context.

### 6.3 Agentic Reasoning Engine: Multi-Step Task Completion

The reasoning engine is the most differentiated component of the Moveworks architecture — and the hardest to build.

**Architecture:** A ReAct-style (Reasoning + Acting) loop where the model iteratively generates reasoning steps, selects tool calls, receives tool outputs, and continues reasoning until the goal is achieved or a human escalation condition is met. Unlike a single-turn LLM completion, the reasoning engine operates in a loop — potentially across 10–20 tool calls for complex workflows — with state tracking, error recovery, and progress monitoring at each step.

**Tool library:** 500+ enterprise system integrations exposed as callable tools, each with a typed API schema, error state documentation, and retry/escalation logic. The reasoning engine must learn which tools are appropriate for which intent contexts, how to compose tool calls in the correct sequence, and how to handle tool failures gracefully (e.g., if the HRIS system is unavailable, fall back to creating a manual escalation ticket rather than returning an error to the employee).

**Confidence thresholds:** Every action the reasoning engine considers has an associated confidence score. High-confidence actions (password reset, IT ticket status query) execute autonomously. Medium-confidence actions (software license provisioning, data access grants) generate a confirmation step before execution. Low-confidence actions (financial transactions, org structure changes, policy modifications) route to a human approver with full context pre-populated. These thresholds are configurable by enterprise customers and adjustable based on employee role and action risk level.

**Goal decomposition:** Complex goals must be decomposed into sub-tasks with dependency tracking. "Onboard my new hire" decomposes into: collect new hire information → provision IT accounts → trigger HR onboarding → assign buddy → schedule orientation → confirm completion. Each sub-task can execute in parallel where dependencies allow, reducing total completion time. Failures in one sub-task must not block progress on independent parallel tracks.

### 6.4 Safety and Guardrails Layer

Enterprise AI operates in a zero-tolerance environment for safety failures. The safety layer runs in parallel with every inference step.

**PII detection and redaction:** Employee requests often include incidentally disclosed PII — social security numbers in benefits questions, medical information in leave requests, financial details in expense questions. The safety layer detects and redacts PII before it is logged, stored, or transmitted to third-party systems.

**Policy compliance rails:** Enterprise customers define policy constraints — topics the AI Assistant should not engage with, actions requiring approval regardless of confidence score, regulatory language requirements for certain response categories. These constraints are enforced as hard filters on the reasoning engine's action space.

**Adversarial prompt detection:** Employees (and external parties, in customer-facing deployments) may attempt to manipulate the AI Assistant through prompt injection, jailbreaking, or social engineering. The safety layer detects adversarial input patterns and routes them to a safe-response handler rather than the primary reasoning pipeline.

**Audit logging:** Every action the AI Assistant takes — every tool call, every system access, every response generated — is logged with full provenance for compliance and forensic purposes. Audit logs are immutable, permissioned, and exportable to enterprise SIEM systems.

---

## 7. ML Performance Framework: Latency, Accuracy, Relevance

Enterprise AI lives and dies by performance. A model that is accurate but slow will be abandoned. A model that is fast but inaccurate will destroy trust. A model that achieves both but fails on edge cases will create liability. The performance framework defines the targets, measurement approach, and trade-off philosophy for the Moveworks AI Assistant.

### Latency Targets

| Interaction Type | P50 Target | P95 Target | P99 Target |
|---|---|---|---|
| Knowledge retrieval (read-only) | 800ms | 1.5s | 3s |
| Single-system action | 1.5s | 3s | 5s |
| Multi-step agentic workflow | 5s | 12s | 20s |
| Streaming first token | 200ms | 400ms | 800ms |

**Trade-off principle:** For knowledge queries, latency is paramount — employees expect search-speed responses. For agentic workflows, accuracy and reliability take precedence over latency — employees prefer a 10-second correct outcome over a 3-second wrong one. Streaming responses are used for knowledge answers to maintain perceived responsiveness; agentic workflows use a progress indicator pattern rather than streaming.

**Infrastructure:** Inference is served on dedicated GPU clusters with model parallelism for the reasoning LLM. Retrieval uses a separate compute tier optimized for vector search throughput. The NLU pipeline runs on CPU-optimized infrastructure given its lower computational requirements and extremely high query volume.

### Accuracy Targets

| Metric | Target | Measurement Method |
|---|---|---|
| Intent classification accuracy | >95% | Holdout eval set, continuously updated |
| Entity extraction F1 | >92% | Human-labeled evaluation set per domain |
| Retrieval answer relevance | >88% | LLM-as-judge + human rater agreement |
| Action completion rate (auto-resolved) | >85% (Tier-1 IT) | System telemetry vs. ticket close status |
| Hallucination rate | <1% | RAG grounding verification + human audit |
| Escalation precision | >90% | Human reviewer validation of escalated cases |

**Continuous evaluation:** A/B testing infrastructure runs continuously on 5–10% of production traffic, comparing challenger model versions against the current champion. Every model update must show improvement on the primary accuracy metric with no regression on any secondary metric before promotion to production.

### Relevance & Quality Targets

| Metric | Target |
|---|---|
| Employee satisfaction (CSAT) | >4.3/5.0 |
| First-contact resolution rate | >80% |
| Daily active usage rate | >60% of enrolled employees |
| 30-day retention | >75% |
| Answer helpfulness (5-point scale) | >4.2/5.0 |

**The relevance problem:** Relevance is the hardest metric to optimize because it is subjective and context-dependent. An answer that is technically correct but too verbose, too terse, too technical, or tonally mismatched will be rated as unhelpful even if it contains the right information. The AI Assistant must calibrate response style to the employee's apparent technical level, communication style, and urgency — inferred from the conversation context. This requires a response generation layer that is separate from the retrieval layer, with its own quality evaluation and optimization loop.

---

## 8. Phased Roadmap

### Phase 1: Foundation (Months 1–6) — Nail the Core

**Objective:** Achieve best-in-class performance on the highest-frequency, highest-confidence use cases. Establish the ML evaluation infrastructure. Drive to 60% daily active usage among enrolled employees at pilot accounts.

**Core investments:**
- NLU pipeline v2: retrain on expanded enterprise intent corpus with 50% more domain coverage. Target: 95% intent classification accuracy.
- RAG infrastructure: deploy hybrid retrieval with permission scoping and freshness scoring across IT, HR, and knowledge base sources.
- Agentic reasoning v1: reliable multi-step execution for IT Tier-1 use cases (password reset, software access, VPN, account unlock). Target: 85% auto-resolution rate.
- Evaluation framework: automated accuracy, relevance, and safety scoring pipeline running continuously on production traffic.
- Streaming response UX: eliminate perceived latency for knowledge queries.

**Success criteria:** 85% Tier-1 IT auto-resolution at 5 pilot enterprise customers. 60% DAU among enrolled employees. <1% hallucination rate. P95 knowledge query latency <1.5s.

### Phase 2: Expansion (Months 7–18) — Extend the Platform

**Objective:** Extend agentic coverage to HR, Finance, and Operations use cases. Launch multi-step workflow orchestration. Achieve 70% DAU and first-contact resolution >80% across all domains.

**Core investments:**
- Cross-domain intent model: expand NLU training to HR, Finance, Legal, and Facilities domains with equivalent accuracy.
- Workday and SAP integrations: deep action integrations enabling self-service for PTO, expense submission, payroll inquiry, and procurement requests.
- Goal decomposition engine: reliable parallel execution of multi-step onboarding, offboarding, and vendor provisioning workflows.
- Proactive intelligence v1: AI-initiated outreach for high-value triggers (expiring access certifications, benefits enrollment deadlines, onboarding task reminders).
- Enterprise admin console: customer-configurable confidence thresholds, action approval workflows, knowledge source management.

**Success criteria:** Full Tier-1 + Tier-2 coverage across IT and HR. 70% DAU. First-contact resolution >80%. NPS >40.

### Phase 3: Leadership (Months 19–36) — Define the Category

**Objective:** Establish Moveworks as the undisputed enterprise front door through proactive intelligence, cross-customer learning, and capabilities no competitor can replicate.

**Core investments:**
- Multimodal input: support for voice, image (e.g., photo of error message), and document upload as input modalities alongside text.
- Predictive assistance: AI-initiated suggestions based on behavioral patterns (e.g., "Based on your recent project activity, you may need access to the data warehouse — want me to request it?").
- Cross-system workflow builder: no-code workflow creation through natural language, enabling enterprise admins to build custom automations by describing them in the AI Assistant.
- Cross-customer ML: federated learning approach that improves the core model using signal from the entire Moveworks customer base while preserving customer data privacy.
- ServiceNow deep fusion: Moveworks reasoning layer as the default front-end for all ServiceNow workflow categories — making the AI Assistant the single interface for the entire ServiceNow platform.

**Success criteria:** >80% DAU. Moveworks recognized as the leading enterprise AI assistant in Gartner Magic Quadrant. 500+ enterprise customers with >1,000 employees enrolled.

---

## 9. Go-to-Market & Adoption Strategy

The best AI assistant in the world fails if employees don't use it. Adoption is a product problem, not just a marketing problem — and it requires intentional design.

**Land with IT:** IT is the highest-frequency, highest-ROI starting point for every enterprise deployment. IT leadership can point to immediate, measurable deflection rates. Every successful IT resolution is a trust-building moment with a new employee user. Start with IT, prove value in 30 days, expand to HR and Finance.

**Meet employees where they are:** Moveworks integrates natively with Microsoft Teams, Slack, and the ServiceNow employee portal. Employees should never need to open a new application — the AI Assistant should appear in the communication surface they already use, triggered by natural conversation.

**First-interaction excellence:** The first time an employee uses the AI Assistant is the most important interaction. A successful first experience creates a user. A failed first experience creates a detractor who will not try again. Phase 1 investments prioritize the highest-confidence use cases precisely because first-interaction quality determines adoption trajectory.

**Manager activation:** Employee behavior follows manager behavior. When a manager uses the AI Assistant in a team meeting to answer a policy question or submit an onboarding request, every direct report observes the behavior and adopts it. Manager activation programs — targeted onboarding, use case education, early access to advanced features — accelerate enterprise-wide adoption.

**Measurement and transparency:** Enterprise customers need to see the value. Weekly executive dashboards showing ticket deflection rate, resolution time improvement, and employee satisfaction scores make the ROI visible and sustain deployment investment.

---

## 10. KPIs & Success Metrics

### Primary Product Metrics

| Metric | Definition | Phase 1 Target | Phase 2 Target | Phase 3 Target |
|---|---|---|---|---|
| Daily Active Usage Rate | % of enrolled employees who use the AI Assistant at least once per day | 60% | 70% | 80% |
| First-Contact Resolution Rate | % of employee requests fully resolved without human escalation | 75% | 82% | 88% |
| Tier-1 IT Auto-Resolution | % of Tier-1 IT tickets resolved autonomously | 85% | 88% | 90% |
| Mean Time to Resolution | Average elapsed time from request to confirmation | <3 min (IT Tier-1) | <5 min (cross-domain) | <3 min (all domains) |
| Employee CSAT | Average satisfaction score (5-point scale) | 4.2 | 4.4 | 4.6 |

### ML Quality Metrics

| Metric | Definition | Target |
|---|---|---|
| Intent Accuracy | % of intents correctly classified in holdout eval | >95% |
| Action Completion Rate | % of initiated actions completed successfully | >92% |
| Hallucination Rate | % of responses containing factual errors not in source documents | <1% |
| Retrieval Relevance | % of retrieved documents rated relevant by human raters | >88% |
| P95 Latency (knowledge) | 95th percentile latency for read-only queries | <1.5s |
| P95 Latency (action) | 95th percentile latency for single-system actions | <3s |

### Business Impact Metrics

| Metric | Definition | Target (per 1,000 enrolled employees) |
|---|---|---|
| Ticket deflection | IT tickets not created due to AI resolution | 400/month |
| Cost per resolution | Fully loaded cost per AI-resolved interaction | <$0.50 |
| HR contact deflection | HR BP contacts avoided | 200/month |
| Employee time saved | Hours saved per employee per month | 3–5 hours |
| Annual cost avoidance | IT + HR labor cost avoided | $1.2M–$2.4M |

---

## 11. Risks & Mitigations

### ML Performance Risk
**Risk:** Core ML components do not achieve accuracy targets, leading to high error rates and adoption drop-off.  
**Mitigation:** Phased rollout starting with highest-confidence, highest-frequency use cases. Continuous evaluation framework with automated rollback if production accuracy drops below threshold. Human-in-the-loop for all actions below confidence threshold until model matures.

### Enterprise Trust Risk
**Risk:** A high-profile AI failure — incorrect action taken, data accessed inappropriately, confidential information disclosed — destroys customer trust and creates reputational damage.  
**Mitigation:** Defense-in-depth safety architecture: confidence thresholds, permission scoping, PII detection, adversarial prompt detection. All high-stakes actions require human confirmation. Full audit logging. Incident response playbook established before GA launch.

### Competitive Displacement Risk
**Risk:** Microsoft Copilot or Google Gemini extends action capabilities to non-platform systems, competing directly with Moveworks' enterprise action layer.  
**Mitigation:** Depth of integration (not breadth) is the moat. Microsoft and Google can add connectors; they cannot match 500+ enterprise integrations built with enterprise-grade action depth over eight years. Speed of ML improvement — weekly model updates vs. quarterly platform releases — maintains the quality gap.

### Adoption Friction Risk
**Risk:** Employees do not change behavior and continue using existing portals and systems despite AI Assistant availability.  
**Mitigation:** Meet employees in their existing communication surfaces (Teams, Slack). Prioritize use cases with the highest existing pain points (IT Tier-1) where the improvement is viscerally obvious. Manager activation programs. First-30-days engagement tracking with proactive intervention for accounts with <40% DAU.

### Data Privacy and Compliance Risk
**Risk:** Processing sensitive HR, financial, and legal queries through LLM inference creates data residency, GDPR, and confidentiality exposure.  
**Mitigation:** Tenant data isolation enforced at the infrastructure level. Customer data not used in cross-customer training without explicit opt-in. EU data residency option for EU-regulated customers. SOC 2 Type II, ISO 27001, and FedRAMP in-progress certifications.

### Model Degradation Risk
**Risk:** Core models degrade over time as enterprise language, systems, and use cases evolve — without detection until user satisfaction drops.  
**Mitigation:** Continuous A/B evaluation with production traffic comparison. Automated alerts for accuracy or CSAT drops >2% week-over-week. Weekly model update cycle maintains adaptation to new enterprise intents and system changes.

---

## 12. Appendix: Sources & References

1. McKinsey Global Institute (2025). *The Knowledge Worker Productivity Study: Time Allocation in the Modern Enterprise.*
2. IDC (2025). *Enterprise AI Market Forecast, 2025–2029.*
3. Okta (2025). *Business at Work Report: Enterprise SaaS Application Landscape.*
4. HDI (2025). *Service and Support Practices Survey: Cost Per Contact in IT Help Desks.*
5. Gartner (2025). *AI in Enterprise Survey: Deployment and Governance Patterns.*
6. McKinsey (2025). *State of AI Report: Enterprise Adoption and Trust Gap.*
7. Forrester Research (2025). *Enterprise AI Assistant Wave: Competitive Landscape and Vendor Positioning.*
8. ServiceNow/Moveworks (2024). *Moveworks AI Platform: Impact at Scale — Customer ROI Study.*
9. Microsoft (2025). *Copilot for Microsoft 365: Usage and Impact Report.*
10. Andreessen Horowitz (2025). *The Enterprise Agentic AI Landscape: Market Map and Investment Thesis.*

---

*This white paper was prepared to demonstrate strategic product thinking for the Principal Inbound Product Manager, AI Assistant (Core ML) role at ServiceNow's Moveworks Business Unit. The analysis reflects original synthesis based on publicly available market data, firsthand experience building enterprise AI systems at Amazon, and deep study of the Moveworks platform and competitive landscape.*
