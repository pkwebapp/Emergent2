"""FastAPI proxy backend.

This app is a lightweight reverse proxy that forwards /api/* requests to the
Next.js server running on localhost:3000. All actual API logic lives in the
Next.js app's catch-all route (frontend/app/api/[[...path]]/route.js).

The Kubernetes ingress in this environment routes /api traffic to port 8001,
so we accept it here and hand it off to Next.js.
"""
import os
import httpx
from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")
NEXT_ORIGIN = os.environ["NEXT_ORIGIN"]

app = FastAPI(title="PK Photography Proxy")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

_client = httpx.AsyncClient(timeout=60.0)


HOP_BY_HOP = {
    "connection",
    "keep-alive",
    "proxy-authenticate",
    "proxy-authorization",
    "te",
    "trailers",
    "transfer-encoding",
    "upgrade",
    "content-encoding",
    "content-length",
    "host",
}


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.api_route(
    "/api/{path:path}",
    methods=["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
)
async def proxy(path: str, request: Request):
    url = f"{NEXT_ORIGIN}/api/{path}"
    if request.url.query:
        url = f"{url}?{request.url.query}"

    body = await request.body()
    headers = {k: v for k, v in request.headers.items() if k.lower() not in HOP_BY_HOP}

    upstream = await _client.request(
        request.method,
        url,
        content=body,
        headers=headers,
    )

    response_headers = {
        k: v for k, v in upstream.headers.items() if k.lower() not in HOP_BY_HOP
    }
    return Response(
        content=upstream.content,
        status_code=upstream.status_code,
        headers=response_headers,
        media_type=upstream.headers.get("content-type"),
    )


@app.on_event("shutdown")
async def _close_client():
    await _client.aclose()
