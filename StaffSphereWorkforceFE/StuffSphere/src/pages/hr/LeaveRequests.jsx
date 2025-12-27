import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Table, Badge, Button, Spinner } from "react-bootstrap";
import leaveService from "../../services/leaveService";

const LeaveRequests = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("ALL");
  const [message, setMessage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);




  useEffect(() => {
    loadLeaves();
  }, []);
  useEffect(() => {
  setCurrentPage(1);
}, [filter]);


  const loadLeaves = async () => {
    try {
      setLoading(true);
      const res = await leaveService.getAllLeaves();
      setLeaves(res.data);
    } catch {
      setMessage({ type: "danger", text: "Failed to load leave requests" });
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id, action) => {
    if (!window.confirm(`Are you sure you want to ${action} this leave?`)) return;

    try {
      action === "approve"
        ? await leaveService.approveLeave(id)
        : await leaveService.rejectLeave(id);

      setMessage({
        type: "success",
        text: `Leave ${action === "approve" ? "approved" : "rejected"}`
      });

      loadLeaves();
    } catch {
      setMessage({ type: "danger", text: "Action failed" });
    }
  };

  const filteredLeaves =
    filter === "ALL"
      ? leaves
      : leaves.filter(l => l.status === filter);

        const ITEMS_PER_PAGE = 8;

const indexOfLast = currentPage * ITEMS_PER_PAGE;
const indexOfFirst = indexOfLast - ITEMS_PER_PAGE;
const currentLeaves = filteredLeaves.slice(indexOfFirst, indexOfLast);
const totalPages = Math.ceil(filteredLeaves.length / ITEMS_PER_PAGE);

  const statusVariant = (status) => {
    switch (status) {
      case "APPROVED":
        return "success";
      case "REJECTED":
        return "danger";
      default:
        return "warning";
    }
  };

  const pendingCount = leaves.filter(l => l.status === "PENDING").length;

  return (
    <Container fluid className="hr-page">
      {/* HEADER */}
      <div className="hr-header mb-4">
        <h2 className="fw-bold">Leave Requests</h2>
        <p className="text-muted">Approve or reject employee leave requests</p>
      </div>

      {/* STATS */}
      <Row className="g-4 mb-4">
        <Col md={4}>
          <Card className="hr-card text-center">
            <Card.Body>
              <h6 className="text-muted">Total Requests</h6>
              <h3>{leaves.length}</h3>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="hr-card text-center">
            <Card.Body>
              <h6 className="text-muted">Pending</h6>
              <h3>{pendingCount}</h3>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="hr-card text-center">
            <Card.Body>
              <h6 className="text-muted">Processed</h6>
              <h3>{leaves.length - pendingCount}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* FILTER TABS */}
      <div className="d-flex gap-2 mb-3">
        {["ALL", "PENDING", "APPROVED", "REJECTED"].map(s => (
          <Button
            key={s}
            variant={filter === s ? "primary" : "outline-secondary"}
            size="sm"
            onClick={() => setFilter(s)}
          >
            {s}
          </Button>
        ))}
      </div>

      {/* TABLE */}
      <Card className="hr-card">
        <Card.Body>
          {message && (
            <p className={`text-${message.type === "success" ? "success" : "danger"}`}>
              {message.text}
            </p>
          )}

          {loading ? (
            <div className="text-center py-5">
              <Spinner />
            </div>
          ) : (
            <Table responsive hover borderless className="align-middle">
              <thead className="text-muted">
                <tr>
                  <th>Employee</th>
                  <th>Type</th>
                  <th>Duration</th>
                  <th>Status</th>
                  <th>Reason</th>
                  <th className="text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeaves.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center text-muted">
                      No leave requests
                    </td>
                  </tr>
                )}

                {currentLeaves.map(l => (
                  <tr key={l.leaveId}>
                    <td>
                      <strong>{l.name}</strong>
                      <div className="text-muted small">
                        {l.employeeCode}
                      </div>
                    </td>
                    <td>{l.leaveType}</td>
                    <td>
                      {l.startDate} → {l.endDate}
                    </td>
                    <td>
                      <Badge bg={statusVariant(l.status)}>
                        {l.status}
                      </Badge>
                    </td>
                    <td className="text-muted small">
                      {l.reason}
                    </td>
                    <td className="text-end">
                      {l.status === "PENDING" && (
                        <>
                          <Button
                            size="sm"
                            variant="success"
                            onClick={() => handleAction(l.leaveId, "approve")}
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline-danger"
                            className="ms-2"
                            onClick={() => handleAction(l.leaveId, "reject")}
                          >
                            Reject
                          </Button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      {totalPages > 1 && (
  <div className="d-flex justify-content-end mt-3 gap-2">
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
        variant={currentPage === i + 1 ? "primary" : "outline-secondary"}
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

export default LeaveRequests;
