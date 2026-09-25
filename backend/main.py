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
MODEL = "qwen3:0.6b"


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


def load_schemes():
    try:
        with open("knowledge/schemes.json", "r", encoding="utf-8") as file:
            return json.load(file)
    except Exception as error:
        print("Scheme knowledge base error:", error)
        return []


SCHEMES = load_schemes()


# --------------------------------------------------
# FAST DEMO ANSWERS
# --------------------------------------------------

answers = {
    "pacs": {
        "English": "PACS stands for Primary Agricultural Credit Societies. PACS are cooperative societies that provide services such as agricultural credit and other services to rural communities. The Ministry of Cooperation also supports initiatives such as PACS computerization, Model Bye-laws and diversification of PACS activities.",
        "हिन्दी": "PACS का पूरा नाम Primary Agricultural Credit Societies यानी प्राथमिक कृषि साख समितियाँ है। ये सहकारी समितियाँ ग्रामीण क्षेत्रों में कृषि ऋण और अन्य सेवाएँ उपलब्ध कराने में मदद करती हैं। सहकारिता मंत्रालय PACS के कंप्यूटरीकरण, मॉडल उप-नियम और PACS की विभिन्न गतिविधियों को बढ़ावा देने जैसी पहल करता है।",
        "मराठी": "PACS म्हणजे Primary Agricultural Credit Societies म्हणजेच प्राथमिक कृषी पतसंस्था. या सहकारी संस्था ग्रामीण भागातील लोकांना कृषी कर्ज आणि इतर सेवा उपलब्ध करून देण्यास मदत करतात. सहकार मंत्रालय PACS चे संगणकीकरण, मॉडेल उपनियम आणि PACS च्या विविध उपक्रमांना प्रोत्साहन देते."
    },

    "computerization": {
        "English": "The Computerization of PACS project aims to improve the efficiency and transparency of PACS operations, speed up loan processing and enable online operations through common ERP-based software.",
        "हिन्दी": "PACS के कंप्यूटरीकरण का उद्देश्य PACS के कामकाज को अधिक कुशल और पारदर्शी बनाना, ऋण प्रक्रिया को तेज करना और सामान्य ERP आधारित सॉफ्टवेयर के माध्यम से ऑनलाइन कामकाज को सक्षम करना है।",
        "मराठी": "PACS च्या संगणकीकरणाचा उद्देश PACS चे कामकाज अधिक कार्यक्षम आणि पारदर्शक करणे, कर्ज प्रक्रिया जलद करणे आणि सामान्य ERP आधारित सॉफ्टवेअरद्वारे ऑनलाइन कामकाज सक्षम करणे हा आहे."
    },

    "bylaws": {
        "English": "The Ministry of Cooperation provides Model Bye-laws for PACS. They support governance, transparency and diversification of PACS activities. The exact provisions can depend on the applicable State Cooperative Societies Act and rules.",
        "हिन्दी": "सहकारिता मंत्रालय PACS के लिए मॉडल उप-नियम उपलब्ध कराता है। इनका उद्देश्य PACS के शासन, पारदर्शिता और विभिन्न गतिविधियों को बढ़ावा देना है। सटीक प्रावधान संबंधित राज्य के सहकारी समिति कानून और नियमों पर निर्भर कर सकते हैं।",
        "मराठी": "सहकार मंत्रालय PACS साठी मॉडेल उपनियम उपलब्ध करून देते. यामुळे PACS चे प्रशासन, पारदर्शकता आणि विविध उपक्रमांना मदत होते. अचूक तरतुदी संबंधित राज्याच्या सहकारी संस्था कायदा आणि नियमांवर अवलंबून असू शकतात."
    },

    "pmfby": {
        "English": "PMFBY stands for Pradhan Mantri Fasal Bima Yojana, a crop insurance scheme. Farmers should use the official PMFBY portal to check current enrollment procedures, eligibility and requirements.",
        "हिन्दी": "PMFBY का पूरा नाम प्रधानमंत्री फसल बीमा योजना है। यह फसल बीमा योजना है। किसान वर्तमान नामांकन प्रक्रिया, पात्रता और आवश्यकताओं की जानकारी के लिए आधिकारिक PMFBY पोर्टल देख सकते हैं।",
        "मराठी": "PMFBY म्हणजे प्रधानमंत्री फसल विमा योजना. ही पीक विमा योजना आहे. शेतकऱ्यांनी सध्याची नोंदणी प्रक्रिया, पात्रता आणि आवश्यक कागदपत्रांची माहिती जाणून घेण्यासाठी अधिकृत PMFBY पोर्टल तपासावे."
    },

    "schemes": {
        "English": "The Ministry of Cooperation lists several schemes and initiatives relevant to agriculture, PACS and rural development. These include Agriculture Infrastructure Fund (AIF), Agriculture Marketing Infrastructure (AMI), Sub-Mission on Agricultural Mechanization (SMAM), Mission for Integrated Development of Horticulture (MIDH), PM Formalization of Micro Food Processing Enterprises (PMFME), and Pradhan Mantri Fasal Bima Yojana (PMFBY).",
        "हिन्दी": "सहकारिता मंत्रालय कृषि, PACS और ग्रामीण विकास से संबंधित कई योजनाओं और पहलों की जानकारी देता है। इनमें Agriculture Infrastructure Fund (AIF), Agriculture Marketing Infrastructure (AMI), Sub-Mission on Agricultural Mechanization (SMAM), Mission for Integrated Development of Horticulture (MIDH), PM Formalization of Micro Food Processing Enterprises (PMFME) और Pradhan Mantri Fasal Bima Yojana (PMFBY) शामिल हैं।",
        "मराठी": "सहकार मंत्रालय कृषी, PACS आणि ग्रामीण विकासाशी संबंधित अनेक योजना आणि उपक्रमांची माहिती देते. यामध्ये Agriculture Infrastructure Fund (AIF), Agriculture Marketing Infrastructure (AMI), Sub-Mission on Agricultural Mechanization (SMAM), Mission for Integrated Development of Horticulture (MIDH), PM Formalization of Micro Food Processing Enterprises (PMFME) आणि Pradhan Mantri Fasal Bima Yojana (PMFBY) यांचा समावेश आहे."
    }
}


