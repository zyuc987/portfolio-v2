import { useEffect, useRef, useState } from "react";

export default function AIFloatingWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hi! I’m Yuchen’s assistant 🙂 Ask me anything." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const listRef = useRef(null);

  const suggested = [
    "Summarize Yuchen in 3 bullets.",
    "What projects has Yuchen built?",
    "What are Yuchen’s strongest skills?",
    "How can I contact Yuchen?",
  ];

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, loading, open]);

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

  const clearChat = () => {
    setMessages([{ role: "ai", text: "Chat cleared. Ask me anything 🙂" }]);
  };

  return (
    <>
      {/* Floating button */}
      <button
        className="aiFloatBtn"
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Open AI assistant"
      >
        {open ? "×" : "AI"}
      </button>

      {/* Panel */}
      {open && (
        <div className="aiFloatPanel">
          <div className="aiFloatHeader">
            <div>
              <div className="aiFloatTitle">AI Assistant</div>
              <div className="aiFloatSub">Ask about Yuchen & the portfolio</div>
            </div>
            <button className="aiFloatClear" type="button" onClick={clearChat} disabled={loading}>
              Clear
            </button>
          </div>

          <div className="aiFloatSuggestRow">
            {suggested.map((q) => (
              <button
                key={q}
                type="button"
                className="aiFloatSuggestBtn"
                onClick={() => sendMessage(q)}
                disabled={loading}
                title="Click to ask"
              >
                {q}
              </button>
            ))}
          </div>

          <div className="aiFloatChat" ref={listRef}>
            {messages.map((m, idx) => (
              <div key={idx} className={`aiFloatBubble ${m.role}`}>
                {m.text}
              </div>
            ))}
            {loading && <div className="aiFloatBubble ai">Thinking…</div>}
          </div>

          <div className="aiFloatInputRow">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something..."
              onKeyDown={(e) => (e.key === "Enter" ? sendMessage(input) : null)}
              disabled={loading}
            />
            <button type="button" onClick={() => sendMessage(input)} disabled={loading}>
              {loading ? "..." : "Send"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}