export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { message } = req.body || {};
    if (!message) return res.status(400).json({ error: "Missing message" });

    const r = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: message,
      }),
    });

    const data = await r.json();

    if (!r.ok) {
      return res.status(r.status).json({
        error: data?.error?.message || "OpenAI request failed",
      });
    }

    // ✅ 正确取文本：优先 output_text，不行就从 output[].content[] 拼出来
    let text = data.output_text;

    if (!text && Array.isArray(data.output)) {
      const chunks = [];
      for (const item of data.output) {
        if (item?.type === "message" && Array.isArray(item.content)) {
          for (const c of item.content) {
            if (c?.type === "output_text" && typeof c.text === "string") {
              chunks.push(c.text);
            }
          }
        }
      }
      text = chunks.join("\n").trim();
    }

    return res.status(200).json({ text: text || "" });
  } catch (e) {
    return res.status(500).json({ error: e?.message || "Server error" });
  }
}