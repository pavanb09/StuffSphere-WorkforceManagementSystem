import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

import "../../pages/hr/hr.css";

import ProfileSummaryCard from "../../components/employee/ProfileSummaryCard";
import ProfileInfoCard from "../../components/employee/ProfileInfoCard";
import ProfileImageCard from "../../components/employee/ProfileImageCard";
import ChangePasswordModal from "../../components/employee/ChangePasswordModal";
import ProfileSecurityCard from "../../components/employee/ProfileSecurityCard";

const EmployeeProfile = () => {
  const [showChangePassword, setShowChangePassword] = useState(false);

  return (
    <Container fluid className="hr-page">
      {/* HEADER */}
      <div className="hr-header mb-4">
        <h2 className="fw-bold">My Profile</h2>
        <p className="text-muted">
          Manage your personal information and account security
        </p>
      </div>

      {/* PROFILE SUMMARY + INFO */}
      <Row className="g-4 mb-4">
        <Col lg={4}>
          <ProfileSummaryCard />
        </Col>

        <Col lg={8}>
          <ProfileInfoCard />
        </Col>
      </Row>

      {/* IMAGE + SECURITY */}
      <Row className="g-4">
        <Col lg={6}>
          <ProfileImageCard />
        </Col>

        <Col lg={6}>
          <ProfileSecurityCard
            onChangePassword={() => setShowChangePassword(true)}
          />
        </Col>
      </Row>

      {/* CHANGE PASSWORD MODAL */}
      <ChangePasswordModal
        show={showChangePassword}
        onHide={() => setShowChangePassword(false)}
      />
    </Container>
  );
};

export default EmployeeProfile;
