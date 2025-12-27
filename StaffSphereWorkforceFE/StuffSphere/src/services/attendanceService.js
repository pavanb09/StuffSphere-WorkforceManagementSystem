import axiosInstance from "../api/axiosInstance";

const attendanceService = {
  checkIn: async () => {
    const res = await axiosInstance.post("/attendance/check-in");
    return res.data;
  },

  checkOut: async () => {
    const res = await axiosInstance.post("/attendance/check-out");
    return res.data;
  },

  getMyAttendance: async () => {
    const res = await axiosInstance.get("/attendance/me");
    return res.data;
  },
  // ================= HR =================

  // ✅ HR: get all employees attendance
  getAllAttendance: async () => {
    const res = await axiosInstance.get("/attendance");
    return res.data;
  },

  // ✅ HR: get attendance of one employee
  getEmployeeAttendance: async (employeeId) => {
    const res = await axiosInstance.get(
      `/attendance/employee/${employeeId}`
    );
    return res.data;
  }

};

export default attendanceService;
