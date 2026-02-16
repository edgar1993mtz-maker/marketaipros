# api/email/report.py

from fastapi import APIRouter
import asyncio
from services.engine.pipeline.run_forex_pipeline import run_forex_pipeline
from services.email.email_report_generator import generate_email_report
from services.email.send_email_beehiiv import send_email_via_beehiiv

router = APIRouter()

@router.post("/email/report")
async def send_report():
    data = await run_forex_pipeline()
    report = generate_email_report(data)
    result = send_email_via_beehiiv(report["subject"], report["html"])
    return {"status": "sent", "beehiiv": result}
