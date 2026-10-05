from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
import os

def generate_report(path: str = "/tmp/ocean_report.pdf"):
    c = canvas.Canvas(path, pagesize=A4)
    c.setFont("Helvetica", 14)
    c.drawString(50, 800, "FloatChat - Ocean Report")
    c.drawString(50, 780, "This is a generated PDF report (PoC).")
    c.showPage()
    c.save()
    return path
