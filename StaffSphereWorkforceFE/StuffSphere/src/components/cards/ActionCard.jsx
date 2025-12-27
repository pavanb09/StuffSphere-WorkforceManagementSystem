import { Card } from "react-bootstrap";

const ActionCard = ({ title, description, icon, onClick }) => (
  <Card
    className="border-0 shadow-sm h-100"
    style={{ cursor: "pointer" }}
    onClick={onClick}
  >
    <Card.Body>
      <div style={{ fontSize: "24px", color: "#4f46e5" }} className="mb-3">
        {icon}
      </div>
      <h5 className="fw-semibold">{title}</h5>
      <p className="text-muted mb-0">{description}</p>
    </Card.Body>
  </Card>
);

export default ActionCard;
