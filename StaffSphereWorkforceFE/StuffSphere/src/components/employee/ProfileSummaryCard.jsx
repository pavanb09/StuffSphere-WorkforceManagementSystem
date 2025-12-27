import { Card, Image } from "react-bootstrap";
import { useEffect, useState } from "react";
import profileService from "../../services/profileService";

const BASE_URL = "http://localhost:8080";

const ProfileSummaryCard = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    profileService.getMyProfile().then(res => setProfile(res.data));
  }, []);

  return (
    <Card className="hr-card text-center">
      <Card.Body>
        <Image
          src={
            profile?.profileImage
              ? `${BASE_URL}/${profile.profileImage}`
              : "/avatar.png"
          }
          roundedCircle
          width={100}
          height={100}
          className="mb-3"
        />

        <h5 className="fw-bold">{profile?.fullName}</h5>
        <p className="text-muted small mb-1">{profile?.email}</p>
        <p className="badge bg-secondary">{profile?.role}</p>
      </Card.Body>
    </Card>
  );
};

export default ProfileSummaryCard;
