import { useEffect, useRef, useState } from "react";
import "./App.css";

const translations = {
  English: {
    language: "Language",
    welcome: "Hello! How can I help you?",
    description:
      "Ask about cooperative societies, government schemes, rules and other services.",
    speak: "Speak your question",
    speakSub: "Ask using your voice",
    placeholder: "Type your question here...",
    suggestions: "Try asking:",
    popular: "Popular Schemes",
    official: "Official Source",
    thinking: "Finding information...",
    assistant: "AI Assistant",
    categories: "Services",
    error: "Sorry, I could not connect to the assistant. Please try again.",
    account: "Account",
    signIn: "Sign In",
    signUp: "Sign Up",
    guest: "Continue as Guest",
    saveData: "Save your chats and preferences",
    welcomeAccount: "Welcome to Cooperative Assistance",
    accountDescription:
      "Use the assistant as a guest, or create an account to save your conversations and preferences.",
    name: "Full Name",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    createAccount: "Create Account",
    alreadyAccount: "Already have an account?",
    noAccount: "Don't have an account?",
    profile: "Profile",
    chatHistory: "Chat History",
    savedData: "Your conversations are saved on this device.",
    signOut: "Sign Out",
    back: "Back",
    close: "Close",
    signedIn: "Signed in",
    accountCreated: "Account created successfully!",
    loginSuccess: "Welcome back!",
    invalidLogin: "Incorrect email or password.",
    accountExists: "An account with this email already exists.",
    passwordMismatch: "Passwords do not match.",
    fillFields: "Please fill all fields.",
    topics: [
      ["🌾", "Government Schemes", "Schemes for farmers and rural development"],
      ["🏛️", "PACS", "Cooperative services"],
      ["📄", "Rules & Laws", "Cooperative rules and regulations"],
      ["💰", "Loans & Banking", "Loans and financial services"],
      ["📢", "Grievance", "Complaints and support"],
      ["❓", "Other Questions", "Ask anything related to cooperatives"],
    ],
    suggestionsList: [
      "PACS kya hai?",
      "Mujhe farming machinery ke liye scheme chahiye",
      "Crop insurance ki jankari do",
      "PACS ke model bye-laws kya hain?",
      "Loan kaise mil sakta hai?",
      "Government schemes kaunsi hain?",
    ],
  },

  हिन्दी: {
    brand: "सहकारी सहायता",
    subtitle: "सहकारी सेवाओं और सरकारी योजनाओं की जानकारी",
    language: "भाषा",
    welcome: "नमस्कार! मैं आपकी कैसे सहायता कर सकता हूँ?",
    description:
      "सहकारी समितियों, सरकारी योजनाओं, नियमों और अन्य सेवाओं के बारे में पूछें।",
    speak: "बोलकर पूछें",
    speakSub: "अपनी आवाज़ से सवाल पूछें",
    placeholder: "अपना सवाल यहां लिखें...",
    suggestions: "पूछकर देखें:",
    popular: "लोकप्रिय योजनाएं",
    official: "आधिकारिक स्रोत",
    thinking: "जानकारी खोजी जा रही है...",
    assistant: "सहकारी सहायक",
    categories: "सेवाएं",
    error: "सहायक से संपर्क नहीं हो पाया। कृपया दोबारा कोशिश करें।",
    account: "खाता",
    signIn: "साइन इन",
    signUp: "साइन अप",
    guest: "अतिथि के रूप में जारी रखें",
    saveData: "अपनी चैट और पसंद सेव करें",
    welcomeAccount: "सहकारी सहायता में आपका स्वागत है",
    accountDescription:
      "आप अतिथि के रूप में सहायक का उपयोग कर सकते हैं या अपनी बातचीत और पसंद सेव करने के लिए खाता बना सकते हैं।",
    name: "पूरा नाम",
    email: "ईमेल",
    password: "पासवर्ड",
    confirmPassword: "पासवर्ड की पुष्टि करें",
    createAccount: "खाता बनाएं",
    alreadyAccount: "पहले से खाता है?",
    noAccount: "खाता नहीं है?",
    profile: "प्रोफ़ाइल",
    chatHistory: "चैट इतिहास",
    savedData: "आपकी बातचीत इस डिवाइस पर सेव है।",
    signOut: "साइन आउट",
    back: "वापस",
    close: "बंद करें",
    signedIn: "साइन इन",
    accountCreated: "खाता सफलतापूर्वक बन गया!",
    loginSuccess: "वापसी पर स्वागत है!",
    invalidLogin: "ईमेल या पासवर्ड गलत है।",
    accountExists: "इस ईमेल से पहले से खाता मौजूद है।",
    passwordMismatch: "पासवर्ड मेल नहीं खाते।",
    fillFields: "कृपया सभी जानकारी भरें।",
    topics: [
      ["🌾", "सरकारी योजनाएं", "किसानों और ग्रामीण विकास की योजनाएं"],
      ["🏛️", "PACS", "सहकारी सेवाएं"],
      ["📄", "नियम / कानून", "सहकारी नियम और कानून"],
      ["💰", "ऋण / बैंकिंग", "ऋण और वित्तीय सेवाएं"],
      ["📢", "शिकायत", "शिकायत और सहायता"],
      ["❓", "अन्य सवाल", "सहकारिता से जुड़ा कोई भी सवाल"],
    ],
    suggestionsList: [
      "PACS क्या है?",
      "कृषि मशीनरी के लिए योजना चाहिए",
      "फसल बीमा की जानकारी दो",
      "PACS के मॉडल उप-नियम क्या हैं?",
      "कृषि ऋण कैसे मिल सकता है?",
      "सरकारी योजनाएं कौनसी हैं?",
    ],
  },

  मराठी: {
    brand: "सहकारी मदत",
    subtitle: "सहकारी सेवा आणि सरकारी योजनांची माहिती",
    language: "भाषा",
    welcome: "नमस्कार! मी तुमची कशी मदत करू शकतो?",
    description:
      "सहकारी संस्था, सरकारी योजना, नियम आणि इतर सेवांबद्दल माहिती विचारा.",
    speak: "बोलून विचारा",
    speakSub: "तुमच्या आवाजाने प्रश्न विचारा",
    placeholder: "तुमचा प्रश्न येथे लिहा...",
    suggestions: "असे विचारून पहा:",
    popular: "लोकप्रिय योजना",
    official: "अधिकृत स्रोत",
    thinking: "माहिती शोधत आहे...",
    assistant: "सहकारी सहाय्यक",
    categories: "सेवा",
    error: "सहाय्यकाशी संपर्क होऊ शकला नाही. कृपया पुन्हा प्रयत्न करा.",
    account: "खाते",
    signIn: "साइन इन",
    signUp: "साइन अप",
    guest: "अतिथी म्हणून पुढे जा",
    saveData: "तुमच्या चॅट आणि पसंती जतन करा",
    welcomeAccount: "सहकारी मदतीमध्ये आपले स्वागत आहे",
    accountDescription:
      "तुम्ही अतिथी म्हणून सहाय्यक वापरू शकता किंवा संभाषण आणि पसंती जतन करण्यासाठी खाते तयार करू शकता.",
    name: "पूर्ण नाव",
    email: "ईमेल",
    password: "पासवर्ड",
    confirmPassword: "पासवर्डची पुष्टी करा",
    createAccount: "खाते तयार करा",
    alreadyAccount: "आधीच खाते आहे?",
    noAccount: "खाते नाही?",
    profile: "प्रोफाइल",
    chatHistory: "चॅट इतिहास",
    savedData: "तुमचे संभाषण या डिव्हाइसवर जतन केले आहे.",
    signOut: "साइन आउट",
    back: "मागे",
    close: "बंद करा",
    signedIn: "साइन इन",
    accountCreated: "खाते यशस्वीपणे तयार झाले!",
    loginSuccess: "पुन्हा स्वागत आहे!",
    invalidLogin: "ईमेल किंवा पासवर्ड चुकीचा आहे.",
    accountExists: "या ईमेलने आधीच खाते आहे.",
    passwordMismatch: "पासवर्ड जुळत नाहीत.",
    fillFields: "कृपया सर्व माहिती भरा.",
    topics: [
      ["🌾", "सरकारी योजना", "शेतकरी आणि ग्रामीण विकासासाठी योजना"],
      ["🏛️", "PACS", "सहकारी सेवा"],
      ["📄", "नियम / कायदे", "सहकारी नियम आणि कायदे"],
      ["💰", "कर्ज / बँकिंग", "कर्ज आणि आर्थिक सेवा"],
      ["📢", "तक्रार", "तक्रार आणि मदत"],
      ["❓", "इतर प्रश्न", "सहकाराशी संबंधित प्रश्न विचारा"],
    ],
    suggestionsList: [
      "PACS म्हणजे काय?",
      "कृषी यंत्रसामग्रीसाठी योजना आहे का?",
      "पीक विम्याची माहिती द्या",
      "PACS चे मॉडेल उपनियम काय आहेत?",
      "कृषी कर्ज कसे मिळेल?",
      "सरकारी योजना कोणत्या आहेत?",
    ],
  },
};

