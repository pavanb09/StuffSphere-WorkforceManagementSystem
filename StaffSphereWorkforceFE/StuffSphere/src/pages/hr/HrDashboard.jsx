import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import {
  FiUsers,
  FiCalendar,
  FiLayers,
  FiUserPlus,
  FiClock
} from "react-icons/fi";

import hrService from "../../services/hrService";
import leaveService from "../../services/leaveService";
import axiosInstance from "../../api/axiosInstance";
import ActionCard from "../../components/cards/ActionCard";
import StatCard from "../../components/cards/StatCard";

const HrDashboard = () => {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const e = await hrService.getAllEmployees();
    const l = await leaveService.getAllLeaves();
    const d = await axiosInstance.get("/departments");

    setEmployees(e.data);
    setLeaves(l.data);
    setDepartments(d.data.data);
  };

  const pendingLeaves = leaves.filter(l => l.status === "PENDING");

  return (
    <Container fluid className="px-4 py-4">
      {/* HEADER */}
      <div className="hr-wrapper">
  <h2 className="hr-page-title">HR Dashboard</h2>
  <p className="hr-subtitle">Welcome to StaffSphere</p>
</div>


      {/* STATS ROW */}
      <Row className="g-4 mb-4">
        <Col md={4}>
          <StatCard
            title="Total Employees"
            value={employees.length}
            icon={<FiUsers />}
            onClick={() => navigate("/hr/employees")}
          />
        </Col>

        <Col md={4}>
          <StatCard
            title="Pending Leaves"
            value={pendingLeaves.length}
            icon={<FiCalendar />}
            onClick={() => navigate("/hr/leaves")}
          />
        </Col>

        <Col md={4}>
          <StatCard
            title="Departments"
            value={departments.length}
            icon={<FiLayers />}
            onClick={() => navigate("/hr/departments")}
          />
        </Col>
      </Row>

      {/* ACTION CARDS */}
     {/* RECENT ACTIVITY + QUICK INFO */}
<Row className="g-4 mt-4">
  {/* RECENT ACTIVITY */}
  <Col md={8}>
    <Card className="border-0 shadow-sm h-100">
      <Card.Body>
        <h5 className="fw-semibold mb-3">Recent Activity</h5>

        {pendingLeaves.length === 0 ? (
          <p className="text-muted mb-0">
            No pending leave requests at the moment.
          </p>
        ) : (
          pendingLeaves.slice(0, 5).map((leave, index) => (
            <div
              key={index}
              className="d-flex justify-content-between align-items-center py-2 border-bottom"
            >
              <div>
                <strong>{leave.employeeName}</strong>
                <div className="text-muted small">
                  Requested {leave.leaveType} leave
                </div>
              </div>
              <span className="badge bg-warning text-dark">
                Pending
              </span>
            </div>
          ))
        )}
      </Card.Body>
    </Card>
  </Col>

  {/* QUICK INSIGHTS */}
  <Col md={4}>
    <Card className="border-0 shadow-sm h-100">
      <Card.Body>
        <h5 className="fw-semibold mb-3">Quick Insights</h5>

        <ul className="list-unstyled mb-0">
          <li className="mb-2">
            👥 <strong>{employees.length}</strong> employees onboarded
          </li>
          <li className="mb-2">
            🏢 <strong>{departments.length}</strong> active departments
          </li>
          <li className="mb-2">
            ⏳ <strong>{pendingLeaves.length}</strong> leave requests pending
          </li>
        </ul>
      </Card.Body>
    </Card>
  </Col>
</Row>

    </Container>
  );
};

export default HrDashboard;
