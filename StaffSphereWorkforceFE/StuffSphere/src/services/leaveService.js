import axiosInstance from "../api/axiosInstance";

const leaveService = {

  // ✅ EMPLOYEE: apply leave
  applyLeave: async (payload) => {
    const res = await axiosInstance.post("/leaves/apply", payload);
    return res.data;
  },

  // ✅ EMPLOYEE: get my leaves (JWT-based)
  getMyLeaves: async () => {
    const res = await axiosInstance.get("/leaves/me");
    return res.data;
  },

  // ================= HR (for later) =================

  // HR: get all leaves
  getAllLeaves: async () => {
    const res = await axiosInstance.get("/leaves");
    return res.data;
  },

  // HR: approve leave
  approveLeave: async (leaveId) => {
    const res = await axiosInstance.put(`/leaves/${leaveId}/approve`);
    return res.data;
  },

  // HR: reject leave
  rejectLeave: async (leaveId) => {
    const res = await axiosInstance.put(`/leaves/${leaveId}/reject`);
    return res.data;
  }
};

export default leaveService;