const popularSchemes = [
  ["🌱", "PM Fasal Bima Yojana (PMFBY)", "PMFBY"],
  ["🚜", "SMAM (Farm Machinery)", "SMAM"],
  ["🏢", "Agriculture Infrastructure Fund (AIF)", "AIF"],
  ["🏪", "Agriculture Marketing Infrastructure (AMI)", "AMI"],
  ["🌿", "MIDH (Horticulture)", "MIDH"],
  ["🍱", "PMFME (Food Processing)", "PMFME"],
];

function App() {
  const [language, setLanguage] = useState(
    localStorage.getItem("cooperative_language") || "English"
  );

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const [languageMenu, setLanguageMenu] = useState(false);

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(
      localStorage.getItem("cooperative_current_user") || "null"
    )
  );

  const [authPopup, setAuthPopup] = useState(
    !JSON.parse(
      localStorage.getItem("cooperative_current_user") || "null"
    ) &&
      !sessionStorage.getItem("cooperative_auth_seen")
  );

  const [authMode, setAuthMode] = useState("welcome");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [chatHydrated, setChatHydrated] = useState(false);

  const [accountMenu, setAccountMenu] = useState(false);
  const [accountView, setAccountView] = useState(null);
  const [authMessage, setAuthMessage] = useState("");

  const t = translations[language];

  // LOAD CHAT HISTORY WHEN ACCOUNT IS OPENED
