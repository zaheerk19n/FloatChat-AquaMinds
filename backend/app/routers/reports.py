from fastapi import APIRouter
from fastapi.responses import FileResponse
from app.services.pdf_service import generate_report

router = APIRouter()

@router.get("/pdf")
def get_pdf_report():
    path = generate_report()
    return FileResponse(path, filename="ocean_report.pdf", media_type="application/pdf")
