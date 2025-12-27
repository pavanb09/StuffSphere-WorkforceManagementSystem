import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Badge,
  Alert
} from "react-bootstrap";
import { FiLogIn, FiLogOut, FiClock } from "react-icons/fi";
import attendanceService from "../../services/attendanceService";
import "../../pages/hr/hr.css";

/* ===============================
   DATE & TIME HELPERS (SAFE)
================================ */
const normalizeDateTime = (dt) => {
  if (!dt) return null;
  // trims long nano seconds → JS safe
  return dt.replace(/\.(\d{3})\d+/, ".$1");
};

const formatTime = (dt) => {
  if (!dt) return "—";
  const date = new Date(normalizeDateTime(dt));
  if (isNaN(date)) return "—";

  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  });
};

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
};

/* ===============================
   COMPONENT
================================ */
const Attendance = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  /* Pagination */
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  useEffect(() => {
    loadAttendance();
  }, []);

  /* Auto clear alert */
  useEffect(() => {
    if (alert) {
      const t = setTimeout(() => setAlert(null), 4000);
      return () => clearTimeout(t);
    }
  }, [alert]);

  const loadAttendance = async () => {
    try {
      setLoading(true);
      const res = await attendanceService.getMyAttendance();
      setRecords(res.data);
    } catch {
      setAlert({ type: "danger", text: "Failed to load attendance" });
    } finally {
      setLoading(false);
    }
  };

  /* TODAY LOGIC */
  const today = new Date().toISOString().split("T")[0];
  const todayAttendance = records.find(r => r.date === today);

  const lastSession =
    todayAttendance?.sessions?.[todayAttendance.sessions.length - 1];

  const isCheckedIn = lastSession && !lastSession.checkOut;

  /* ACTIONS */
  const handleCheckIn = async () => {
    try {
      setActionLoading(true);
      const res = await attendanceService.checkIn();

      setAlert({
        type: "success",
        text: "Check-in recorded successfully"
      });

      loadAttendance();
    } catch (e) {
      setAlert({
        type: "danger",
        text: e.response?.data?.message || "Check-in failed"
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleCheckOut = async () => {
    try {
      setActionLoading(true);
      const res = await attendanceService.checkOut();

      setAlert({
        type: "success",
        text: "Check-out recorded successfully"
      });

      loadAttendance();
    } catch (e) {
      setAlert({
        type: "danger",
        text: e.response?.data?.message || "Check-out failed"
      });
    } finally {
      setActionLoading(false);
    }
  };

  /* PAGINATION */
  const totalPages = Math.ceil(records.length / ITEMS_PER_PAGE);
  const indexOfLast = currentPage * ITEMS_PER_PAGE;
  const indexOfFirst = indexOfLast - ITEMS_PER_PAGE;
  const currentRecords = records.slice(indexOfFirst, indexOfLast);

  return (
    <Container fluid className="hr-page">
      {/* HEADER */}
      <div className="hr-header mb-3">
        <h2 className="fw-bold">My Attendance</h2>
        <p className="text-muted">
          Track your daily check-ins, sessions, and total hours
        </p>
      </div>

      {/* POP ALERT */}
      {alert && (
        <Alert variant={alert.type} dismissible onClose={() => setAlert(null)}>
          {alert.text}
        </Alert>
      )}

      {/* TODAY STATUS */}
      <Row className="g-4 mb-4">
        <Col md={8}>
          <Card className="hr-card">
            <Card.Body>
              <h5 className="fw-semibold mb-3">Today’s Status</h5>

              {todayAttendance ? (
                <>
                  <p className="mb-1">
                    <strong>Status:</strong>{" "}
                    <Badge bg={isCheckedIn ? "success" : "secondary"}>
                      {isCheckedIn ? "Checked In" : "Checked Out"}
                    </Badge>
                  </p>

                  <p className="mb-1">
                    <strong>Total Hours:</strong>{" "}
                    {todayAttendance.totalHours ?? 0} hrs
                  </p>

                  <p className="text-muted mb-0">
                    Sessions: {todayAttendance.sessions?.length ?? 0}
                  </p>
                </>
              ) : (
                <p className="text-warning mb-0">
                  You haven’t checked in today.
                </p>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* ACTIONS */}
        <Col md={4}>
          <Card className="hr-card h-100">
            <Card.Body className="d-flex flex-column justify-content-center">
              <Button
                variant="success"
                className="mb-2"
                onClick={handleCheckIn}
                disabled={actionLoading || isCheckedIn}
              >
                <FiLogIn className="me-2" />
                Check In
              </Button>

              <Button
                variant="outline-danger"
                onClick={handleCheckOut}
                disabled={actionLoading || !isCheckedIn}
              >
                <FiLogOut className="me-2" />
                Check Out
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* HISTORY */}
      <Card className="hr-card">
        <Card.Body>
          <h5 className="fw-semibold mb-3">Attendance History</h5>

          {loading ? (
            <div className="text-center py-4">
              <Spinner />
            </div>
          ) : currentRecords.length === 0 ? (
            <p className="text-muted">No attendance records</p>
          ) : (
            currentRecords.map((day, idx) => (
              <div
                key={idx}
                className="d-flex justify-content-between align-items-start border-bottom py-3"
              >
                <div>
                  <strong>{formatDate(day.date)}</strong>
                  <div className="text-muted small">
                    Sessions: {day.sessions?.length ?? 0}
                  </div>

                  <ul className="small mt-2 mb-0">
                    {day.sessions.map((s, i) => (
                      <li key={i}>
                        {formatTime(s.checkIn)} →{" "}
                        {s.checkOut ? (
                          formatTime(s.checkOut)
                        ) : (
                          <span className="text-warning fw-medium">
                            Active
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="text-end">
                  <FiClock className="text-primary mb-1" />
                  <div className="fw-semibold">
                    {day.totalHours ?? 0} hrs
                  </div>
                </div>
              </div>
            ))
          )}
        </Card.Body>
      </Card>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-end mt-4 gap-2">
          <Button
            size="sm"
            variant="outline-secondary"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
          >
            Prev
          </Button>

          {[...Array(totalPages)].map((_, i) => (
            <Button
              key={i}
              size="sm"
              variant={
                currentPage === i + 1
                  ? "primary"
                  : "outline-secondary"
              }
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}

          <Button
            size="sm"
            variant="outline-secondary"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </Container>
  );
};

export default Attendance;
