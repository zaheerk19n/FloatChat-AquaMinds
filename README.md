# 🌊 FloatChat by AquaMind  
### AI-Powered Conversational Interface for ARGO Ocean Data Discovery and Visualization  
**Project ID:** SIH25040 | **Category:** Software | **Theme:** AI + Oceanography  
**Organization:** Ministry of Earth Sciences (MoES) / INCOIS  

> _“Intelligent Insights Beneath the Waves”_

---

## 🎯 Project Overview  
FloatChat is an AI chatbot + interactive dashboard that lets **anyone** — scientists, fishermen, policymakers — ask questions in plain language like:  
> _“Show me salinity trends near Chennai last month.”_  
> _“Is there a cyclone risk off the Kerala coast?”_  
And instantly get charts, maps, alerts, and reports — **no coding required.**

Built using **RAG, LLMs, vector databases, React, FastAPI, and real ocean data** from INCOIS/ARGO.

---

## 👥 Our Team: AquaMind
| Name | Role | Responsibility |
|------|------|----------------|
| Zaheer K | Team Lead | Full-stack coordination, demo scripting |
| [Name] | Backend | FastAPI, RAG, PostgreSQL, FAISS |
| [Name] | Frontend | React + Tailwind, Mapbox, Chat UI |
| [Name] | AI/NLP | Intent detection, NL2SQL, Voice input |
| [Name] | Data/Visuals | NetCDF parsing, Heatmaps, PDF Reports |

> ⚠️ *Please update names above before submission!*

---

## 🛠️ Tech Stack
| Layer | Technology |
|-------|------------|
| **Frontend** | React.js + Tailwind CSS + Mapbox GL JS + Chart.js |
| **Backend** | FastAPI (Python) |
| **AI/ML** | QWEN/LLaMA (via Hugging Face), LangChain, RAG, SHAP/LIME |
| **Databases** | PostgreSQL (structured), FAISS (vector), MongoDB (logs) |
| **Data** | ARGO NetCDF (INCOIS), Synthetic mock data |
| **Deployment** | Vercel (frontend), Railway/AWS EC2 (backend) |
| **Voice** | Web Speech API (demo), Whisper (future) |
| **Export** | jsPDF, CSV, NetCDF |

---

## 📁 Project Structure
FloatChat-AquaMind/
├── README.md
├── server/ # FastAPI backend
│ ├── main.py
│ ├── data/
│ │ └── sample.json
│ └── requirements.txt
├── client/ # React frontend
│ ├── public/
│ └── src/
│ ├── components/
│ ├── services/
│ └── App.jsx
├── data/ # Raw NetCDF samples (if any)
├── docs/ # Design notes, wireframes
└── .gitignore


---

## ▶️ How to Run (For Demo Day!)
```bash
# Backend (FastAPI)
cd server
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Frontend (React)
cd client
npm install
npm run dev

Open http://localhost:5173 → Chat with the ocean! 

📌 Day 1 Goals (Today!)
✅ GitHub repo created
✅ README live with team + tech stack
✅ Branches created (dev, feature/backend, etc.)
✅ All teammates invited
✅ Mock data placeholder ready

🏆 Why Judges Will Love This
Domain Innovation: AI for ocean data is rare.
Full-Stack AI: RAG + Vector DB + Chat + Maps + Predictions.
Demo-Worthy: Real-time visualizations + voice queries + PDF reports.
Inclusive: Multi-role dashboards for fishermen, scientists, policymakers.
Scalable: Built to grow into global ocean monitoring system.
💬 “We didn’t just build a tool — we built a bridge between complex science and everyday people.”
— AquaMind Team 




> ✅ **SCROLL DOWN → CLICK “COMMIT NEW FILE”**  
> ✅ **COMMIT MESSAGE:** `feat: Add professional README.md for judges`

---

## ✅ STEP 3: CREATE BACKEND FILES — COPY-PASTE THESE ONE BY ONE

### ➤ FILE 1: `/server/main.py`

> 📍 Go to repo → Click **“Add file” → “Create new file”**  
> ✍️ Type filename: **`server/main.py`**

> 📋 Paste this **exact code**:

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
from typing import Optional

app = FastAPI(title="FloatChat API", version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health():
    return {"status": "ok", "service": "FloatChat Backend", "version": "1.0"}

@app.get("/api/data")
def get_data(region: Optional[str] = None):
    with open("data/sample.json") as f:
        data = json.load(f)
    if region:
        data = [d for d in data if d["region"].lower() == region.lower()]
    return data