useEffect(() => {
  if (!currentUser) {
    setMessages([]);
    setChatHydrated(true);
    return;
  }

  setChatHydrated(false);

  const savedChats = localStorage.getItem(
    `cooperative_chats_${currentUser.email}`
  );

  if (savedChats) {
    try {
      setMessages(JSON.parse(savedChats));
    } catch (error) {
      console.error("Could not load chat history:", error);
      setMessages([]);
    }
  } else {
    setMessages([]);
  }

  setChatHydrated(true);
}, [currentUser]);

// LOAD SAVED LANGUAGE
useEffect(() => {
  const languageKey = currentUser
    ? `cooperative_language_${currentUser.email}`
    : "cooperative_guest_language";

  const savedLanguage = localStorage.getItem(languageKey);

  if (savedLanguage) {
    setLanguage(savedLanguage);
  }
}, [currentUser]);

// SAVE CHAT HISTORY AFTER IT HAS BEEN LOADED
useEffect(() => {
  if (!currentUser || !chatHydrated) return;

  localStorage.setItem(
    `cooperative_chats_${currentUser.email}`,
    JSON.stringify(messages)
  );
}, [messages, currentUser, chatHydrated]);

  /* =========================
     LANGUAGE
  ========================= */

  const handleLanguageChange = async (newLanguage) => {
    setLanguage(newLanguage);

    const languageKey = currentUser
      ? `cooperative_language_${currentUser.email}`
      : "cooperative_guest_language";

    localStorage.setItem(languageKey, newLanguage);

    // First change all answers that already have translations
    setMessages((prev) =>
      prev.map((msg) => {
        if (
          msg.type === "bot" &&
          msg.translations &&
          msg.translations[newLanguage]
        ) {
          return {
            ...msg,
            text: msg.translations[newLanguage],
          };
        }

        return msg;
      })
    );

    // Re-fetch answers that do not have the selected language
    const currentMessages = [...messages];

    for (let i = 0; i < currentMessages.length; i++) {
      const msg = currentMessages[i];

      if (
        msg.type !== "bot" ||
        !msg.question ||
        (msg.translations && msg.translations[newLanguage])
      ) {
        continue;
      }

      try {
        const response = await fetch(
          "http://127.0.0.1:8000/chat",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              message: msg.question,
              language: newLanguage,
            }),
          }
        );

        if (!response.ok) continue;

        const data = await response.json();

        setMessages((prev) =>
          prev.map((item, index) => {
            if (index !== i) return item;

            return {
              ...item,
              text: data.reply,
              translations: data.translations || item.translations || {},
              sources: data.sources || item.sources || [],
            };
          })
        );
      } catch (error) {
        console.error("Language change error:", error);
      }
    }
  };

  /* =========================
     CHAT
  ========================= */

  const addBotMessage = (data, originalQuestion = "") => {
    setMessages((prev) => [
      ...prev,
      {
        type: "bot",
        text: data.reply,
        translations: data.translations || {},
        sources: data.sources || [],
        question: originalQuestion,
      },
    ]);
  };

  const handleSend = async (question) => {
    const text = (question ?? message).trim();

    if (!text || loading) return;

    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        text,
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: text,
            language,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Server error");
      }

      const data = await response.json();

      addBotMessage(data, text);
    } catch (error) {
      console.error(error);

     addBotMessage(
      {
        reply: t.error,
        translations: {
          English: translations.English.error,
          हिन्दी: translations.हिन्दी.error,
          मराठी: translations.मराठी.error,
        },
        sources: [],
      },
      text
    );

    } finally {
      setLoading(false);
    }
  };

  /* =========================
     VOICE
  ========================= */

  const startVoice = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice input is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang =
      language === "हिन्दी"
        ? "hi-IN"
        : language === "मराठी"
        ? "mr-IN"
        : "en-IN";

    recognition.start();

    recognition.onresult = (event) => {
      const text =
        event.results[0][0].transcript;

      setMessage(text);
    };
  };

  const speakAnswer = (text) => {
    if (!window.speechSynthesis) {
      alert("Voice output is not supported in this browser.");
      return;
    }

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);

    speech.lang =
      language === "हिन्दी"
        ? "hi-IN"
        : language === "मराठी"
        ? "mr-IN"
        : "en-IN";

    speech.rate = 0.9;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
  };

  /* =========================
     CATEGORY
  ========================= */

  const handleCategory = (title) => {
    if (
      title === "Government Schemes" ||
      title === "सरकारी योजनाएं" ||
      title === "सरकारी योजना"
    ) {
      handleSend("Government schemes");
      return;
    }

    if (title === "PACS") {
      handleSend("What is PACS?");
      return;
    }

    if (
      title.includes("Rules") ||
      title.includes("नियम") ||
      title.includes("कायदे")
    ) {
      handleSend("What are PACS model bye-laws?");
      return;
    }

    if (
      title.includes("Loans") ||
      title.includes("ऋण") ||
      title.includes("कर्ज")
    ) {
      handleSend("How can I get an agricultural loan?");
      return;
    }

    if (
      title.includes("Grievance") ||
      title.includes("शिकायत") ||
      title.includes("तक्रार")
    ) {
      handleSend("How can I raise a cooperative grievance?");
      return;
    }

    handleSend("Tell me about cooperative services.");
  };

  /* =========================
     AUTH
  ========================= */

  const closeAuthPopup = () => {
    sessionStorage.setItem(
      "cooperative_auth_seen",
      "true"
    );

    setAuthPopup(false);
    setAuthMode("welcome");
    setAuthMessage("");
  };

  const continueAsGuest = () => {
    closeAuthPopup();
  };

  const handleSignUp = (event) => {
    event.preventDefault();

    if (
      !name.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword
    ) {
      setAuthMessage(t.fillFields);
      return;
    }

    if (password !== confirmPassword) {
      setAuthMessage(t.passwordMismatch);
      return;
    }

    const users = JSON.parse(
      localStorage.getItem("cooperative_users") || "[]"
    );

    const existingUser = users.find(
      (user) =>
        user.email.toLowerCase() ===
        email.toLowerCase()
    );

    if (existingUser) {
      setAuthMessage(t.accountExists);
      return;
    }

    const newUser = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
    };

    users.push(newUser);

    localStorage.setItem(
      "cooperative_users",
      JSON.stringify(users)
    );

    localStorage.setItem(
      "cooperative_current_user",
      JSON.stringify({
        name: newUser.name,
        email: newUser.email,
      })
    );

    setCurrentUser({
      name: newUser.name,
      email: newUser.email,
    });

    setMessages([]);
    setAuthMessage(t.accountCreated);

    setTimeout(() => {
      closeAuthPopup();
    }, 700);
  };

  const handleSignIn = (event) => {
    event.preventDefault();

    if (!email.trim() || !password) {
      setAuthMessage(t.fillFields);
      return;
    }

    const users = JSON.parse(
      localStorage.getItem("cooperative_users") || "[]"
    );

    const user = users.find(
      (item) =>
        item.email.toLowerCase() ===
          email.toLowerCase() &&
        item.password === password
    );

    if (!user) {
      setAuthMessage(t.invalidLogin);
      return;
    }

    const loggedUser = {
      name: user.name,
      email: user.email,
    };

    localStorage.setItem(
      "cooperative_current_user",
      JSON.stringify(loggedUser)
    );

    setCurrentUser(loggedUser);

    setAuthMessage(t.loginSuccess);

    setTimeout(() => {
      closeAuthPopup();
    }, 700);
  };

  const handleSignOut = () => {
    localStorage.removeItem(
      "cooperative_current_user"
    );

    setCurrentUser(null);
    setMessages([]);
    setAccountMenu(false);

    setAuthMode("welcome");
    setAuthPopup(true);
  };

  /* =========================
     UI
  ========================= */

  return (
    <div className="app">

      {/* HEADER */}

      <header className="header">

        <div className="chat-title">
          <div className="bot-avatar">🤖</div>

          <h2>AI Assistant</h2>
        </div>

        <div className="header-right">
          <span className="online-status">
            <span className="online-dot">●</span> Online
          </span>

          {/* YAHAN agar language/account buttons already hain,
              unko rehne dena */}
        </div>

      </header>

      {/* MAIN */}

      <main className="dashboard">

        {/* LEFT */}

        <aside className="sidebar">

          <h3>{t.categories}</h3>

          <div className="category-list">

            {t.topics.map(
              ([icon, title, subtitle]) => (
                <button
                  className="category-card"
                  key={title}
                  onClick={() =>
                    handleCategory(title)
                  }
                >

                  <span className="category-icon">
                    {icon}
                  </span>

                  <span className="category-text">
                    <strong>{title}</strong>
                    <small>{subtitle}</small>
                  </span>

                  <span className="arrow">
                    ›
                  </span>

                </button>
              )
            )}

          </div>

          <div className="language-card">

            <div className="language-card-icon">
              🌱
            </div>

            <strong>
              Ask in your language
            </strong>

            <p>
              Get information in English,
              Hindi or Marathi
            </p>

          </div>

        </aside>

        {/* CHAT */}

        <section className="chat-section">

          <div className="chat-header">

            <div className="chat-header-info">

              <div className="chat-avatar">
                🤖
              </div>

              <div>
                <strong>
                  {t.assistant}
                </strong>

                <span>
                  ● Online
                </span>
              </div>

            </div>

            <div className="chat-header-actions">

              <div className="chat-language">

                <div className="language-dropdown">
                  <button
                    className="language-button"
                    onClick={() => setLanguageMenu(!languageMenu)}
                  >
                    🌐
                    <span>{language}</span>
                    <span className="language-arrow">⌄</span>
                  </button>

                  {languageMenu && (
                    <div className="language-menu">
                      <button
                        onClick={() => {
                          handleLanguageChange("English");
                          setLanguageMenu(false);
                        }}
                      >
                        English
                      </button>

                      <button
                        onClick={() => {
                          handleLanguageChange("हिन्दी");
                          setLanguageMenu(false);
                        }}
                      >
                        हिन्दी
                      </button>

                      <button
                        onClick={() => {
                          handleLanguageChange("मराठी");
                          setLanguageMenu(false);
                        }}
                      >
                        मराठी
                      </button>
                    </div>
                  )}
                </div>

              </div>

              <div className="account-wrapper">

                <button
                  className="account-button"
                  onClick={() =>
                    setAccountMenu(
                      !accountMenu
                    )
                  }
                >
                  <span className="account-avatar">
                    {currentUser
                      ? currentUser.name
                          .charAt(0)
                          .toUpperCase()
                      : "👤"}
                  </span>

                  <span>
                    {currentUser
                      ? currentUser.name
                      : t.account}
                  </span>

                  <span>⌄</span>
                </button>

                {accountMenu && (
                  <div className="account-menu">

                    {currentUser ? (
                      <>
                        <div className="account-menu-user">

                          <div className="profile-circle">
                            {currentUser.name
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <div>
                            <strong>
                              {currentUser.name}
                            </strong>

                            <small>
                              {currentUser.email}
                            </small>
                          </div>

                        </div>

                        <div className="account-menu-divider" />

                        <button
                          className="account-menu-item"
                          onClick={() => {
                            setAccountView("profile");
                            setAccountMenu(false);
                          }}
                        >
                          👤 {t.profile}
                        </button>

                        <button
                          className="account-menu-item"
                          onClick={() => {
                            setAccountView("history");
                            setAccountMenu(false);
                          }}
                        >
                          💬 {t.chatHistory}
                        </button>

                        <button
                          className="account-menu-item"
                          onClick={() => {
                            setAccountView("saved");
                            setAccountMenu(false);
                          }}
                        >
                          💾 {t.savedData}
                        </button>

                        <button
                          className="signout-button"
                          onClick={
                            handleSignOut
                          }
                        >
                          🚪 {t.signOut}
                        </button>

                      </>
                    ) : (
                      <>
                        <button
                          className="account-menu-action"
                          onClick={() => {
                            setAuthMode(
                              "signin"
                            );
                            setAuthPopup(true);
                            setAccountMenu(false);
                          }}
                        >
                          🔐 {t.signIn}
                        </button>

                        <button
                          className="account-menu-action primary"
                          onClick={() => {
                            setAuthMode(
                              "signup"
                            );
                            setAuthPopup(true);
                            setAccountMenu(false);
                          }}
                        >
                          📝 {t.signUp}
                        </button>
                      </>
                    )}

                  </div>
                )}

              </div>

            </div>

          </div>

          <div className="chat-messages">

            {messages.length === 0 && (
              <div className="welcome-message">

                <div className="bot-avatar">
                  🤖
                </div>

                <div className="bot-bubble">

                  <h2>
                    {t.welcome}
                  </h2>

                  <p>
                    {t.description}
                  </p>

                  <div className="welcome-tip">
                    💡 You can type or speak your question.
                  </div>

                </div>

              </div>
            )}

            {messages.map(
              (msg, index) => (

                <div
                  className={`message-row ${msg.type}`}
                  key={index}
                >

                  {msg.type === "bot" && (
                    <div className="bot-avatar">
                      🤖
                    </div>
                  )}

                  <div className="message-content">

                    <div
                      className={
                        msg.type === "user"
                          ? "user-bubble"
                          : "bot-bubble"
                      }
                    >

                      {msg.type ===
                        "bot" && (
                        <div className="bot-title">
                          🌱 {t.assistant}
                        </div>
                      )}

                      <div className="message-text">
                        {msg.text}
                      </div>

                      {msg.type === "bot" && (
                        <button
                          className="speak-answer-button"
                          onClick={() => speakAnswer(msg.text)}
                          title="Listen to answer"
                        >
                          🔊 Listen
                        </button>
                      )}

                      {msg.sources?.length >
                        0 && (
                        <div className="source-card">

                          <strong>
                            🔗 {t.official}
                          </strong>

                          {msg.sources.map(
                            (source) => (
                              <a
                                key={source.url}
                                href={source.url}
                                target="_blank"
                                rel="noreferrer"
                              >
                                {source.title} ↗
                              </a>
                            )
                          )}

                        </div>
                      )}

                    </div>

                  </div>

                  {msg.type === "user" && (
                    <div className="user-avatar">
                      👤
                    </div>
                  )}

                </div>

              )
            )}

            {loading && (
              <div className="message-row bot">

                <div className="bot-avatar">
                  🤖
                </div>

                <div className="bot-bubble typing">

                  <span></span>
                  <span></span>
                  <span></span>

                  <small>
                    {t.thinking}
                  </small>

                </div>

              </div>
            )}

          </div>

          {/* INPUT */}

          <div className="input-area">

            <button
              className="voice-button"
              onClick={startVoice}
              title={t.speak}
            >
              🎙️
            </button>

            <input
              type="text"
              placeholder={
                t.placeholder
              }
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSend();
                }
              }}
            />

            <button
              className="send-button"
              onClick={() =>
                handleSend()
              }
            >
              ➤
            </button>

          </div>

          <div className="input-hint">
            {t.speak} • English • हिंदी • मराठी
          </div>

        </section>

        {/* RIGHT */}

        <aside className="rightbar">

          <div className="right-card">

            <h3>
              💡 {t.suggestions}
            </h3>

            <div className="suggestions">

              {t.suggestionsList.map(
                (question) => (
                  <button
                    key={question}
                    onClick={() =>
                      handleSend(question)
                    }
                  >
                    <span>
                      {question}
                    </span>

                    <span>›</span>
                  </button>
                )
              )}

            </div>

          </div>

          <div className="right-card">

            <h3>
              📚 {t.popular}
            </h3>

            <div className="popular-list">

              {popularSchemes.map(
                ([icon, name, query]) => (
                  <button
                    key={query}
                    onClick={() =>
                      handleSend(query)
                    }
                  >

                    <span className="scheme-icon">
                      {icon}
                    </span>

                    <span>
                      {name}
                    </span>

                    <span>›</span>

                  </button>
                )
              )}

            </div>

          </div>

        </aside>

      </main>

      <footer>
        <span>
          Government Information Assistance
        </span>

        <span>•</span>

        <span>
          Multilingual • Voice Enabled
        </span>
      </footer>

      {/* =========================
          FIRST OPEN POPUP
      ========================= */}

      {accountView && (
        <div className="account-overlay">
          <div className="account-modal">

            <button
              className="account-modal-close"
              onClick={() => setAccountView(null)}
            >
              ×
            </button>

            {accountView === "profile" && (
              <>
                <div className="account-modal-icon">👤</div>

                <h2>My Profile</h2>

                <div className="profile-details">
                  <div>
                    <span>Name</span>
                    <strong>{currentUser?.name}</strong>
                  </div>

                  <div>
                    <span>Email</span>
                    <strong>{currentUser?.email}</strong>
                  </div>
                </div>
              </>
            )}

            {accountView === "history" && (
              <>
                <div className="account-modal-icon">💬</div>

                <h2>Chat History</h2>

                {messages.length === 0 ? (
                  <p className="empty-account-data">
                    No conversations yet.
                  </p>
                ) : (
                  <div className="history-list">
                    {messages.map((msg, index) => (
                      <div
                        className={`history-item ${msg.type}`}
                        key={index}
                      >
                        <span>
                          {msg.type === "user" ? "👤 You" : "🤖 AI"}
                        </span>

                        <p>{msg.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {accountView === "saved" && (
              <>
                <div className="account-modal-icon">💾</div>

                <h2>Saved Data</h2>

                <div className="saved-data-box">
                  <div>
                    <span>Conversations</span>
                    <strong>{messages.length}</strong>
                  </div>

                  <div>
                    <span>Language</span>
                    <strong>{language}</strong>
                  </div>

                  <div>
                    <span>Account</span>
                    <strong>{currentUser?.name}</strong>
                  </div>
                </div>
              </>
            )}

          </div>
        </div>
      )}

      {authPopup && (
        <div className="auth-overlay">

          <div className="auth-modal">

            <button
              className="auth-close"
              onClick={closeAuthPopup}
            >
              ×
            </button>

            {authMode === "welcome" && (
              <>

                <div className="auth-logo">
                  🌱
                </div>

                <h2>
                  {t.welcomeAccount}
                </h2>

                <p className="auth-description">
                  {t.accountDescription}
                </p>

                <div className="auth-buttons">

                  <button
                    className="auth-primary"
                    onClick={() =>
                      setAuthMode(
                        "signin"
                      )
                    }
                  >
                    🔐 {t.signIn}
                  </button>

                  <button
                    className="auth-secondary"
                    onClick={() =>
                      setAuthMode(
                        "signup"
                      )
                    }
                  >
                    📝 {t.signUp}
                  </button>

                  <div className="auth-or">
                    <span></span>
                    OR
                    <span></span>
                  </div>

                  <button
                    className="guest-button"
                    onClick={
                      continueAsGuest
                    }
                  >
                    👤 {t.guest}
                  </button>

                </div>

                <div className="save-note">
                  💾 {t.saveData}
                </div>

              </>
            )}

            {authMode === "signup" && (
              <form
                onSubmit={handleSignUp}
              >

                <div className="auth-logo">
                  📝
                </div>

                <h2>{t.signUp}</h2>

                <p className="auth-description">
                  {t.saveData}
                </p>

                <label>
                  {t.name}
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder={t.name}
                />

                <label>
                  {t.email}
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder={t.email}
                />

                <label>
                  {t.password}
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                  placeholder={t.password}
                />

                <label>
                  {t.confirmPassword}
                </label>

                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }
                  placeholder={
                    t.confirmPassword
                  }
                />

                {authMessage && (
                  <div className="auth-message">
                    {authMessage}
                  </div>
                )}

                <button
                  type="submit"
                  className="auth-primary"
                >
                  {t.createAccount}
                </button>

                <div className="auth-switch">
                  {t.alreadyAccount}{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode(
                        "signin"
                      );
                      setAuthMessage("");
                    }}
                  >
                    {t.signIn}
                  </button>
                </div>

                <button
                  type="button"
                  className="back-button"
                  onClick={() => {
                    setAuthMode(
                      "welcome"
                    );
                    setAuthMessage("");
                  }}
                >
                  ← {t.back}
                </button>

              </form>
            )}

            {authMode === "signin" && (
              <form
                onSubmit={handleSignIn}
              >

                <div className="auth-logo">
                  🔐
                </div>

                <h2>{t.signIn}</h2>

                <p className="auth-description">
                  {t.saveData}
                </p>

                <label>
                  {t.email}
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder={t.email}
                />

                <label>
                  {t.password}
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                  placeholder={t.password}
                />

                {authMessage && (
                  <div className="auth-message">
                    {authMessage}
                  </div>
                )}

                <button
                  type="submit"
                  className="auth-primary"
                >
                  {t.signIn}
                </button>

                <div className="auth-switch">
                  {t.noAccount}{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode(
                        "signup"
                      );
                      setAuthMessage("");
                    }}
                  >
                    {t.signUp}
                  </button>
                </div>

                <button
                  type="button"
                  className="back-button"
                  onClick={() => {
                    setAuthMode(
                      "welcome"
                    );
                    setAuthMessage("");
                  }}
                >
                  ← {t.back}
                </button>

              </form>
            )}

          </div>

        </div>
      )}

    </div>
  );
}

export default App;