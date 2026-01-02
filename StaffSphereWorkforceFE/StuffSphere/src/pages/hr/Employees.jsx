import { useEffect, useState, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Badge,
  Dropdown,
  Modal,
  Button,
  Form,
  Spinner,
  Pagination
} from "react-bootstrap";
import {
  FiUsers,
  FiBriefcase,
  FiLayers,
  FiCamera,
  FiMoreVertical
} from "react-icons/fi";

import hrService from "../../services/hrService";
import "./hr.css";

const ITEMS_PER_PAGE = 10;

/* =========================
   Helpers
========================= */
const getInitials = (name = "") =>
  name
    .split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase();

/* =========================
   Component
========================= */
const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [editingEmp, setEditingEmp] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const fileRefs = useRef({});

  useEffect(() => {
    loadEmployees();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const loadEmployees = async () => {
    try {
      setLoading(true);
      const res = await hrService.getAllEmployees();
      setEmployees(res.data);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (id, file) => {
    if (!file) return;
    await hrService.uploadEmployeeImage(id, file);
    loadEmployees();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete employee permanently?")) return;
    await hrService.deleteEmployee(id);
    loadEmployees();
  };

  const handleUpdate = async () => {
    await hrService.updateEmployee(editingEmp.id, {
      fullName: editingEmp.fullName,
      designation: editingEmp.designation,
      salary: editingEmp.salary
    });
    setEditingEmp(null);
    loadEmployees();
  };

  /* =========================
     Filtering & Pagination
  ========================= */
  const filtered = employees.filter(e =>
    e.fullName.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const paginatedEmployees = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalSalary = employees.reduce((sum, e) => sum + e.salary, 0);

  return (
    <Container fluid className="hr-page">
      {/* HEADER */}
      <div className="mb-4">
        <h2 className="fw-bold">Employees</h2>
        <p className="text-muted">Enterprise Staff Directory</p>
      </div>

      {/* KPI CARDS */}
      <Row className="g-4 mb-4">
        <Col md={3}>
          <Card className="hr-kpi">
            <FiUsers />
            <div>
              <h4>{employees.length}</h4>
              <p>Total Staff</p>
            </div>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="hr-kpi">
            <FiBriefcase />
            <div>
              <h4>{new Set(employees.map(e => e.designation)).size}</h4>
              <p>Active Roles</p>
            </div>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="hr-kpi">
            <FiLayers />
            <div>
              <h4>{new Set(employees.map(e => e.department)).size}</h4>
              <p>Departments</p>
            </div>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="hr-kpi">
            ₹
            <div>
              <h4>{new Intl.NumberFormat("en-IN").format(totalSalary)}</h4>
              <p>Monthly Payroll</p>
            </div>
          </Card>
        </Col>
      </Row>

      {/* FILTER BAR */}
      <div className="filter-bar mb-3">
        <Form.Control
          placeholder="Search employees"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {/* <Button>Add Employee</Button> */}
      </div>

      {/* TABLE */}
      <Card className="hr-table-card">
        {loading ? (
          <div className="text-center p-4">
            <Spinner />
          </div>
        ) : (
          <Table responsive hover borderless className="align-middle">
            <thead className="text-muted">
              <tr>
                <th>Employee</th>
                <th>Designation</th>
                <th>Department</th>
                <th>Salary</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {paginatedEmployees.map(emp => (
                <tr key={emp.id}>
                  {/* EMPLOYEE CELL */}
                  <td>
                    <div className="emp-cell">
                      {emp.profileImage ? (
                        <img
                          src={`${emp.profileImage}`}
                          alt={emp.fullName}
                          className="emp-avatar"
                        />
                      ) : (
                        <div className="emp-avatar-placeholder">
                          {getInitials(emp.fullName)}
                        </div>
                      )}

                      <div>
                        <strong>{emp.fullName}</strong>
                        <div className="text-muted small">
                          {emp.email}
                        </div>
                      </div>

                      <FiCamera
                        className="upload-icon"
                        onClick={() => fileRefs.current[emp.id].click()}
                      />

                      <input
                        type="file"
                        hidden
                        ref={el => (fileRefs.current[emp.id] = el)}
                        onChange={e =>
                          handleImageUpload(emp.id, e.target.files[0])
                        }
                      />
                    </div>
                  </td>

                  <td>
                    <Badge bg="info">{emp.designation}</Badge>
                  </td>

                  <td className="text-muted">{emp.department}</td>

                  <td>
                    ₹{new Intl.NumberFormat("en-IN").format(emp.salary)}
                  </td>

                  <td>
                    <Dropdown align="end">
                      <Dropdown.Toggle variant="light">
                        <FiMoreVertical />
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => setEditingEmp(emp)}>
                          Edit
                        </Dropdown.Item>
                        <Dropdown.Item
                          className="text-danger"
                          onClick={() => handleDelete(emp.id)}
                        >
                          Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <Pagination className="justify-content-center mt-3">
          <Pagination.Prev
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
          />

          {[...Array(totalPages)].map((_, idx) => (
            <Pagination.Item
              key={idx}
              active={idx + 1 === currentPage}
              onClick={() => setCurrentPage(idx + 1)}
            >
              {idx + 1}
            </Pagination.Item>
          ))}

          <Pagination.Next
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
          />
        </Pagination>
      )}

      {/* EDIT MODAL */}
      <Modal show={!!editingEmp} onHide={() => setEditingEmp(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Employee</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Control
            className="mb-3"
            value={editingEmp?.fullName || ""}
            onChange={e =>
              setEditingEmp({ ...editingEmp, fullName: e.target.value })
            }
          />

          <Form.Select
            className="mb-3"
            value={editingEmp?.designation || ""}
            onChange={e =>
              setEditingEmp({ ...editingEmp, designation: e.target.value })
            }
          >
            <option>INTERN</option>
            <option>SOFTWARE_ENGINEER</option>
            <option>SENIOR_ENGINEER</option>
            <option>TEAM_LEAD</option>
          </Form.Select>

          <Form.Control
            type="number"
            value={editingEmp?.salary || ""}
            onChange={e =>
              setEditingEmp({ ...editingEmp, salary: e.target.value })
            }
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditingEmp(null)}>
            Cancel
          </Button>
          <Button onClick={handleUpdate}>Save</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Employees;
