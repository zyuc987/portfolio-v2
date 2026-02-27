export default function Projects() {
  const projects = [
    {
      title: "AI Library & Console Tester",
      status: "Completed",
      desc:
        "Built a C#/.NET AI class library using the official OpenAI .NET SDK, then created a console tester to validate text generation, vision, embeddings (export + cosine similarity), and an assistant-style agent workflow.",
      tags: ["C#", ".NET", "OpenAI SDK", "Vision", "Embeddings", "Agent"],
      githubUrl: "https://github.com/zyuc987/CPS3330-Lab2", // ← 换成你的真实链接
    },
    {
      title: "Unit Testing with xUnit",
      status: "Completed",
      desc:
        "Created a .NET class library and an xUnit test project in VS Code, wrote Arrange-Act-Assert tests, ran dotnet test, and intentionally modified code to produce failing tests for debugging practice.",
      tags: ["C#", ".NET", "xUnit", "Unit Testing", "VS Code"],
      githubUrl: "https://github.com/zyuc987/CPS_TECH_4981_Lab3", // ← 换成你的真实链接
    },
    {
      title: "Autonomous Game-Based Cognitive Research Platform",
      status: "In Progress",
      desc:
        "Ongoing research project: designing a dementia-friendly, game-based cognitive engagement and screening module guided by an intelligent agent, with ethical logging of behavioral signals for analysis.",
      tags: ["Research", "Cognitive Health", "Game Module", "Agent", "Data Logging"],
      githubUrl: "", // 还没 push 就留空
    },
  ];

  const openLink = (url) => {
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="page projectsPage">
      <h2>Projects</h2>

      <div className="projectsGrid">
        {projects.map((p) => {
          const disabled = !p.githubUrl || p.status === "In Progress";

          return (
            <div className="card projectCard" key={p.title}>
              <div className="projectTop">
                <h3 style={{ margin: 0 }}>{p.title}</h3>
                <span className="badge">{p.status}</span>
              </div>

              <p className="muted" style={{ marginTop: 10 }}>
                {p.desc}
              </p>

              <div className="tagRow" style={{ marginTop: 12 }}>
                {p.tags.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>

              <div className="projectActions">
                <button
                  className="primaryBtn"
                  onClick={() => openLink(p.githubUrl)}
                  disabled={disabled}
                  title={disabled ? "Not available yet" : "Open GitHub"}
                >
                  {disabled ? "In Progress" : "GitHub"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}