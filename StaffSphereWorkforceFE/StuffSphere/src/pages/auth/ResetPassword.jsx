import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import authService from "../../services/authService";
import "./login.css";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!otp || !newPassword || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await authService.resetPassword({
        email,
        otp,
        newPassword
      });

      toast.success("Password reset successful");

      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* LEFT */}
      <div className="login-visual">
        <h1>StaffSphere</h1>
        <p>Set a strong new password to secure your account.</p>
      </div>

      {/* RIGHT */}
      <div className="login-form-container">
        <div className="login-card">
          <Link to="/" className="back-home">← Back to Home</Link>

          <h2>Reset Password</h2>
          <p className="sub-text">
            Enter OTP and your new password.
          </p>

          <input
            placeholder="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button onClick={handleReset} disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </button>

          <div className="login-links">
            <Link to="/login">Back to Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
