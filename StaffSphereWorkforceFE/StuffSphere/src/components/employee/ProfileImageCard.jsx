import { Card, Button, Alert, Form } from "react-bootstrap";
import { use, useState } from "react";
import profileService from "../../services/profileService";

const ProfileImageCard = ({onUploadSuccess}) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;

    try {
      setUploading(true);
      const res = await profileService.uploadProfileImage(file);
      setMessage({ type: "success", text: res.message });
      onUploadSuccess(); 
    } catch (e) {
      setMessage({
        type: "danger",
        text: e.response?.data?.message || "Upload failed"
      });
    }finally{
      setUploading(false);
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

        <Button
  className="w-100"
  onClick={handleUpload}
  disabled={uploading || !file}
>
  {uploading ? (
    <>
      <span className="spinner-border spinner-border-sm me-2" />
      Uploading...
    </>
  ) : (
    "Upload"
  )}
</Button>
      </Card.Body>
    </Card>
  );
};

export default ProfileImageCard;
