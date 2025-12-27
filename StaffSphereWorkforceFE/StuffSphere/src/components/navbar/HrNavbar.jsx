import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Image
} from "react-bootstrap";
import {
  FiHome,
  FiUsers,
  FiPlusCircle,
  FiCalendar,
  FiClock,
  FiLayers,
  FiLock,
  FiLogOut
} from "react-icons/fi";

import { useAuth } from "../../auth/AuthContext";
import profileService from "../../services/profileService";
import ChangePasswordModal from "../employee/ChangePasswordModal";

const BASE_URL = "http://localhost:8080";

const HrNavbar = () => {
  const { logout } = useAuth();
  const location = useLocation();

  const [profile, setProfile] = useState(null);
  const [showChangePassword, setShowChangePassword] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await profileService.getMyProfile();
      setProfile(res.data);
    } catch {
      console.error("Failed to load HR profile");
    }
  };

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <Navbar
        expand="lg"
        sticky="top"
        className="shadow-sm"
        style={{
          backdropFilter: "blur(14px)",
          background: "rgba(255,255,255,0.9)",
          borderBottom: "1px solid rgba(0,0,0,0.05)"
        }}
      >
        <Container fluid className="px-4">
          {/* BRAND */}
          <Navbar.Brand
            as={Link}
            to="/hr/dashboard"
            style={{
              fontWeight: 800,
              fontSize: "20px",
              background: "linear-gradient(90deg, #c08457, #67e8f9)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            StaffSphere
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="hr-navbar" />

          <Navbar.Collapse id="hr-navbar">
            {/* LEFT NAV */}
            <Nav className="me-auto gap-lg-2 mt-3 mt-lg-0">
              <Nav.Link as={Link} to="/hr/dashboard" active={isActive("/hr/dashboard")}>
                <FiHome className="me-1" /> Dashboard
              </Nav.Link>

              <Nav.Link as={Link} to="/hr/employees" active={isActive("/hr/employees")}>
                <FiUsers className="me-1" /> Employees
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="/hr/employees/add"
                active={isActive("/hr/employees/add")}
              >
                <FiPlusCircle className="me-1" /> Add Employee
              </Nav.Link>

              <Nav.Link as={Link} to="/hr/leaves" active={isActive("/hr/leaves")}>
                <FiCalendar className="me-1" /> Leaves
              </Nav.Link>

              <Nav.Link as={Link} to="/hr/attendance" active={isActive("/hr/attendance")}>
                <FiClock className="me-1" /> Attendance
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="/hr/departments"
                active={isActive("/hr/departments")}
              >
                <FiLayers className="me-1" /> Departments
              </Nav.Link>
            </Nav>

            {/* RIGHT PROFILE ZONE */}
            <Nav className="ms-auto align-items-center">
              <NavDropdown
                align="end"
                title={
                  <div className="d-flex align-items-center gap-2">
                    {/* ✅ Show image only if exists */}
                    {profile?.profileImage && (
                      <Image
                        src={`${BASE_URL}/${profile.profileImage}`}
                        roundedCircle
                        width={36}
                        height={36}
                        style={{
                          border: "1px solid #e5e7eb",
                          objectFit: "cover"
                        }}
                      />
                    )}

                    <span className="fw-medium">
                      {profile?.fullName || "HR"}
                    </span>
                  </div>
                }
              >
                <NavDropdown.Item onClick={() => setShowChangePassword(true)}>
                  <FiLock className="me-2" />
                  Change Password
                </NavDropdown.Item>

                <NavDropdown.Divider />

                <NavDropdown.Item className="text-danger" onClick={logout}>
                  <FiLogOut className="me-2" />
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* ================= CHANGE PASSWORD MODAL ================= */}
      <ChangePasswordModal
        show={showChangePassword}
        onHide={() => setShowChangePassword(false)}
      />
    </>
  );
};

export default HrNavbar;
