import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import AIChat from "./pages/AIChat";

export default function App() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/";

  return (
    <div className="siteBg">
      {!hideNavbar && <Navbar />}

      <div className="routeShell" key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/ai" element={<AIChat />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}