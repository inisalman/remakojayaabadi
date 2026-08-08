FROM python:3.12-alpine
WORKDIR /app
COPY webhook-listener.py .
ENV REMAKO_WEBHOOK_SECRET=remako-rebuild-2026
ENV REMAKO_WEBHOOK_PORT=9002
EXPOSE 9002
CMD ["python", "webhook-listener.py"]
