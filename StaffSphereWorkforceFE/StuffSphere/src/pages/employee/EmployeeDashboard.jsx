import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import {
  FiClock,
  FiCalendar,
  FiUser,
  FiLogIn
} from "react-icons/fi";

import attendanceService from "../../services/attendanceService";
import leaveService from "../../services/leaveService";
import "../../pages/hr/hr.css"; // reuse same premium styling

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const [attendance, setAttendance] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const a = await attendanceService.getMyAttendance();
      const l = await leaveService.getMyLeaves();
      setAttendance(a.data);
      setLeaves(l.data);
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];
  const todayAttendance = attendance.find(a => a.date === today);
  const pendingLeaves = leaves.filter(l => l.status === "PENDING");

  const approvedLeaves = leaves.filter(l => l.status === "APPROVED");
const rejectedLeaves = leaves.filter(l => l.status === "REJECTED");


  return (
    <Container fluid className="hr-page">
      {/* HEADER */}
      <div className="hr-header mb-4">
        <h2 className="fw-bold">Employee Dashboard</h2>
        <p className="text-muted">
          Overview of your attendance, leaves, and profile
        </p>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <Spinner />
        </div>
      ) : (
        <>
          {/* KPI STATS */}
          <Row className="g-4 mb-4">
  <Col md={8}>
    <Card className="hr-card">
      <Card.Body>
        <h5 className="fw-semibold mb-3">Today’s Activity</h5>

        {todayAttendance ? (
          <>
            <p className="mb-1">
              <strong>Status:</strong>{" "}
              <span className="text-success">Checked In</span>
            </p>

            <p className="mb-1">
              <strong>Total Hours:</strong>{" "}
              {todayAttendance.totalHours ?? 0}
            </p>

            <p className="mb-0 text-muted">
              Sessions: {todayAttendance.sessions?.length ?? 0}
            </p>
          </>
        ) : (
          <p className="text-warning mb-0">
            No attendance recorded for today.
          </p>
        )}
      </Card.Body>
    </Card>
  </Col>

  <Col md={4}>
    <Card className="hr-card">
      <Card.Body>
        <h6 className="text-muted">Quick Tip</h6>
        <p className="mb-0">
          Always check out at the end of your workday to ensure
          accurate attendance records.
        </p>
      </Card.Body>
    </Card>
  </Col>
</Row>

<Row className="g-4 mb-4">
  <Col md={6}>
    <Card className="hr-card">
      <Card.Body>
        <h5 className="fw-semibold mb-3">Leave Overview</h5>

        <div className="d-flex justify-content-between">
          <span>Pending</span>
          <strong>{pendingLeaves.length}</strong>
        </div>

        <div className="d-flex justify-content-between">
          <span>Approved</span>
          <strong className="text-success">
            {approvedLeaves.length}
          </strong>
        </div>

        <div className="d-flex justify-content-between">
          <span>Rejected</span>
          <strong className="text-danger">
            {rejectedLeaves.length}
          </strong>
        </div>
      </Card.Body>
    </Card>
  </Col>

  <Col md={6}>
    <Card className="hr-card">
      <Card.Body>
        <h5 className="fw-semibold mb-3">Last Leave Request</h5>

        {leaves.length > 0 ? (
          <>
            <p className="mb-1">
              <strong>Type:</strong> {leaves[0].leaveType}
            </p>
            <p className="mb-1">
              <strong>Status:</strong>{" "}
              <span className={
                leaves[0].status === "APPROVED"
                  ? "text-success"
                  : leaves[0].status === "REJECTED"
                  ? "text-danger"
                  : "text-warning"
              }>
                {leaves[0].status}
              </span>
            </p>
            <p className="text-muted mb-0">
              {leaves[0].startDate} → {leaves[0].endDate}
            </p>
          </>
        ) : (
          <p className="text-muted mb-0">
            No leave requests submitted yet.
          </p>
        )}
      </Card.Body>
    </Card>
  </Col>
</Row>



          {/* ACTION CARDS */}
          <Row className="g-4">
            <Col md={3} sm={6}>
              <ActionCard
                title="Attendance"
                description="Check-in, check-out & history"
                icon={<FiClock />}
                onClick={() => navigate("/employee/attendance")}
              />
            </Col>

            <Col md={3} sm={6}>
              <ActionCard
                title="My Profile"
                description="Update personal information"
                icon={<FiUser />}
                onClick={() => navigate("/employee/profile")}
              />
            </Col>

            <Col md={3} sm={6}>
              <ActionCard
                title="Apply Leave"
                description="Request new leave"
                icon={<FiCalendar />}
                onClick={() => navigate("/employee/apply-leave")}
              />
            </Col>

            <Col md={3} sm={6}>
              <ActionCard
                title="My Leaves"
                description="Track leave status"
                icon={<FiCalendar />}
                onClick={() => navigate("/employee/my-leaves")}
              />
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

/* Reusable Action Card */
const ActionCard = ({ title, description, icon, onClick }) => (
  <Card
    className="hr-card h-100"
    onClick={onClick}
    style={{
      cursor: "pointer",
      transition: "transform 0.2s ease, box-shadow 0.2s ease"
    }}
    onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
    onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
  >
    <Card.Body>
      <div className="mb-3 text-primary" style={{ fontSize: "24px" }}>
        {icon}
      </div>
      <h5 className="fw-semibold">{title}</h5>
      <p className="text-muted mb-0">{description}</p>
    </Card.Body>
  </Card>
);


export default EmployeeDashboard;
