# Production Minimal Dockerfile
FROM python:3.11-slim-bullseye AS runner

WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends curl && rm -rf /var/lib/apt/lists/*

COPY . /app
EXPOSE 8080

# Create non-root secure user
RUN useradd -m -u 1000 appuser && chown -R appuser:appuser /app
USER appuser

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8080/ || exit 1

CMD ["python3", "-m", "http.server", "8080"]
