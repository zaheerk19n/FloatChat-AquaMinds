# 🌊 FloatChat – Project Progress & Task Tracker

> **Team Name:** AquaMind  
> **Project:** FloatChat – AI Conversational Interface for Ocean Data  
> **Status Summary:** ~50% Complete (UI/UX Mockups & Backend Foundations Ready; API Integration & Advanced AI Pending)

---

## 📊 Overall Progress Dashboard

| Module / Component | Progress Status | Details |
| :--- | :---: | :--- |
| **Frontend UI & Layouts** | 🟡 65% Complete | Modern React + Tailwind + Lucide layout, Pages (Home, Chat, Dashboard, Analytics, Reports), Role Selector & Ocean Health Score UI ready. |
| **Frontend-Backend API Connection** | 🔴 10% Complete | `src/services` is currently empty. Frontend relies on dummy static data for chats, maps, and metrics. |
| **Backend API Structure** | 🟡 45% Complete | FastAPI application scaffolded with Routers (`chat`, `auth`, `profiles`, `analytics`, `reports`, `alerts`). |
| **Database & ORM** | 🟢 75% Complete | PostGIS PostgreSQL schema (`User`, `OceanFloat`, `Profile`, `Measurement`) and GeoAlchemy2 mappings configured. |
| **RAG & Vector Search** | 🟡 50% Complete | ChromaDB vector store set up; Google Gemini API integration initialized in `rag_service.py`. Needs real data index & query optimization. |
| **Data Ingestion Pipeline** | 🟡 40% Complete | `xarray`/`netCDF4` parser stub in `ingestion.py` creates profiles & measurements in DB & ChromaDB. Needs automated ingest scripts for large datasets. |
| **Predictive Analytics & XAI** | 🔴 15% Complete | Basic Z-score anomaly detection stub present; ARIMA, LSTM, Prophet, and SHAP/LIME XAI features are pending. |
| **Voice & Multilingual NLP** | 🔴 10% Complete | UI voice record button simulated with timeout; actual Web Speech API / Whisper integration pending. |
| **Containerization & Infrastructure** | 🟢 70% Complete | `docker-compose.yml` with PostGIS and FastAPI backend ready. Frontend Dockerfile & production setup pending. |

---

## 🎯 Task Roadmap & Action Plan

### Phase 1: Frontend-Backend Integration (High Priority)
- [ ] **API Client Setup**: Create service layer in `oceanai-frontend/src/services/` (Axios / Fetch client) to connect to backend endpoints (`http://localhost:8000`).
- [ ] **Live Chat Integration**: Connect `ChatBox` component in frontend to POST `/chat/` backend endpoint. Replace dummy AI responses with live Gemini RAG output.
- [ ] **Live Dashboard Data**: Connect `Dashboard.tsx` and `Analytics.tsx` to backend GET `/analytics/summary` and GET `/profiles/`.
- [ ] **Role-Based Context**: Pass selected role (`researcher`, `policymaker`, `fisherman`) to the backend chat router for tailored prompt engineering.

### Phase 2: Data Pipeline & Ingestion Enhancements
- [ ] **ARGO Data Fetching Script**: Create automated script to fetch NetCDF files from INCOIS / IFREMER FTP servers.
- [ ] **Robust NetCDF Parser**: Expand `ingestion.py` to handle edge cases, missing parameters (e.g. salinity, dissolved oxygen, BGC variables), and variable naming variations across floats.
- [ ] **Vector Indexing**: Automatically index ingested float metadata and temperature/salinity profiles into ChromaDB (`profiles_collection`).

### Phase 3: AI, RAG & Analytics Pipeline
- [ ] **Advanced RAG Prompts**: Refine Gemini system prompts for natural-language-to-spatial-SQL queries and structured data summaries.
- [ ] **Predictive Models**: Implement ARIMA/LSTM forecasting services for ocean temperature & salinity trend predictions.
- [ ] **Anomaly Detection**: Integrate spatial and temporal anomaly detection on ARGO profile measurements.
- [ ] **Explainable AI (XAI)**: Add basic feature importance / confidence explanations (e.g., using SHAP/LIME or LLM self-reflection) for model outputs.

### Phase 4: Frontend UI Features & Visualizations
- [ ] **Interactive Map Integration**: Connect Mapbox/Leaflet JS in `map-wrapper.tsx` to render real ARGO float geospatial coordinates.
- [ ] **Plotly / Recharts Interactivity**: Dynamically render depth profile graphs (Temperature vs Depth, Salinity vs Depth) from backend data.
- [ ] **Voice Query Support**: Implement Web Speech API / Whisper for live voice-to-text input in the chat box.
- [ ] **Exportable PDF Reports**: Connect `Reports.tsx` page to backend `/reports/export` endpoint powered by `ReportLab`.

### Phase 5: Authentication, User Roles & Polish
- [ ] **JWT Auth Flow**: Implement user signup/login endpoints in `auth.py` and store auth state in React context.
- [ ] **Role-Tailored Dashboards**: Customize visual widgets for Fishermen (simple ocean health score & safe zones), Policymakers (summary reports), and Researchers (raw NetCDF / profile analysis).
- [ ] **Error Handling & Toast Notifications**: Add error boundaries and fallback states across frontend pages.

### Phase 6: DevOps, Testing & Cloud Deployment
- [ ] **Frontend Dockerization**: Add Dockerfile and Nginx configuration for `oceanai-frontend`.
- [ ] **CI/CD & Cloud Deployment**: Setup Vercel deployment for React frontend and GCP Cloud Run / AWS EC2 deployment for FastAPI + PostGIS.
- [ ] **End-to-End Verification**: Write integration tests for backend APIs and automated build checks.

---

## 📌 Priority Matrix

```
[ Urgent & Critical ]
1. Connect Frontend ChatBox to Backend /chat API.
2. Ingest real ARGO NetCDF dataset into PostGIS & ChromaDB.
3. Map dynamic ARGO float coordinates on frontend Map Component.

[ High Value / Judge Impressing ]
4. Voice input handling (Web Speech API).
5. Predictive temperature & salinity trends (ARIMA / LSTM).
6. Exportable PDF / CSV reports for ocean observations.
```
