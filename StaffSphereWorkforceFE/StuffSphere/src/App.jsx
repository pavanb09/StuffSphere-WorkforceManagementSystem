import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Public
const Landing = lazy(() => import("./pages/public/Landing"));
const Login = lazy(() => import("./pages/auth/Login"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/auth/ResetPassword"));

// Layouts
const EmployeeLayout = lazy(() => import("./layout/EmployeeLayout"));
const HrLayout = lazy(() => import("./layout/HrLayout"));

// Employee Pages
const EmployeeDashboard = lazy(() =>
  import("./pages/employee/EmployeeDashboard")
);
const Attendance = lazy(() => import("./pages/employee/Attendance"));
const EmployeeProfile = lazy(() =>
  import("./pages/employee/EmployeeProfile")
);
const ApplyLeave = lazy(() => import("./pages/employee/ApplyLeave"));
const MyLeaves = lazy(() => import("./pages/employee/MyLeaves"));

// HR Pages
const HrDashboard = lazy(() => import("./pages/hr/HrDashboard"));
const LeaveRequests = lazy(() => import("./pages/hr/LeaveRequests"));
const AttendanceView = lazy(() => import("./pages/hr/AttendanceView"));
const Employees = lazy(() => import("./pages/hr/Employees"));
const AddEmployee = lazy(() => import("./pages/hr/AddEmployee"));
const Departments = lazy(() => import("./pages/hr/Departments"));

// Auth / Common
const ProtectedRoute = lazy(() => import("./auth/ProtectedRoute"));
const Footer = lazy(() => import("./components/Footer"));

/* =======================
   Loader Component
======================= */
const Loader = () => (
  <div className="d-flex justify-content-center align-items-center mt-5">
    <div className="spinner-border text-primary" role="status" />
  </div>
);

const App = () => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Employee Routes */}
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

          {/* HR Routes */}
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
      </Suspense>

      {/* Global Components */}
      <ToastContainer position="top-right" autoClose={2500} />
      <Footer />
    </>
  );
};

export default App;
