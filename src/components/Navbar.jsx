import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="nav">
      <div className="nav__brand">
        
        <span>My Portfolio</span>
      </div>

      <nav className="nav__links">
        <NavLink to="/about" className={({ isActive }) => `navBtn ${isActive ? "active" : ""}`}>
          About
        </NavLink>
        <NavLink to="/projects" className={({ isActive }) => `navBtn ${isActive ? "active" : ""}`}>
          Projects
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => `navBtn ${isActive ? "active" : ""}`}>
          Contact
        </NavLink>
        <NavLink to="/ai" className={({ isActive }) => `navBtn ${isActive ? "active" : ""}`}>
          AI
        </NavLink>
      </nav>
    </header>
  );
}