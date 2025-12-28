import { Link, useLocation } from "react-router-dom";
import LandingNavbar from "./LandingNavbar";
import "./Landing.css";
import { useEffect } from "react";

const Landing = () => {

  const location = useLocation();

  useEffect(()=>{
    if(location.hash){
      const el = document.querySelector(location.hash);
      if(el){
        el.scrollIntoView({behavior:"smooth"});
      }
    }
  },[location]);

  return (
    <>
      <LandingNavbar />

      <section className="hero" id = "home">
        <div className="hero-container">
          <div className="hero-text">
            <h1>
              Modern Workforce
              <span>Management Platform</span>
            </h1>

            <p>
              StaffSphere helps organizations manage employees, attendance,
              and HR workflows with enterprise-grade security.
            </p>

            <div className="hero-actions">
              <Link to="/login" className="btn btn-primary btn-lg">
                Start
              </Link>
              <Link to="/login" className="btn btn-outline btn-lg">
                Sign In
              </Link>
            </div>
          </div>

          <div className="hero-visual">
  <div className="dashboard-mock landing-preview">
    <h4 className="preview-title">One Platform. Total Control.</h4>

    <div className="preview-list">
      <div className="preview-item">
        <span>👥</span>
        <div>
          <strong>Employee Management</strong>
          <p>Create, manage, and organize workforce data.</p>
        </div>
      </div>

      <div className="preview-item">
        <span>⏱️</span>
        <div>
          <strong>Attendance & Leaves</strong>
          <p>Track attendance and approve leaves seamlessly.</p>
        </div>
      </div>

      <div className="preview-item">
        <span>🔐</span>
        <div>
          <strong>Role-Based Security</strong>
          <p>HR and Employee access clearly separated.</p>
        </div>
      </div>
    </div>
  </div>
</div>

        </div>
      </section>


      <section className="features" id = "features">
        <h2>Everything You Need</h2>

        <div className="feature-grid">
          <div className="feature-card">
            <span>⏱️</span>
            <h4>Attendance Tracking</h4>
            <p>Real-time check-in and check-out monitoring.</p>
          </div>

          <div className="feature-card">
            <span>📅</span>
            <h4>Leave Management</h4>
            <p>Apply, approve, and track leaves easily.</p>
          </div>

          <div className="feature-card">
            <span>🔐</span>
            <h4>Role-Based Access</h4>
            <p>Secure HR and Employee separation.</p>
          </div>
        </div>
      </section>


      <section className="cta">
        <h2>Start managing smarter today</h2>
        <p>Simple • Secure • Scalable</p>

        <Link to="/login" className="btn btn-primary btn-lg">
          Go to Login
        </Link>
      </section>
    </>
  );
};

export default Landing;
