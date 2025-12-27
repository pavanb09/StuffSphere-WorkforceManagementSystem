import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import authService from "../../services/authService";
import { useAuth } from "../../auth/AuthContext";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    if (!email || !password) {
      toast.error("Please enter email and password");
      return false;
    }
    if (!email.includes("@")) {
      toast.error("Enter a valid email address");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      const res = await authService.login({ email, password });

      login({
        token: res.data.token,
        role: res.data.role,
        employeeId: res.data.employeeId
      });

      toast.success(`Welcome back! Logged in as ${res.data.role}`);

      setTimeout(() => {
        if (res.data.role === "HR") {
          navigate("/hr/dashboard");
        } else {
          navigate("/employee/dashboard");
        }
      }, 1200);

    } catch (err) {
      toast.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* LEFT – VISUAL (DESKTOP ONLY) */}
      <div className="login-visual">
        <h1>StaffSphere</h1>
        <p>
          Secure workforce management for modern organizations.
        </p>
      </div>

      {/* RIGHT – FORM */}
      <div className="login-form-container">
        <div className="login-card">

  {/* Back to Home */}
  <Link to="/" className="back-home">
    ← Back to Home
  </Link>

  <div className="login-brand">
    <img src="/stuffspherelogo.png" alt="StaffSphere" />
    <span>StaffSphere</span>
  </div>

  <h2>Sign in</h2>
  <p className="sub-text">Access your workforce dashboard</p>


          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <button onClick={handleLogin} disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </button>

          <div className="login-links">
            <Link to="/forgot-password">Forgot password?</Link>
          </div>
        </div>
      </div>
      </div>
  );
};

export default Login;
