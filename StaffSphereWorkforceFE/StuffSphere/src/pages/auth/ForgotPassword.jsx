import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import authService from "../../services/authService";
import "./Login.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email) {
      toast.error("Email is required");
      return;
    }

    try {
      setLoading(true);
      await authService.forgotPassword(email);

      toast.success("OTP sent to your registered email");

      setTimeout(() => {
        navigate("/reset-password", { state: { email } });
      }, 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* LEFT */}
      <div className="login-visual">
        <h1>StaffSphere</h1>
        <p>Secure password recovery for your workforce account.</p>
      </div>

      {/* RIGHT */}
      <div className="login-form-container">
        <div className="login-card">
          <Link to="/" className="back-home">← Back to Home</Link>

          <div className="login-brand">
            <img src="/stuffspherelogo.png" alt="logo" />
            <span>StaffSphere</span>
          </div>

          <h2>Forgot Password</h2>
          <p className="sub-text">
            Enter your registered email to receive an OTP.
          </p>

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button onClick={handleSubmit} disabled={loading}>
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>

          <div className="login-links">
            <Link to="/login">Back to Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
