import { useState } from "react";

import {
  Container,
  Card,
  Row,
  Col,
  Button,
  Spinner,
  Badge,
  Alert
} from "react-bootstrap";
import leaveService from "../../services/leaveService";
import "../../pages/hr/hr.css";

const ApplyLeave = () => {
  const [form, setForm] = useState({
    type: "PAID",
    startDate: "",
    endDate: "",
    reason: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ---------- Calculate Days ---------- */
  const calculateDays = () => {
    if (!form.startDate || !form.endDate) return 0;
    const start = new Date(form.startDate);
    const end = new Date(form.endDate);
    if (end < start) return 0;
    return Math.floor(
      (end - start) / (1000 * 60 * 60 * 24)
    ) + 1;
  };

  const leaveDays = calculateDays();

  const handleSubmit = async () => {
    if (!form.startDate || !form.endDate || !form.reason.trim()) {
      setMessage({ type: "danger", text: "All fields are required" });
      return;
    }

    if (leaveDays <= 0) {
      setMessage({ type: "danger", text: "Invalid date range" });
      return;
    }

    try {
      setLoading(true);
      const res = await leaveService.applyLeave(form);

      setMessage({ type: "success", text: res.message });

      setForm({
        type: "PAID",
        startDate: "",
        endDate: "",
        reason: ""
      });
    } catch (e) {
      setMessage({
        type: "danger",
        text: e.response?.data?.message || "Leave application failed"
      });
    } finally {
      setLoading(false);
    }
  };

  const typeVariant = {
    PAID: "success",
    CASUAL: "primary",
    SICK: "warning",
    UNPAID: "secondary"
  };

  return (
    <Container fluid className="hr-page">
      {/* HEADER */}
      <div className="hr-header mb-4">
        <h2 className="fw-bold">Apply for Leave</h2>
        <p className="text-muted">
          Submit a leave request for approval
        </p>
      </div>

      <Row className="justify-content-center">
        <Col md={7} lg={6}>
          <Card className="hr-card">
            <Card.Body>
              {/* MESSAGE */}
              {message && (
  <Alert
    variant={message.type}
    className="d-flex align-items-center justify-content-between shadow-sm"
    dismissible
    onClose={() => setMessage(null)}
  >
    <div>
      <strong>
        {message.type === "success" ? "✅ Success!" : "⚠️ Error!"}
      </strong>
      <div className="small mt-1">
        {message.text}
      </div>
    </div>
  </Alert>
)}


              {/* LEAVE TYPE */}
              <div className="mb-3">
                <label className="form-label fw-medium">
                  Leave Type
                </label>
                <div className="d-flex gap-2 flex-wrap">
                  {["PAID", "CASUAL", "SICK", "UNPAID"].map(t => (
                    <Button
                      key={t}
                      size="sm"
                      variant={
                        form.type === t
                          ? typeVariant[t]
                          : "outline-secondary"
                      }
                      onClick={() =>
                        setForm({ ...form, type: t })
                      }
                    >
                      {t}
                    </Button>
                  ))}
                </div>
              </div>

              {/* DATE RANGE */}
              <Row className="mb-3">
                <Col md={6}>
                  <label className="form-label fw-medium">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    className="form-control"
                    value={form.startDate}
                    onChange={handleChange}
                  />
                </Col>

                <Col md={6}>
                  <label className="form-label fw-medium">
                    End Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    className="form-control"
                    value={form.endDate}
                    onChange={handleChange}
                  />
                </Col>
              </Row>

              {/* DAYS COUNT */}
              {leaveDays > 0 && (
                <div className="mb-3">
                  <Badge bg="info">
                    Total Days: {leaveDays}
                  </Badge>
                </div>
              )}

              {/* REASON */}
              <div className="mb-4">
                <label className="form-label fw-medium">
                  Reason
                </label>
                <textarea
                  name="reason"
                  rows="3"
                  className="form-control"
                  placeholder="Brief reason for leave"
                  value={form.reason}
                  onChange={handleChange}
                />
              </div>

              {/* ACTION */}
              <Button
                variant="primary"
                className="w-100"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner size="sm" className="me-2" />
                    Submitting...
                  </>
                ) : (
                  "Submit Leave Request"
                )}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ApplyLeave;
