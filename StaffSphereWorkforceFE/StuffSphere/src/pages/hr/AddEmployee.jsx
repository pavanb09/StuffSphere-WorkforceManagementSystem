import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  Spinner
} from "react-bootstrap";
import hrService from "../../services/hrService";
import axiosInstance from "../../api/axiosInstance";
import "../../pages/hr/hr.css";

const AddEmployee = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "EMPLOYEE",
    designation: "",
    departmentId: "",
    joiningDate: "",
    salary: ""
  });

  /* ---------------- LOAD DEPARTMENTS ---------------- */
  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = async () => {
    const res = await axiosInstance.get("/departments");
    setDepartments(res.data.data);
  };

  /* ---------------- AUTO DISMISS ALERT ---------------- */
  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  /* ---------------- FORM HANDLERS ---------------- */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.fullName || !form.email || !form.password) {
      setAlert({
        type: "danger",
        text: "Please fill all required fields."
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      await hrService.addEmployee({
        ...form,
        salary: Number(form.salary)
      });

      setAlert({
        type: "success",
        text: "Employee added successfully 🎉 Welcome email has been sent."
      });

      setForm({
        fullName: "",
        email: "",
        password: "",
        role: "EMPLOYEE",
        designation: "",
        departmentId: "",
        joiningDate: "",
        salary: ""
      });

    } catch (e) {
      setAlert({
        type: "danger",
        text:
          e.response?.data?.message ||
          "Failed to add employee. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <Container fluid className="hr-page">
      {/* HEADER */}
      <div className="hr-header mb-4">
        <h2 className="fw-bold">Add Employee</h2>
        <p className="text-muted">
          Create a new employee profile and send login credentials
        </p>
      </div>

      <Card className="hr-card">
        <Card.Body>
          {/* NOTIFICATION */}
          {alert && (
            <Alert
              variant={alert.type}
              dismissible
              onClose={() => setAlert(null)}
              className="mb-4"
            >
              {alert.text}
            </Alert>
          )}

          <Form>
            <Row className="g-4">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Full Name *</Form.Label>
                  <Form.Control
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Email *</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@company.com"
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Password *</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Role</Form.Label>
                  <Form.Select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                  >
                    <option value="EMPLOYEE">Employee</option>
                    <option value="HR">HR</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Designation</Form.Label>
                  <Form.Select
                    name="designation"
                    value={form.designation}
                    onChange={handleChange}
                  >
                    <option value="">Select Designation</option>
                    <option value="INTERN">Intern</option>
                    <option value="ASSOCIATE_ENGINEER">Associate Engineer</option>
                    <option value="SOFTWARE_ENGINEER">Software Engineer</option>
                    <option value="SENIOR_ENGINEER">Senior Engineer</option>
                    <option value="TEAM_LEAD">Team Lead</option>
                    <option value="HR_EXECUTIVE">HR Executive</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Department</Form.Label>
                  <Form.Select
                    name="departmentId"
                    value={form.departmentId}
                    onChange={handleChange}
                  >
                    <option value="">Select Department</option>
                    {departments.map(dep => (
                      <option key={dep.id} value={dep.id}>
                        {dep.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Joining Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="joiningDate"
                    value={form.joiningDate}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Salary</Form.Label>
                  <Form.Control
                    type="number"
                    name="salary"
                    value={form.salary}
                    onChange={handleChange}
                    placeholder="50000"
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex justify-content-end mt-4">
              <Button
                variant="primary"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? <Spinner size="sm" /> : "Add Employee"}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddEmployee;
