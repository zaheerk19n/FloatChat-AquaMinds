FloatChat – AI-Powered Conversational Interface for Ocean Data
“Intelligent Insights Beneath the Waves”
🌟 Project Overview
FloatChat is an AI-powered conversational system designed to democratize access to vast and complex oceanographic data. It allows users, including non-technical individuals like policymakers, fishermen, and students, to query, explore, and visualize ocean data using natural language.

This project was developed for the Smart India Hackathon (SIH) 2025, Problem Statement ID SIH25040, provided by the Ministry of Earth Sciences (MoES) and INCOIS.

🌊 Problem Statement
Oceanographic data from sources like ARGO floats, satellites, and buoys is massive and heterogeneous, requiring specialized skills and complex tools to access and interpret. FloatChat aims to bridge this gap by creating an intuitive system that makes this data accessible to everyone through a simple, conversational interface.

✨ Key Features
NLP Chatbot: A conversational AI that handles multi-turn conversations and understands natural language queries, with optional voice input.

Retrieval-Augmented Generation (RAG): A robust backend system that uses LLMs to map natural language queries to structured database queries (SQL) for accurate and context-aware responses.

Interactive Visualizations: A dynamic dashboard with geospatial maps and plots to visualize data, including:

Depth-time plots.

Trajectories of floats.

Interactive heatmaps.

Clickable map points with detailed information.

Predictive Analytics: Utilizes machine learning models (ARIMA, LSTM) to provide predictive insights, such as forecasting ocean parameters and detecting anomalies like pollution hotspots or cyclone zones.

Explainable AI (XAI): Provides reasoning behind model predictions using tools like SHAP/LIME to build user trust and ensure transparency.

Multi-Role Dashboard: Tailored user experiences for different roles like Scientists, Policymakers, and Fishermen, each with personalized dashboards.

Data Export: Allows users to export tabular summaries in formats like ASCII, NetCDF, and PDF reports for practical use.

💻 Technical Stack
The project is a full-stack application built with the following technologies:

Frontend: React.js and Tailwind CSS.

Backend & API: FastAPI for high-performance and scalable API serving.

AI/ML: Large Language Models (LLaMA, Mistral), a RAG pipeline, and time-series forecasting models (ARIMA, LSTM).

Databases: PostgreSQL for structured data and ChromaDB for the vector database (semantic search).

Data Ingestion: Python with xarray and netCDF4 libraries to handle ARGO NetCDF files.

Cloud Infrastructure: Frontend hosted on Vercel and backend on AWS EC2 or GCP Cloud Run.

Version Control: GitHub with GitHub Actions for CI/CD.

🚀 Getting Started
Prerequisites
Python 3.8+

Node.js and npm

Docker (recommended)

Installation
Clone the repository:

Bash

git clone https://github.com/zaheerk19n/FloatChat-AquaMinds.git
cd FloatChat-AquaMinds
Set up the Backend:

Bash

# Install Python dependencies
pip install -r requirements.txt

# Configure environment variables (e.g., database connection strings)
# Start the FastAPI server
uvicorn main:app --reload
Set up the Frontend:

Bash

# Navigate to the frontend directory
cd frontend

# Install Node.js dependencies
npm install

# Start the React app
npm start
Data Setup
The system requires ARGO float data. You can download sample datasets from:

Argo Global Data Repository.

Indian Argo Project (INCOIS).

Follow the data ingestion pipeline steps to process and load the data into your local PostgreSQL and ChromaDB instances.

📈 Roadmap (MVP vs. Enhanced)
The project follows a phased development approach:

MVP (Hackathon Ready)	Enhanced Features (Judge-Impressing)
Text-based chatbot.	Voice + text queries.
Basic ARGO dataset.	Full ARGO + satellite + buoy data.
Depth-time plots and line graphs.	Interactive maps, heatmaps, and predictive alerts.
SQL/vector DB RAG pipeline.	Predictive analytics & anomaly detection.
Basic dashboard.	Multi-role dashboard + gamified health score.
Basic query responses.	Explainable AI + PDF report export.
🤝 Contribution
Contributions are welcome! If you find a bug or have a feature suggestion, please open an issue.

📞 Contact
For questions or collaborations, please open an issue on GitHub.

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
