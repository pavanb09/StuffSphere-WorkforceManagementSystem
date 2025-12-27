import { useState } from "react";
import { Modal, Button, Form, Alert, Spinner } from "react-bootstrap";
import profileService from "../../services/profileService";

const ChangePasswordModal = ({ show, onHide }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword) {
      setAlert({ type: "danger", text: "All fields are required" });
      return;
    }

    try {
      setLoading(true);
      await profileService.changePassword(currentPassword, newPassword);

      setAlert({
        type: "success",
        text: "Password changed successfully"
      });

      setCurrentPassword("");
      setNewPassword("");

      setTimeout(() => {
        onHide();
        setAlert(null);
      }, 1500);

    } catch (e) {
      setAlert({
        type: "danger",
        text: e.response?.data?.message || "Password change failed"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
  setCurrentPassword("");
  setNewPassword("");
  setAlert(null);
  onHide();
};


  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Change Password</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {alert && <Alert variant={alert.type}>{alert.text}</Alert>}

        <Form.Group className="mb-3">
          <Form.Label>Current Password</Form.Label>
          <Form.Control
            type="password"
            value={currentPassword}
            onChange={e => setCurrentPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
          />
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button onClick={handleChangePassword} disabled={loading}>
          {loading ? <Spinner size="sm" /> : "Update Password"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangePasswordModal;
