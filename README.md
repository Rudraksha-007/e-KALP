# e-KALP 🧠🌏
### Turning Real-World Problems into Meaningful Change

**Smart India Hackathon 2026** | Problem Statement ID: `SIH26043` | Theme: **Smart Education** | Category: **Software**
Team: **Socialis**

---

## 📌 Overview

**e-KALP** is a digital platform that crowdsources societal challenges from citizens and routes them — through an AI-powered pipeline — to the universities and industry partners best equipped to solve them.

India's civic innovation ecosystem is broken not because solutions don't exist, but because there has never been a structured system connecting **citizens**, **government**, **universities**, and **industry**. e-KALP builds that missing link: a transparent, scalable pipeline that turns local, on-the-ground problems into research projects, funded prototypes, and deployed, measurable solutions — in line with **NEP 2020**'s vision of experiential, multidisciplinary, industry-linked learning.

```
Citizen → AI Engine → Government Validation → University → Student Team → Industry → Impact
```

---

## 🚩 The Problem

Communities across Jharkhand (and India more broadly) face recurring challenges in education, healthcare, agriculture, water management, sanitation, environment, rural livelihoods, accessibility, urban infrastructure, and public service delivery — but there is no structured mechanism for citizens to submit these problems for systematic evaluation and innovation-driven resolution.

| Gap | Description |
|---|---|
| **Scattered citizen reports** | Problems arrive through disconnected, informal channels |
| **Duplicate & conflicting data** | The same issue is reported many times with no deduplication |
| **No intelligent prioritization** | Urgency and vulnerable communities aren't systematically identified |
| **Disconnected universities** | Relevant academic expertise isn't linked to real problems |
| **Weak industry linkage** | Student solutions lack funding, mentorship, and deployment support |
| **Weak impact tracking** | No visibility from problem discovery to actual community outcome |

---

## 💡 Our Solution

A **Societal Innovation Collaboration Portal** with role-based workflows for four stakeholder types:

- **Citizens / Communities** — submit problems via web app, mobile app, Telegram, or voice, with photos, video, and location
- **Government Departments** — validate submitted problems and monitor domain-wise / district-wise dashboards
- **Universities (via a single SPOC)** — register subject expertise, review AI-routed problems, and submit **one consolidated proposal per problem** (multiple universities can propose on the same citizen-reported problem)
- **Industry Partners — CSR entities & MSMEs (via a single SPOC)** — view proposals across problems and choose to pitch their own idea, sponsor, or mentor a university team

### Core Modules

- 🧑‍🤝‍🧑 **Citizen Engagement Module** — guided in-app problem reporting with multimedia evidence and geolocation
- 🤖 **AI Problem Management Module** — categorization, prioritization, deduplication, and routing
- 🎓 **University Collaboration Module** — SPOC-managed expertise registry, team formation, and proposal workflow
- 🏭 **Industry Partnership Module** — proposal discovery, pitching, sponsorship, and mentorship
- 📊 **Project Lifecycle & Analytics Dashboards** — milestone tracking, deployment status, and government-facing impact analytics
- 🔔 **Notification & Communication Layer** — keeps citizens, universities, industry, and government in sync throughout the project lifecycle

### Accessibility-First AI Layer

- 🎙 **Multilingual AI Voice Agent** — enables quick, impromptu, voice-first problem registration for low-literacy and first-time digital users
- 💬 **Telegram Chatbot** — report and track problems without navigating a full portal
- 🧠 **Multimodal Understanding** — text, voice, image, and location — not just typed complaints

---

## ⚙️ How It Works — AI Pipeline

Every citizen-submitted problem passes through a four-stage AI pipeline before reaching a university or industry partner:

| Stage | What Happens |
|---|---|
| **01. Categorization** | Generates an embedding of the problem statement and matches it against thematic category prototypes (education, agriculture, healthcare, water, environment, etc.) |
| **02. Deduplication** | Groups or merges near-duplicate problem statements using **cosine similarity** search in a vector database |
| **03. Prioritization** | Calculates a ranked priority score from weighted severity, vulnerability, and citizens-affected metrics |
| **04. Routing** | Routes the validated, prioritized problem to the nearest and best-fit university or industry partner using stored **latitude/longitude** and domain expertise |

> AI recommendations are always followed by **human validation** — Government → Faculty → SPOC — before a problem is published or a proposal is approved.

---

## 🏗️ Architecture

```
Users (Citizen, Government, University, Industry)
        │
        ▼
Frontend (React + Tailwind CSS)  ── Responsive web portal & mobile-friendly UI
        │
        ▼
Backend (FastAPI)  ── APIs, authentication, business logic
        │
        ▼
AI Engine (Multimodal)  ── Categorize • Deduplicate • Prioritize • Route
        │                         ▲
        │                         │
        │              n8n Voice Assistant + Telegram Chatbot
        │                (automation workflows)
        ▼
Validated Challenges  ── Routed to best-fit universities/industry
        │
        ▼
Outcomes  ── ✓ Solutions   ✓ Deployment   ✓ Real Impact
```

---

## 🛠️ Tech Stack

### Frontend
- **React** — web portal
- **React Native** — mobile app
- **Tailwind CSS** — styling

### Backend
- **FastAPI** — REST API & server
- **n8n** — workflow automation, chatbot & voice-agent integration

