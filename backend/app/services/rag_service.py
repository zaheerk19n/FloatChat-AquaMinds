import google.generativeai as genai
from app.database import chroma_client, embed_texts
from app.config import settings

# Configure Gemini with API key
genai.configure(api_key=settings.gemini_api_key)

collection_name = "profiles_collection"
try:
    collection = chroma_client.create_collection(name=collection_name)
except Exception:
    collection = chroma_client.get_collection(name=collection_name)

def semantic_search(query: str, k: int = 3):
    emb = embed_texts([query])[0]
    results = collection.query(query_embeddings=[emb], n_results=k, include=['metadatas', 'documents'])
    hits = []
    for i, doc in enumerate(results['documents'][0]):
        meta = results['metadatas'][0][i]
        hits.append({"document": doc, "metadata": meta})
    return hits

def generate_answer(query: str, contexts):
    docs = "\n".join([c.get("document", "") for c in contexts])
    prompt = f"""You are FloatChat, an assistant for oceanographic data.
    The user asked: {query}
    Use the following context to answer:
    {docs}
    Provide a clear and concise response."""
    
    model = genai.GenerativeModel("gemini-pro")
    response = model.generate_content(prompt)
    return response.text
