# app/database.py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.config import settings
from chromadb import PersistentClient  # ✅ New client (no Settings needed)
from sentence_transformers import SentenceTransformer

# SQLAlchemy sync engine & session
engine = create_engine(settings.database_url, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Chroma client — persistent local storage (DuckDB + Parquet by default)
chroma_client = PersistentClient(path=settings.chroma_persist_dir)

# Embedding model
embedding_model = SentenceTransformer("all-MiniLM-L6-v2")

def embed_texts(texts):
    return embedding_model.encode(texts, show_progress_bar=False).tolist()