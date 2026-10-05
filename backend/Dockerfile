FROM python:3.11-slim

# Set pip timeout
ENV PIP_DEFAULT_TIMEOUT=1000

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir --timeout 1000 -r requirements.txt
COPY . .
CMD ["python", "-m", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]