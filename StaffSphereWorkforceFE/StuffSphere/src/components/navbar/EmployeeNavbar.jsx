import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown, Image } from "react-bootstrap";
import {
  FiHome,
  FiClock,
  FiCalendar,
  FiUser,
  FiLogOut
} from "react-icons/fi";

import { useAuth } from "../../auth/AuthContext";
import profileService from "../../services/profileService";


const EmployeeNavbar = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await profileService.getMyProfile();
      setProfile(res.data);
    } catch {
      console.error("Failed to load profile");
    }
  };

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <Navbar
      expand="lg"
      sticky="top"
      className="shadow-sm"
      style={{
        backdropFilter: "blur(12px)",
        background: "rgba(255, 255, 255, 0.9)",
        borderBottom: "1px solid rgba(0,0,0,0.05)"
      }}
    >
      <Container fluid className="px-4">
        {/* BRAND */}
        <Navbar.Brand
          as={Link}
          to="/employee/dashboard"
          style={{
            fontWeight: 700,
            fontSize: "20px",
            background: "linear-gradient(90deg, #c08457, #67e8f9)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          StaffSphere
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="employee-navbar" />

        <Navbar.Collapse id="employee-navbar">
          {/* NAV LINKS */}
          <Nav className="me-auto gap-lg-2 mt-3 mt-lg-0">
            <Nav.Link
              as={Link}
              to="/employee/dashboard"
              active={isActive("/employee/dashboard")}
            >
              <FiHome className="me-1" /> Dashboard
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/employee/attendance"
              active={isActive("/employee/attendance")}
            >
              <FiClock className="me-1" /> Attendance
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/employee/my-leaves"
              active={isActive("/employee/my-leaves")}
            >
              <FiCalendar className="me-1" /> My Leaves
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/employee/profile"
              active={isActive("/employee/profile")}
            >
              <FiUser className="me-1" /> Profile
            </Nav.Link>
          </Nav>

          {/* PROFILE DROPDOWN */}
          <Nav className="ms-auto align-items-center">
            <NavDropdown
              align="end"
              title={
                <div className="d-flex align-items-center gap-2">
                  {profile?.profileImage && (
                    <Image
                      src={`${profile.profileImage}`}
                      roundedCircle
                      width={34}
                      height={34}
                      style={{ border: "1px solid #ddd" }}
                    />
                  )}
                  <span className="fw-medium">
                    {profile?.fullName}
                  </span>
                </div>
              }
            >
              <NavDropdown.Item
                as={Link}
                to="/employee/profile"
              >
                <FiUser className="me-2" /> My Profile
              </NavDropdown.Item>

              <NavDropdown.Divider />

              <NavDropdown.Item
                onClick={logout}
                className="text-danger"
              >
                <FiLogOut className="me-2" /> Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default EmployeeNavbar;
