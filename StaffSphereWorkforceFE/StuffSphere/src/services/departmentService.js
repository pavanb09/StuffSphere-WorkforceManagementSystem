import axiosInstance from "../api/axiosInstance";

const departmentService = {

  // HR: get all departments
  getAllDepartments: async () => {
    const res = await axiosInstance.get("/departments");
    return res.data;
  },

  // HR: add department
  addDepartment: async (data) => {
  const res = await axiosInstance.post("/departments", data);
  return res.data;
}


};

export default departmentService;
