# 🌊 FloatChat – AI Conversational Interface for Ocean Data

**Team Name:** AquaMind
**Tagline:** *“Intelligent Insights Beneath the Waves”*

---

## 📌 Project Overview

FloatChat is an **AI-powered conversational system** that allows users to query, explore, and visualize **oceanographic datasets** (e.g., ARGO NetCDF data) through natural language.

By combining **LLMs, RAG pipelines, predictive models, and interactive dashboards**, FloatChat bridges the gap between raw ocean data and decision-makers, empowering **scientists, policymakers, and even non-technical users**.

---

## 🚀 Features

* **Conversational AI** (Text + Voice) → Query ARGO data using natural language
* **RAG + LLM Backend** → Accurate answers mapped to SQL/vector DB queries
* **Interactive Dashboard** → Plotly.js charts & Mapbox-based geospatial maps
* **Predictive Analytics** → Forecasting with ARIMA & LSTM, anomaly detection
* **Explainable AI (XAI)** → SHAP/LIME for transparency in predictions
* **Role-Based Access** → Dashboards for Scientists, Policymakers, Fishermen
* **Exportable Reports** → Generate CSV/NetCDF/PDF summaries
* **Gamified Ocean Health Score** → 0–100 metric for clarity & engagement

---

## 🛠️ Tech Stack

**Frontend**: React.js + Tailwind CSS
**Visualizations**: Plotly.js, Mapbox
**Backend & API**: FastAPI (REST/GraphQL APIs)
**AI/ML**:

* LLMs (LLaMA, Mistral, GPT)
* RAG pipeline
* Forecasting models (ARIMA, LSTM, Prophet)

**Databases**:

* PostgreSQL (structured)
* ChromaDB (vector DB for semantic search)

**Data Ingestion**: Python (`xarray`, `netCDF4`)
**Cloud Infrastructure**:

* Frontend → Vercel
* Backend → AWS EC2 / GCP Cloud Run

---

## 📂 Data Sources

* 🌐 [Argo Global Data Repository](ftp://ftp.ifremer.fr/ifremer/argo)
* 🌐 [Indian Argo Project (INCOIS)](https://incois.gov.in/OON/index.jsp)

---

## ⚡ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/FloatChat-AquaMind.git
cd FloatChat-AquaMind
```

### 2. Backend Setup (FastAPI)

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### 3. Frontend Setup (React + Tailwind)

```bash
cd frontend
npm install
npm run dev
```

### 4. Access Application

* Frontend: `http://localhost:3000`
* API Docs: `http://localhost:8000/docs`

---

## 📊 MVP vs Enhanced Build

**MVP (Hackathon-Ready):**

* Text chatbot
* ARGO dataset queries
* Basic dashboard + SQL/vector DB integration

**Enhanced (Judge-Impressing):**

* Voice chatbot + multilingual NLP
* Predictive analytics (ARIMA, LSTM, anomaly detection)
* Interactive maps & heatmaps
* Explainable AI + PDF report export
* Multi-role dashboards + gamified health score

---

## 🎯 Why This Project Stands Out

* ✅ **Innovative**: Rare use of AI + oceanographic data
* ✅ **Demo-Friendly**: Conversational AI + visual dashboards + live queries
* ✅ **High Impact**: Supports researchers, policymakers, fishermen
* ✅ **Scalable**: Future-ready (satellite data, gliders, buoys)
* ✅ **Portfolio-Ready**: Combines **AI, ML, web, and cloud engineering**

---

## 📜 License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.
