export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { message } = req.body || {};
    if (!message) return res.status(400).json({ error: "Missing message" });

    const SYSTEM = `
You are Yuchen Zhou’s personal portfolio assistant.
Answer questions about Yuchen’s background, skills, projects, and contact information.
Rules:
- Use ONLY the PROFILE context below.
- If the PROFILE does not contain the answer, say: "I’m not sure based on the info I have yet."
Style:
- Friendly, concise, professional.
- Use bullet points for lists.
`;

    const PROFILE = `
Name: Yuchen Zhou
University: Kean University
Major: Mathematics / CS

Interests: data analysis, modeling, machine learning, time-series forecasting, data visualization.
Front-end: React + Vite portfolio website deployed on Vercel.

Projects:
1) AI Library & Console Tester (Completed): C#/.NET library using official OpenAI .NET SDK + console tester. Text generation, vision, embeddings (cosine similarity), agent-style workflow.
2) Unit Testing with xUnit (Completed): .NET class library + xUnit tests (Arrange–Act–Assert), dotnet test, debugging with failing tests.
3) Research Project (In Progress): cognitive research / agent concepts / data logging.

Contact:
Email: zhoouyuch@kean.edu
GitHub: https://github.com/zyuc987
LinkedIn: https://www.linkedin.com/in/yuchen-zhou-b0a928385/
`;

    const r = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: [
          { role: "system", content: SYSTEM },
          { role: "user", content: `PROFILE:\n${PROFILE}\n\nQUESTION:\n${message}` },
        ],
      }),
    });

    const data = await r.json();

    if (!r.ok) {
      return res.status(r.status).json({
        error: data?.error?.message || "OpenAI request failed",
      });
    }

    // ✅ 取文本：优先 output_text，不行就从 output[].content[] 拼出来
    let text = data.output_text;

    if (!text && Array.isArray(data.output)) {
      const chunks = [];
      for (const item of data.output) {
        if (item?.type === "message" && Array.isArray(item.content)) {
          for (const c of item.content) {
            if (c?.type === "output_text" && typeof c.text === "string") chunks.push(c.text);
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