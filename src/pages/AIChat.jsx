import { useEffect, useRef, useState } from "react";

export default function AIChat() {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hi! I’m your portfolio assistant. Ask me anything 🙂" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setLoading(true);

    try {
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      // ✅ 更稳：先读文本，再尝试解析 JSON
      const raw = await r.text();
      let data;
      try {
        data = JSON.parse(raw);
      } catch {
        data = { error: raw || "Non-JSON response" };
      }

      if (!r.ok) {
        throw new Error(data?.error || `Request failed (${r.status})`);
      }

      const botText = data.text ?? data.reply ?? "(No reply)";
      setMessages((prev) => [...prev, { role: "ai", text: botText }]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: `⚠️ Error: ${e.message}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([{ role: "ai", text: "Chat cleared. Ask me anything 🙂" }]);
  };

  return (
    <div className="page">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <h2 style={{ margin: 0 }}>AI Assistant</h2>
        <button onClick={clearChat} className="chipBtn" type="button">
          Clear
        </button>
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