import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Form,
  Badge,
  Button,
  Spinner
} from "react-bootstrap";
import attendanceService from "../../services/attendanceService";

const AttendanceView = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 7;

  useEffect(() => {
    loadAttendance();
  }, []);

  const loadAttendance = async () => {
    try {
      setLoading(true);
      const res = await attendanceService.getAllAttendance();
      setRecords(res.data);
    } finally {
      setLoading(false);
    }
  };

  /* ======================
     FILTERING
  ====================== */
  const filteredRecords = records.filter(r =>
    r.employee.fullName.toLowerCase().includes(search.toLowerCase()) ||
    r.employee.employeeCode.toLowerCase().includes(search.toLowerCase())
  );

  /* ======================
     PAGINATION
  ====================== */
  const indexOfLast = currentPage * ITEMS_PER_PAGE;
  const indexOfFirst = indexOfLast - ITEMS_PER_PAGE;
  const currentRecords = filteredRecords.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredRecords.length / ITEMS_PER_PAGE);

  /* ======================
     KPIs
  ====================== */
  const today = new Date().toISOString().split("T")[0];
  const todayCount = records.filter(r => r.date === today).length;

  return (
    <Container fluid className="hr-page">
      {/* HEADER */}
      <div className="hr-header mb-4">
        <h2 className="fw-bold">Attendance Overview</h2>
        <p className="text-muted">
          Monitor employee check-ins and work hours
        </p>
      </div>

      {/* KPI CARDS */}
      <Row className="g-4 mb-4">
        <Col md={4}>
          <Card className="hr-card text-center">
            <Card.Body>
              <h6 className="text-muted">Total Records</h6>
              <h3>{records.length}</h3>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="hr-card text-center">
            <Card.Body>
              <h6 className="text-muted">Today’s Attendance</h6>
              <h3>{todayCount}</h3>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="hr-card text-center">
            <Card.Body>
              <h6 className="text-muted">Avg Sessions / Day</h6>
              <h3>
                {records.length
                  ? Math.round(
                      records.reduce(
                        (a, b) => a + (b.sessions?.length || 0),
                        0
                      ) / records.length
                    )
                  : 0}
              </h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* FILTER BAR */}
      <Card className="hr-card mb-3">
        <Card.Body>
          <Form.Control
            placeholder="Search by employee name or code"
            value={search}
            onChange={e => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </Card.Body>
      </Card>

      {/* TABLE */}
      <Card className="hr-card">
        <Card.Body>
          {loading ? (
            <div className="text-center py-5">
              <Spinner />
            </div>
          ) : (
            <Table responsive hover borderless className="align-middle">
              <thead className="text-muted">
                <tr>
                  <th>Employee</th>
                  <th>Date</th>
                  <th>Total Hours</th>
                  <th>Sessions</th>
                </tr>
              </thead>

              <tbody>
                {currentRecords.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center text-muted">
                      No attendance records
                    </td>
                  </tr>
                )}

                {currentRecords.map((item, idx) => (
                  <tr key={idx}>
                    <td>
                      <strong>{item.employee.fullName}</strong>
                      <div className="text-muted small">
                        {item.employee.employeeCode}
                      </div>
                    </td>

                    <td>{item.date}</td>

                    <td>
                      <Badge bg="primary">
                        {item.totalHours ?? 0} hrs
                      </Badge>
                    </td>

                    <td>
                      {item.sessions?.map((s, i) => (
                        <div key={i} className="small text-muted">
                          In: {s.checkIn} | Out: {s.checkOut || "—"}
                        </div>
                      ))}
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
        <div className="d-flex justify-content-end gap-2 mt-3">
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

export default AttendanceView;