# --------------------------------------------------
# ACTUAL SCHEME DATABASE SEARCH
# --------------------------------------------------

def find_scheme(question, language):
    q = question.lower().strip()

    # Exact / keyword matching
    matches = []

    for scheme in SCHEMES:
        keywords = scheme.get("keywords", [])

        for keyword in keywords:
            if keyword.lower() in q:
                matches.append(scheme)
                break

    if not matches:
        return None

    # Remove duplicates while preserving order
    unique_matches = []
    seen = set()

    for scheme in matches:
        if scheme["id"] not in seen:
            unique_matches.append(scheme)
            seen.add(scheme["id"])

    # One strongest result for now
    scheme = unique_matches[0]

    answer = scheme["answer"].get(
        language,
        scheme["answer"]["English"]
    )

    return {
        "reply": answer,
        "language": language,
        "translations": scheme["answer"],
        "sources": [
            {
                "title": scheme["source"],
                "url": scheme["url"]
            }
        ],
        "scheme": {
            "id": scheme["id"],
            "name": scheme["name"],
            "purpose": scheme["purpose"]
        }
    }


# --------------------------------------------------
# FAST QUESTION ANSWERS
# --------------------------------------------------

def get_fast_answer(question, language):
    q = question.lower().strip()

    # --------------------------------------------------
    # 1. BYE-LAWS — CHECK BEFORE PACS
    # --------------------------------------------------
    if (
        "bye-law" in q
        or "bye laws" in q
        or "byelaw" in q
        or "byelaws" in q
        or "model bye" in q
        or "उप-नियम" in q
        or "उपनियम" in q
    ):
        return {
            "reply": answers["bylaws"][language],
            "translations": answers["bylaws"],
            "sources": []
        }

    # --------------------------------------------------
    # 2. COMPUTERIZATION
    # --------------------------------------------------
    if (
        "computerization" in q
        or "computerisation" in q
        or "computerize" in q
        or "computerise" in q
        or "pacs computer" in q
        or "कंप्यूटरीकरण" in q
        or "संगणकीकरण" in q
    ):
        return {
            "reply": answers["computerization"][language],
            "translations": answers["computerization"],
            "sources": []
        }

    # --------------------------------------------------
    # 3. PMFBY / CROP INSURANCE
    # --------------------------------------------------
    if (
        "pmfby" in q
        or "crop insurance" in q
        or "crop insurance scheme" in q
        or "फसल बीमा" in q
        or "पीक विमा" in q
    ):
        return {
            "reply": answers["pmfby"][language],
            "translations": answers["pmfby"],
            "sources": []
        }

    # --------------------------------------------------
    # 4. GOVERNMENT SCHEMES
    # --------------------------------------------------
    if (
        "government schemes" in q
        or "government scheme" in q
        or "govt schemes" in q
        or "govt scheme" in q
        or "सरकारी योजना" in q
        or "सरकारी योजनाएं" in q
        or "सरकारी योजनाएँ" in q
    ):
        return {
            "reply": answers["schemes"][language],
            "translations": answers["schemes"],
            "sources": []
        }

    # --------------------------------------------------
    # 5. PACS — ONLY WHEN ACTUALLY ASKING ABOUT PACS
    # --------------------------------------------------
    if "pacs" in q or "पीएसीएस" in q or "पॅक्स" in q:

        if (
            "what is pacs" in q
            or "what are pacs" in q
            or "meaning of pacs" in q
            or "pacs kya hai" in q
            or "pacs क्या है" in q
            or "pacs म्हणजे काय" in q
        ):
            return {
                "reply": answers["pacs"][language],
                "translations": answers["pacs"],
                "sources": []
            }

    # --------------------------------------------------
    # 6. ABOUT THIS WEBSITE / ASSISTANT
    # --------------------------------------------------
    if (
        "this website" in q
        or "about this website" in q
        or "this ai" in q
        or "about this ai" in q
        or "what is this website" in q
        or "website ke baare mein" in q
        or "website ke bare mein" in q
        or "is website ke baare mein" in q
        or "is website ke bare mein" in q
        or "website kya hai" in q
        or "ye website kya hai" in q
        or "ye ai kya hai" in q
        or "assistant ke baare mein" in q
        or "assistant ke bare mein" in q
    ):
        website_answers = {
            "English": "This AI Assistant helps users with cooperative societies, PACS, government schemes, cooperative rules, loans, PMFBY and grievance-related information. You can ask questions in English, Hindi or Marathi using text or voice.",
            "हिन्दी": "यह AI सहायक सहकारी समितियों, PACS, सरकारी योजनाओं, सहकारी नियमों, ऋण, PMFBY और शिकायत से जुड़ी जानकारी में सहायता करता है। आप हिंदी, अंग्रेज़ी या मराठी में टेक्स्ट या आवाज़ से सवाल पूछ सकते हैं।",
            "मराठी": "हा AI सहाय्यक सहकारी संस्था, PACS, सरकारी योजना, सहकारी नियम, कर्ज, PMFBY आणि तक्रारीशी संबंधित माहिती देतो. तुम्ही मराठी, हिंदी किंवा इंग्रजीमध्ये टेक्स्ट किंवा आवाजाने प्रश्न विचारू शकता."
        }

        return {
            "reply": website_answers[language],
            "translations": website_answers,
            "sources": []
        }

    # --------------------------------------------------
    # 7. SEARCH VERIFIED SCHEME DATABASE
    # --------------------------------------------------
    scheme_result = find_scheme(question, language)

    if scheme_result:
        return scheme_result

    # --------------------------------------------------
    # 8. OTHERWISE LET AI UNDERSTAND THE QUESTION
    # --------------------------------------------------
    return None


