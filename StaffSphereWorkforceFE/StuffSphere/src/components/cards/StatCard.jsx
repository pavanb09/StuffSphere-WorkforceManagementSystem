import { Card } from "react-bootstrap";

const StatCard = ({ title, value, icon, onClick }) => (
  <Card
    className="border-0 shadow-sm h-100"
    style={{ cursor: "pointer" }}
    onClick={onClick}
  >
    <Card.Body className="d-flex justify-content-between align-items-center">
      <div>
        <h6 className="text-muted mb-1">{title}</h6>
        <h3 className="fw-bold mb-0">{value}</h3>
      </div>
      <div style={{ fontSize: "26px", color: "#4f46e5" }}>
        {icon}
      </div>
    </Card.Body>
  </Card>
);

export default StatCard;
