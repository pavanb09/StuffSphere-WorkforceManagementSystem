import { Card, Button } from "react-bootstrap";
import { FiLock } from "react-icons/fi";

const ProfileSecurityCard = ({ onChangePassword }) => {
  return (
    <Card className="hr-card h-100">
      <Card.Body className="d-flex flex-column justify-content-between">
        <div>
          <h5 className="fw-semibold mb-2">
            <FiLock className="me-2" />
            Security
          </h5>

          <p className="text-muted mb-0">
            Update your account password regularly to keep your account secure.
          </p>
        </div>

        <div className="mt-4">
          <Button variant="outline-primary" onClick={onChangePassword}>
            Change Password
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProfileSecurityCard;
