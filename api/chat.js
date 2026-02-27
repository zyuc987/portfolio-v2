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
        details: data,
      });
    }

    // ✅ 这里我们把 output_text 和一小段 output 也返回，方便你看到到底有没有内容
    return res.status(200).json({
      text: data.output_text ?? "",
      debug_has_output_text: Boolean(data.output_text),
      debug_output_preview: Array.isArray(data.output) ? data.output.slice(0, 1) : data.output,
    });
  } catch (e) {
    return res.status(500).json({ error: e?.message || "Server error" });
  }
}