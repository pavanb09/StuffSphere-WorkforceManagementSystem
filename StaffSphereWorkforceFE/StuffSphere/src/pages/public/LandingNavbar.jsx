import { Link } from "react-router-dom";
import { useState } from "react";
import "./Landing.css";

const LandingNavbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="nav-container">
  {/* LEFT */}
  <Link to="/" className="nav-logo">
    <img src="/stuffspherelogo.png" alt="StaffSphere logo" className="nav-logo-img" />
    <span className="logo-text">StaffSphere</span>
  </Link>

  {/* RIGHT (DESKTOP) */}
  <nav className="nav-actions desktop-only">
  <Link to="/#home" className="btn btn-ghost">Home</Link>
  <Link to="/#features" className="btn btn-ghost">Features</Link>
  <Link to="/#contact" className="btn btn-ghost">Contact</Link>
  <Link to="/login" className="btn btn-primary">Get Started</Link>
</nav>

  {/* RIGHT (MOBILE) */}
  <button
          className={`hamburger ${open ? "open" : ""}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
</div>
<div className={`mobile-menu ${open ? "show" : ""}`}>
          <Link to="/#home" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/#features" onClick={() => setOpen(false)}>Features</Link>
          <Link to="/#contact" onClick={() => setOpen(false)}>Contact</Link>
      </div>

    </header>
  );
};

export default LandingNavbar;
