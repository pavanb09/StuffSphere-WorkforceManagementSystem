import { Card, Button, Form, Alert } from "react-bootstrap";
import { useState } from "react";
import profileService from "../../services/profileService";

const ProfileInfoCard = () => {
  const [fullName, setFullName] = useState("");
  const [message, setMessage] = useState(null);

  const handleUpdate = async () => {
    try {
      const res = await profileService.updateFullName(fullName);
      setMessage({ type: "success", text: res.message });
    } catch (e) {
      setMessage({
        type: "danger",
        text: e.response?.data?.message || "Update failed"
      });
    }
  };

  return (
    <Card className="hr-card">
      <Card.Body>
        <h5 className="fw-semibold mb-3">Personal Information</h5>

        {message && (
          <Alert variant={message.type} dismissible>
            {message.text}
          </Alert>
        )}

        <Form.Group className="mb-3">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </Form.Group>

        <Button onClick={handleUpdate}>Save Changes</Button>
      </Card.Body>
    </Card>
  );
};

export default ProfileInfoCard;
