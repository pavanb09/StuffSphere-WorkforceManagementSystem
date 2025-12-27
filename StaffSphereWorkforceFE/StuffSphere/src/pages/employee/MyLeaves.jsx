import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Table, Badge, Spinner, Button } from "react-bootstrap";
import leaveService from "../../services/leaveService";
import "../../pages/hr/hr.css";

const MyLeaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 6;

  useEffect(() => {
    loadLeaves();
  }, []);

  const loadLeaves = async () => {
    try {
      setLoading(true);
      const res = await leaveService.getMyLeaves();
      setLeaves(res.data);
    } catch {
      setError("Failed to load leave records");
    } finally {
      setLoading(false);
    }
  };

  /* ---------- Pagination ---------- */
  const totalPages = Math.ceil(leaves.length / ITEMS_PER_PAGE);
  const indexOfLast = currentPage * ITEMS_PER_PAGE;
  const indexOfFirst = indexOfLast - ITEMS_PER_PAGE;
  const currentLeaves = leaves.slice(indexOfFirst, indexOfLast);

  /* ---------- Stats ---------- */
  const pending = leaves.filter(l => l.status === "PENDING").length;
  const approved = leaves.filter(l => l.status === "APPROVED").length;
  const rejected = leaves.filter(l => l.status === "REJECTED").length;

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

  return (
    <Container fluid className="hr-page">
      {/* HEADER */}
      <div className="hr-header mb-4">
        <h2 className="fw-bold">My Leave Requests</h2>
        <p className="text-muted">
          Track your leave applications and approval status
        </p>
      </div>

      {/* STATS */}
      <Row className="g-4 mb-4">
        <Col md={3}>
          <Card className="hr-card text-center">
            <Card.Body>
              <h6 className="text-muted">Total</h6>
              <h3>{leaves.length}</h3>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="hr-card text-center">
            <Card.Body>
              <h6 className="text-muted">Pending</h6>
              <h3>{pending}</h3>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="hr-card text-center">
            <Card.Body>
              <h6 className="text-muted">Approved</h6>
              <h3>{approved}</h3>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="hr-card text-center">
            <Card.Body>
              <h6 className="text-muted">Rejected</h6>
              <h3>{rejected}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* TABLE */}
      <Card className="hr-card">
        <Card.Body>
          {loading ? (
            <div className="text-center py-4">
              <Spinner />
            </div>
          ) : error ? (
            <p className="text-danger">{error}</p>
          ) : leaves.length === 0 ? (
            <p className="text-muted">No leave records found</p>
          ) : (
            <Table responsive hover borderless className="align-middle">
              <thead className="text-muted">
                <tr>
                  <th>Type</th>
                  <th>Duration</th>
                  <th>Status</th>
                  <th>Reason</th>
                </tr>
              </thead>
              <tbody>
                {currentLeaves.map(l => (
                  <tr key={l.leaveId}>
                    <td className="fw-medium">{l.leaveType}</td>

                    <td className="text-muted">
                      {new Date(l.startDate).toLocaleDateString()} →{" "}
                      {new Date(l.endDate).toLocaleDateString()}
                    </td>

                    <td>
                      <Badge bg={statusVariant(l.status)}>
                        {l.status}
                      </Badge>
                    </td>

                    <td className="text-muted small">
                      {l.reason}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      {/* PAGINATION */}
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

export default MyLeaves;