# --------------------------------------------------
# API
# --------------------------------------------------

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
        "ai": "Ollama fallback",
        "model": MODEL,
        "fast_answers": "enabled",
        "schemes_loaded": len(SCHEMES)
    }


@app.post("/chat")
def chat(request: ChatRequest):

    fast_answer = get_fast_answer(
        request.message,
        request.language
    )

    # INSTANT RESPONSE FOR KNOWLEDGE-BASE QUESTIONS
    if fast_answer:
        return {
            "reply": fast_answer["reply"],
            "language": request.language,
            "translations": fast_answer.get("translations", {}),
            "sources": fast_answer.get("sources", [])
        }

    # --------------------------------------------------
    # AI FALLBACK FOR UNKNOWN QUESTIONS
    # --------------------------------------------------

    prompt = f"""
        You are a helpful multilingual AI assistant for cooperative societies,
        farmers, rural development and government services.

        User language: {request.language}

        IMPORTANT:
        - Understand the user's actual question before answering.
        - Answer the question directly.
        - Do NOT repeat or simply rephrase the user's question.
        - Do NOT give a generic PACS answer unless the user is actually asking about PACS.
        - Do NOT assume the user is asking about a government scheme unless they mention one.
        - If the user asks about this website or this AI assistant, explain what the assistant does.
        - If the question is unclear, ask one short clarification question.
        - Use simple language that rural users can understand.
        - Do not invent government laws, eligibility rules, deadlines,
        documents or official procedures.
        - For government schemes or legal information, use verified information
        when available.
        - If verified information is not available, clearly say that and
        recommend checking the relevant official government source.
        - Respond in the user's selected language.

Question:
{request.message}
"""

    payload = {
        "model": MODEL,
        "messages": [
            {
                "role": "user",
                "content": prompt
            }
        ],
        "stream": False
    }

    try:
        response = requests.post(
            OLLAMA_URL,
            json=payload,
            timeout=60
        )

        response.raise_for_status()

        data = response.json()

        return {
            "reply": data["message"]["content"],
            "language": request.language,
            "sources": []
        }

    except Exception:
        return {
            "reply": "Sorry, I could not process this question right now.",
            "language": request.language,
            "sources": []
        }