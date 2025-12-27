import { Outlet } from "react-router-dom";
import EmployeeNavbar from "../components/navbar/EmployeeNavbar";


const EmployeeLayout = () => {
  return (
    <>
      <EmployeeNavbar />
      <div style={{ padding: "20px" }}>
        <Outlet />
      </div>
    </>
  );
};

export default EmployeeLayout;
