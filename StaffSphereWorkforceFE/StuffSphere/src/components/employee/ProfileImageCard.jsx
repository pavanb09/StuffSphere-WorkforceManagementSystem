import { Card, Button, Alert, Form } from "react-bootstrap";
import { useState } from "react";
import profileService from "../../services/profileService";

const ProfileImageCard = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState(null);

  const handleUpload = async () => {
    if (!file) return;

    try {
      const res = await profileService.uploadProfileImage(file);
      setMessage({ type: "success", text: res.message });
    } catch (e) {
      setMessage({
        type: "danger",
        text: e.response?.data?.message || "Upload failed"
      });
    }
  };

  return (
    <Card className="hr-card">
      <Card.Body>
        <h5 className="fw-semibold mb-3">Profile Image</h5>

        {message && (
          <Alert variant={message.type} dismissible>
            {message.text}
          </Alert>
        )}

        <Form.Control
          type="file"
          accept="image/*"
          className="mb-3"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <Button onClick={handleUpload}>Upload Image</Button>
      </Card.Body>
    </Card>
  );
};

export default ProfileImageCard;
