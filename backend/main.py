import json
import requests

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


app = FastAPI(
    title="Cooperative AI Assistant",
    description="Multilingual Cooperative Governance and Legal Assistance Chatbot",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


OLLAMA_URL = "http://127.0.0.1:11434/api/chat"
MODEL = "qwen3:4b"


class ChatRequest(BaseModel):
    message: str
    language: str = "English"


def load_sources():
    try:
        with open("knowledge/sources.json", "r", encoding="utf-8") as file:
            return json.load(file)
    except Exception as error:
        print("Knowledge base error:", error)
        return []


def find_sources(question):
    sources = load_sources()

    words = set(
        question.lower()
        .replace("?", "")
        .replace(",", "")
        .split()
    )

    results = []

    for source in sources:
        text = (
            source["title"] + " " + source["content"]
        ).lower()

        score = sum(
            1 for word in words
            if len(word) > 2 and word in text
        )

        if score > 0:
            results.append((score, source))

    results.sort(key=lambda x: x[0], reverse=True)

    return [item[1] for item in results[:3]]


@app.get("/")
def root():
    return {
        "status": "online",
        "message": "Cooperative AI Assistant API is running",
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
        "ai": "Ollama",
        "model": MODEL,
        "knowledge_base": "enabled",
    }


@app.post("/chat")
def chat(request: ChatRequest):

    sources = find_sources(request.message)

    context = ""

    for source in sources:
        context += f"""
SOURCE: {source["title"]}
ORGANIZATION: {source["source"]}
OFFICIAL URL: {source["url"]}

INFORMATION:
{source["content"]}

"""

    if not context:
        context = """
No directly matching information was found in the verified
government knowledge base.

Do not invent official facts.
Tell the user that the exact information should be verified
from the relevant official government source.
"""

    system_prompt = f"""
You are a multilingual Cooperative Assistance chatbot for
farmers, cooperative society members and rural users in India.

User language: {request.language}

Answer in that language.

Help users understand:
- PACS
- cooperative societies
- cooperative governance
- cooperative rules and laws
- government schemes
- agricultural support
- PMFBY
- loans and banking
- financial literacy
- grievances

IMPORTANT RULES:

1. Use very simple language.
2. Give practical steps where possible.
3. Never invent laws, schemes, eligibility rules,
   deadlines, documents, phone numbers or procedures.
4. Use the verified government information supplied below.
5. If exact information is unavailable, clearly say so.
6. You are an information assistant, not a lawyer.
7. Do not present assumptions as official instructions.
8. Mention the official source when relevant.

VERIFIED GOVERNMENT INFORMATION:

{context}
"""

    payload = {
        "model": MODEL,
        "messages": [
            {
                "role": "system",
                "content": system_prompt,
            },
            {
                "role": "user",
                "content": request.message,
            },
        ],
        "stream": False,
    }

    try:
        response = requests.post(
            OLLAMA_URL,
            json=payload,
            timeout=180,
        )

        response.raise_for_status()

        data = response.json()

        return {
            "reply": data["message"]["content"],
            "language": request.language,
            "sources": [
                {
                    "title": source["title"],
                    "url": source["url"],
                }
                for source in sources
            ],
        }

    except requests.exceptions.ConnectionError:
        return {
            "reply": "Local AI service is not running. Please start Ollama.",
            "language": request.language,
            "sources": [],
        }

    except requests.exceptions.Timeout:
        return {
            "reply": "The AI took too long to respond. Please try again.",
            "language": request.language,
            "sources": [],
        }

    except Exception as error:
        print("AI ERROR:", error)

        return {
            "reply": "Sorry, I could not process your question.",
            "language": request.language,
            "sources": [],
        }