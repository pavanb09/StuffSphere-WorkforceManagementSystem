import { Outlet } from "react-router-dom";
import HrNavbar from "../components/navbar/HrNavbar";

const HrLayout = () => {
  return (
    <>
      <HrNavbar />
      <div style={{ padding: "20px" }}>
        <Outlet />
      </div>
    </>
  );
};

export default HrLayout;
