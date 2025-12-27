import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Form,
  Button,
  Alert
} from "react-bootstrap";
import departmentService from "../../services/departmentService";

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = async () => {
    const res = await departmentService.getAllDepartments();
    setDepartments(res.data);
  };

  const handleAdd = async () => {
    if (!name.trim()) {
      setAlert({ type: "danger", text: "Department name is required" });
      return;
    }

    try {
      await departmentService.addDepartment(name);
      setAlert({ type: "success", text: "Department added successfully" });
      setName("");
      loadDepartments();
      setTimeout(() => setAlert(null), 3000);
    } catch (e) {
      setAlert({
        type: "danger",
        text: e.response?.data?.message || "Failed to add department"
      });
    }
  };

  const filteredDepartments = departments.filter(dep =>
    dep.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container fluid className="hr-page">
      {/* HEADER */}
      <div className="hr-header mb-4">
        <h2 className="fw-bold">Departments</h2>
        <p className="text-muted">
          Manage organizational departments
        </p>
      </div>

      {/* KPI */}
      <Row className="g-4 mb-4">
        <Col md={4}>
          <Card className="hr-card text-center">
            <Card.Body>
              <h6 className="text-muted">Total Departments</h6>
              <h3>{departments.length}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* ADD + SEARCH */}
      <Card className="hr-card mb-3">
        <Card.Body>
          <Row className="g-3 align-items-end">
            <Col md={5}>
              <Form.Label>New Department</Form.Label>
              <Form.Control
                placeholder="Enter department name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </Col>

            <Col md={3}>
              <Button className="w-100" onClick={handleAdd}>
                Add Department
              </Button>
            </Col>

            <Col md={4}>
              <Form.Label>Search</Form.Label>
              <Form.Control
                placeholder="Search department"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* ALERT */}
      {alert && <Alert variant={alert.type}>{alert.text}</Alert>}

      {/* TABLE */}
      <Card className="hr-card">
        <Card.Body>
          <Table hover responsive borderless className="align-middle">
            <thead className="text-muted">
              <tr>
                <th>#</th>
                <th>Department Name </th>
                <th>Department Description </th>
              </tr>
            </thead>

            <tbody>
              {filteredDepartments.length === 0 && (
                <tr>
                  <td colSpan="2" className="text-center text-muted">
                    No departments found
                  </td>
                </tr>
              )}

              {filteredDepartments.map((dep, index) => (
                <tr key={dep.id}>
                  <td>{index + 1}</td>
                  <td>
                    <p>{dep.name}</p>
                  </td>
                  <td><p>{dep.description}</p></td>
                  
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Departments;
