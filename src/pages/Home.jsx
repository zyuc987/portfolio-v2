import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 60);
    return () => clearTimeout(t);
  }, []);

  const enterSite = () => {
    if (leaving) return;
    setLeaving(true);
    // 等动画结束再跳转
    setTimeout(() => navigate("/about"), 480);
  };

  return (
    <div className="welcome">
      <div
        className={[
          "welcome__panel",
          show ? "is-visible" : "",
          leaving ? "is-leaving" : "",
        ].join(" ")}
      >
        <div className="welcome__avatarWrap">
          <div className="welcome__avatar">
            <img src="/tx.jpg" alt="avatar" />
          </div>
        </div>

        <h1 className="welcome__name">Yuchen Zhou</h1>

        <p className="welcome__line">Kean University of mathematics</p>


        <div className="welcome__divider" />

        <p className="welcome__text">Welcome to my personal website!</p>
        <p className="welcome__text welcome__line--muted">
          If you want to know more about me, please click
        </p>

        <button className="welcome__enterBtn" onClick={enterSite}>
          Enter
        </button>
      </div>
    </div>
  );
}