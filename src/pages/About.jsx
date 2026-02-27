export default function About() {
  return (
    <div className="page">
      <h2>About Me</h2>

      <div className="aboutGrid">
        <div className="card aboutHero">
          <div className="avatar">
            <img src="/about-avatar.jpg" alt="avatar" />
          </div>
          <div>
            <h3 style={{ margin: "0 0 6px" }}>Yuchen Zhou</h3>
            <p className="muted" style={{ margin: 0 }}>
              Mathematics · Kean University
            </p>
            <p style={{ marginTop: 10 }}>
              I’m learning how to apply mathematical thinking to data analysis and modeling, and I’m building small
              projects with React and Python/R. I’m interested in machine learning, time-series forecasting, and data
              visualization.
            </p>
          </div>
        </div>

        <div className="card">
          <h3>Skills</h3>
          <div className="tagRow">
            <span className="tag">HTML/CSS</span>
            <span className="tag">JavaScript</span>
            <span className="tag">React</span>
            <span className="tag">Git</span>
            <span className="tag">SQL</span>
            <span className="tag">Data Viz</span>
          </div>
        </div>
      </div>
    </div>
  );
}