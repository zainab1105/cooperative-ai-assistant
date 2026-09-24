import { useState } from "react";
import "./App.css";

const translations = {
  English: {
    brand: "Cooperative Assistance",
    subtitle: "Cooperative Assistance Service",
    language: "Language",
    welcome: "Hello! How can I help you?",
    description:
      "Ask about cooperative societies, government schemes, rules and other services.",
    speak: "Speak your question",
    speakSub: "Ask using your voice",
    typeQuestion: "Or type your question",
    placeholder: "Type your question here...",
    topics: "What would you like information about?",
    thinking: "Thinking...",
    assistant: "Cooperative Assistant",
    error: "Sorry, I could not connect to the assistant. Please try again.",
    topicsData: [
      ["🌾", "Government Schemes", "Government Schemes"],
      ["🏛️", "PACS", "Cooperative Services"],
      ["📄", "Rules & Laws", "Cooperative Rules and Laws"],
      ["💰", "Loans & Banking", "Loans and Financial Services"],
      ["📢", "Grievance", "Complaints and Support"],
      ["❓", "Other Questions", "Ask anything related to cooperatives"],
    ],
  },

  हिन्दी: {
    brand: "सहकारी सहायता",
    subtitle: "सहकारी सहायता सेवा",
    language: "भाषा",
    welcome: "नमस्कार! मैं आपकी सहायता कर सकता हूँ।",
    description:
      "सहकारी समितियों, सरकारी योजनाओं, नियमों और अन्य सेवाओं के बारे में पूछें।",
    speak: "बोलकर पूछें",
    speakSub: "अपनी आवाज़ से सवाल पूछें",
    typeQuestion: "या अपना सवाल लिखें",
    placeholder: "अपना सवाल यहां लिखें...",
    topics: "आप किस बारे में जानकारी चाहते हैं?",
    thinking: "जानकारी खोजी जा रही है...",
    assistant: "सहकारी सहायक",
    error: "सहायक से संपर्क नहीं हो पाया। कृपया दोबारा कोशिश करें।",
    topicsData: [
      ["🌾", "सरकारी योजनाएं", "सरकारी योजनाओं की जानकारी"],
      ["🏛️", "PACS", "सहकारी सेवाएं"],
      ["📄", "नियम / कानून", "सहकारी नियम और कानून"],
      ["💰", "ऋण / बैंकिंग", "ऋण और वित्तीय सेवाएं"],
      ["📢", "शिकायत", "शिकायत और सहायता"],
      ["❓", "अन्य सवाल", "सहकारिता से जुड़ा कोई भी सवाल"],
    ],
  },

  मराठी: {
    brand: "सहकारी मदत",
    subtitle: "सहकारी मदत सेवा",
    language: "भाषा",
    welcome: "नमस्कार! मी तुमची मदत करू शकतो.",
    description:
      "सहकारी संस्था, सरकारी योजना, नियम आणि इतर सेवांबद्दल माहिती विचारा.",
    speak: "बोलून विचारा",
    speakSub: "तुमच्या आवाजाने प्रश्न विचारा",
    typeQuestion: "किंवा तुमचा प्रश्न लिहा",
    placeholder: "तुमचा प्रश्न येथे लिहा...",
    topics: "तुम्हाला कशाबद्दल माहिती हवी आहे?",
    thinking: "माहिती शोधत आहे...",
    assistant: "सहकारी सहाय्यक",
    error: "सहाय्यकाशी संपर्क होऊ शकला नाही. कृपया पुन्हा प्रयत्न करा.",
    topicsData: [
      ["🌾", "सरकारी योजना", "सरकारी योजनांची माहिती"],
      ["🏛️", "PACS", "सहकारी सेवा"],
      ["📄", "नियम / कायदे", "सहकारी नियम आणि कायदे"],
      ["💰", "कर्ज / बँकिंग", "कर्ज आणि आर्थिक सेवा"],
      ["📢", "तक्रार", "तक्रार आणि मदत"],
      ["❓", "इतर प्रश्न", "सहकाराशी संबंधित कोणताही प्रश्न"],
    ],
  },
};

function App() {
  const [language, setLanguage] = useState("English");
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const t = translations[language];

  const handleSend = async () => {
    if (!message.trim() || loading) return;

    setLoading(true);
    setReply("");

    try {
      const response = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message,
          language: language,
        }),
      });

      if (!response.ok) {
        throw new Error("Server error");
      }

      const data = await response.json();

      setReply(data.reply);
      setMessage("");
    } catch (error) {
      console.error(error);
      setReply(t.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">

      {/* HEADER */}
      <header className="header">
        <div className="brand">
          <div className="brand-icon">🌱</div>

          <div>
            <h1>{t.brand}</h1>
            <p>{t.subtitle}</p>
          </div>
        </div>

        <div className="language">
          <span>{t.language}</span>

          <select
            value={language}
            onChange={(e) => {
              setLanguage(e.target.value);
              setReply("");
            }}
          >
            <option value="English">English</option>
            <option value="हिन्दी">हिन्दी</option>
            <option value="मराठी">मराठी</option>
          </select>
        </div>
      </header>

      {/* MAIN */}
      <main className="main">

        {/* WELCOME */}
        <section className="welcome">

          <h2>👋 {t.welcome}</h2>

          <p>{t.description}</p>
        </section>

        {/* VOICE */}
        <button className="voice-button">
          <span className="mic">🎙️</span>

          <span className="voice-text">
            <strong>{t.speak}</strong>
            <small>{t.speakSub}</small>
          </span>
        </button>

        {/* TEXT INPUT */}
        <div className="or">
          <span>{t.typeQuestion}</span>
        </div>

        <div className="input-box">
          <input
            type="text"
            placeholder={t.placeholder}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
          />

          <button
            onClick={handleSend}
            aria-label="Send question"
          >
            ➜
          </button>
        </div>

        {/* ASSISTANT RESPONSE */}
        {loading && (
          <div className="assistant-status">
            {t.thinking}
          </div>
        )}

        {reply && (
          <div className="assistant-reply">
            <div className="reply-label">
              🌱 {t.assistant}
            </div>

            <p>{reply}</p>
          </div>
        )}

        {/* TOPICS */}
        <section className="topics">
          <h3>{t.topics}</h3>

          <div className="topic-grid">
            {t.topicsData.map(([icon, title, subtitle]) => (
              <button
                className="topic-card"
                key={title}
                onClick={() => setMessage(title)}
              >
                <span className="topic-icon">{icon}</span>

                <span className="topic-content">
                  <strong>{title}</strong>
                  <small>{subtitle}</small>
                </span>
              </button>
            ))}
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer>
        <span>Government Information Assistance</span>
        <span>•</span>
        <span>Multilingual • Voice Enabled</span>
      </footer>

    </div>
  );
}

export default App;