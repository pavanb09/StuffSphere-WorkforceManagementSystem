import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Landing from "./pages/public/Landing";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

import EmployeeLayout from "./layout/EmployeeLayout";
import HrLayout from "./layout/HrLayout";

import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import HrDashboard from "./pages/hr/HrDashboard";


import ProtectedRoute from "./auth/ProtectedRoute";
import Attendance from "./pages/employee/Attendance";
import EmployeeProfile from "./pages/employee/EmployeeProfile";
import ApplyLeave from "./pages/employee/ApplyLeave";
import MyLeaves from "./pages/employee/MyLeaves";
import LeaveRequests from "./pages/hr/LeaveRequests";
import AttendanceView from "./pages/hr/AttendanceView";
import Employees from "./pages/hr/Employees";
import AddEmployee from "./pages/hr/AddEmployee";
import Departments from "./pages/hr/Departments";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
    
    <Routes>
      
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route
        path="/employee"
        element={
          <ProtectedRoute allowedRoles={["EMPLOYEE"]}>
            <EmployeeLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<EmployeeDashboard />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="profile" element={<EmployeeProfile />} />
        <Route path="apply-leave" element={<ApplyLeave />} />
        <Route path="my-leaves" element={<MyLeaves />} />
      </Route>

      <Route
        path="/hr"
        element={
          <ProtectedRoute allowedRoles={["HR"]}>
            <HrLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<HrDashboard />} />
        <Route path="leaves" element={<LeaveRequests />} />
        <Route path="attendance" element={<AttendanceView />} />
        <Route path="employees" element={<Employees />} />
        <Route path="add" element={<AddEmployee />} />
        <Route path="departments" element={<Departments />} />

      </Route>
    </Routes>
        <ToastContainer position="top-right" autoClose={2500} />
    <Footer />

    </>

  
  );
};

export default App;
