import { useState } from "react";

export default function Contact() {
  const email = "zhoouyuch@kean.edu";
  const githubUrl = "https://github.com/zyuc987";
  const linkedinUrl = "https://www.linkedin.com/in/yuchen-zhou-b0a928385/?locale=zh";

  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // 如果某些环境 clipboard 不可用，就至少让用户能发邮件
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <div className="page">
      <h2>Contact</h2>

      <div className="contactGrid">
        <div className="card">
          <h3>Email</h3>
          <p className="muted">{email}</p>
          <button className="primaryBtn" onClick={copyEmail}>
            {copied ? "Copied!" : "Copy Email"}
          </button>
        </div>

        <div className="card">
          <h3>GitHub</h3>
          <p className="muted">github.com/zyuc987</p>
          <a className="ghostBtn" href={githubUrl} target="_blank" rel="noreferrer">
            Open GitHub
          </a>
        </div>

        <div className="card">
          <h3>LinkedIn</h3>
          <p className="muted">linkedin.com/in/yuchen-zhou-b0a928385</p>
          <a className="ghostBtn" href={linkedinUrl} target="_blank" rel="noreferrer">
            Open LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}