### Data & AI
- **PostgreSQL / Supabase** — structured data storage
- **Pandas** — data processing & preprocessing
- **scikit-learn** — ML library
- **Pinecone** — vector database for embeddings & cosine-similarity search
- **Leaflet / OpenStreetMap** — location-aware problem discovery

### DevOps & Testing
- **GitHub Actions** — CI/CD
- **Render.com** — deployment/hosting
- **Locust** — load & performance testing

### Accessibility Integrations
- **Telegram Bot API** — chat-based reporting
- **n8n Voice Assistant** — multilingual, voice-first interaction

---

## 📱 Repositories

| Component | Repository |
|---|---|
| **Web Platform** | [github.com/Rudraksha-007/e-KALP](https://github.com/Rudraksha-007/e-KALP) |
| **Mobile App** | [github.com/aaaakshiii/socialis-mobile](https://github.com/aaaakshiii/socialis-mobile.git) |

---

## ✨ Innovation & Uniqueness

- **📲 Telegram Access** — report and track problems without ever opening the portal
- **🎙 Voice Assistant** — voice-first interaction built for accessibility and low-literacy users
- **🧠 Multimodal AI** — understands text, voice, image, and location together, not just typed complaints
- **📍 Location-Aware Routing** — vector-embedding similarity + lat/long-based matching to the nearest, most relevant university or industry partner
- **🔁 Continuous Loop-In** — citizens, universities, industry, and government departments stay informed throughout funding, mentoring, and deployment of large-scale projects

---

## ✅ Feasibility & Risk Mitigation

| Risk | Mitigation |
|---|---|
| Duplicate / noisy citizen reports | Semantic deduplication + citizen corroboration |
| AI prediction errors | AI recommendation + human validation (Government → Faculty → SPOC) |
| Language & digital-access barriers | Multilingual WhatsApp/Telegram + voice-first interaction |
| Incomplete university capability data | Dynamic, self-updated university capability profiles |
| Privacy & data security | Role-based access control + secure APIs |
| Low stakeholder adoption | Phased onboarding and training |
| Scaling across districts | Pilot → district expansion → statewide scaling |

---

## 📈 Impact & Benefits

| Stakeholder | Benefit |
|---|---|
| **Citizens & Communities** | A direct channel to report challenges with photos and location, and track them end-to-end — including rural and low-literacy users |
| **Students & Researchers** | Real, location-matched problems turned into multidisciplinary projects with a clear SPOC/mentor pathway |
| **Higher Education Institutions** | Challenges routed to the right faculty expertise and incubation capacity, strengthening ties in line with NEP 2020 |
| **Industry / Startups / MSMEs** | A structured pipeline of validated challenges for CSR, mentorship, funding, and pilot deployment |
| **Government Departments** | Real-time, district-wise, domain-wise dashboards with AI-driven prioritization |

**Impact flow:** Citizen Voice → Verified Challenge → University Solution → Industry Support → Pilot → Deployment → Measured Impact

---

## 🆚 e-KALP vs. Status Quo

| Feature | Without e-KALP (Today) | With e-KALP |
|---|---|---|
| **Problem Submission** | No structured channel — scattered complaints, calls, social media | Guided in-app reporting with photos, video, location & documents in minutes |
| **Categorization & Routing** | Manual sorting, if any — no link to relevant institutions | AI auto-classifies by domain and routes to the best-fit university by faculty expertise |
| **Accessibility** | Requires literacy, a web form, English/Hindi typing | Voice assistant + Telegram chatbot — no app install, multilingual, first-time-digital-user friendly |
| **Collaboration** | Citizens, universities, and industry work in silos | Shared project workspace — student team, faculty mentor, SPOC & industry partner in one place |
| **Impact & Scalability** | No visibility once a complaint is filed | Citizen tracks status end-to-end; government dashboards show impact at scale |

---

## 🗺️ Roadmap

1. **Foundation & Design** — architecture, schema, and UI/UX
2. **Core Platform Development** — citizen module, AI categorization & routing
3. **Collaboration & Accessibility Layer** — university/industry modules, voice agent, Telegram bot
4. **Validation & Testing** — government dashboards, load testing, AI accuracy testing
5. **Pilot & Scale-up** — district pilot → statewide rollout across Jharkhand

---

## 📚 References

- [PM Internship Portal](https://pminternship.mca.gov.in/)
- Huang, A. (2008). *Similarity measures for text document clustering.* NZCSRSC 2008.
- Ramos, J. (2003). *Using TF-IDF to Determine Word Relevance in Document Queries.* Rutgers University.
- [scikit-learn TfidfVectorizer docs](https://scikit-learn.org/stable/modules/generated/sklearn.feature_extraction.text.TfidfVectorizer.html)
- Salton, G., Wong, A., & Yang, C. S. (1975). *A vector space model for automatic indexing.* Communications of the ACM, 18(11), 613–620.
- Manning, C. D., Raghavan, P., & Schütze, H. (2008). *Introduction to Information Retrieval.* Cambridge University Press.
- Baeza-Yates, R., & Ribeiro-Neto, B. (1999). *Modern Information Retrieval.* Addison-Wesley.
- [AICTE](https://www.aicte.gov.in/)

---

## 👥 Team Socialis

Built for **Smart India Hackathon 2026** under Problem Statement **SIH26043**.

---


