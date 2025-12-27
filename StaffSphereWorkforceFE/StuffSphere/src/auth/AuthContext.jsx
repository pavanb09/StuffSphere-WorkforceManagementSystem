import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const employeeId = localStorage.getItem("employeeId");

    return token ? { token, role, employeeId } : null;
  });

  const login = ({ token, role, employeeId }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("employeeId", employeeId);
    setAuth({ token, role, employeeId });
  };

  const logout = () => {
    localStorage.clear();
    setAuth(null);
    navigate("/"); // 🔁 landing page
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
