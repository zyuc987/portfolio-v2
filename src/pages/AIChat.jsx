import { useEffect, useRef, useState } from "react";

export default function AIChat() {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hi! I’m Yuchen Zhou’s portfolio assistant. Ask me anything 🙂" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const listRef = useRef(null);

  const suggested = [
    "What projects have you built? Give me a quick overview.",
    "What are your strongest technical skills?",
    "Summarize your background in 3 bullet points.",
    "Which project best demonstrates AI/ML skills and why?",
    "How can I contact you? Provide links and email.",
    "What technologies did you use to build this portfolio website?",
  ];

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, loading]);

  const sendMessage = async (text) => {
    const clean = (text || "").trim();
    if (!clean || loading) return;

    setMessages((prev) => [...prev, { role: "user", text: clean }]);
    setInput("");
    setLoading(true);

    try {
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: clean }),
      });

      const raw = await r.text();
      let data;
      try {
        data = JSON.parse(raw);
      } catch {
        data = { error: raw || "Non-JSON response" };
      }

      if (!r.ok) throw new Error(data?.error || `Request failed (${r.status})`);

      const botText = (data.text ?? data.reply ?? "").trim() || "⚠️ No text returned from AI.";
      setMessages((prev) => [...prev, { role: "ai", text: botText }]);
    } catch (e) {
      setMessages((prev) => [...prev, { role: "ai", text: `⚠️ Error: ${e.message}` }]);
    } finally {
      setLoading(false);
    }
  };

  const send = async () => {
    await sendMessage(input);
  };

  const ask = async (q) => {
    await sendMessage(q);
  };

  const clearChat = () => {
    setMessages([{ role: "ai", text: "Chat cleared. Ask me anything 🙂" }]);
  };

  return (
    <div className="page">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <h2 style={{ margin: 0 }}>AI Assistant</h2>
        <button onClick={clearChat} className="chipBtn" type="button">
          Clear
        </button>
      </div>

      {/* ✅ Suggested Questions */}
      <div className="suggestRow" style={{ marginTop: 10 }}>
        {suggested.map((q) => (
          <button
            key={q}
            className="suggestBtn"
            type="button"
            onClick={() => ask(q)}
            disabled={loading}
            title="Click to ask"
          >
            {q}
          </button>
        ))}
      </div>

      <div className="chatBox" ref={listRef} style={{ marginTop: 12 }}>
        {messages.map((m, idx) => (
          <div key={idx} className={`bubble ${m.role}`}>
            {m.text}
          </div>
        ))}

        {loading && <div className="bubble ai">Thinking…</div>}
      </div>

      <div className="chatInput">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
          onKeyDown={(e) => (e.key === "Enter" ? send() : null)}
        />
        <button onClick={send} disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>
      </div>

      <p className="muted" style={{ marginTop: 10 }}>
        *This AI chat calls your backend endpoint <b>/api/chat</b>. Your API key stays on the server.
      </p>
    </div>
  );
}