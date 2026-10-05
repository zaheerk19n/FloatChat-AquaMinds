from fastapi import APIRouter
from app.schemas import ChatRequest
from app.services.rag_service import semantic_search, generate_answer
from typing import Dict

router = APIRouter()

@router.post("/")
def chat(req: ChatRequest):
    hits = semantic_search(req.query, k=4)
    answer = generate_answer(req.query, hits)
    return {"answer": answer, "hits": hits}
