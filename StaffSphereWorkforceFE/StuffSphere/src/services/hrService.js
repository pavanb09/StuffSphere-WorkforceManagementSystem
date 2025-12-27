import axiosInstance from "../api/axiosInstance";

const hrService = {

  // ✅ HR: get all employees
  getAllEmployees: async () => {
    const res = await axiosInstance.get("/employees");
    return res.data;
  },

  // ✅ HR: add new employee
  addEmployee: async (employeeData) => {
    const res = await axiosInstance.post("/employees", employeeData);
    return res.data;
  },

  // ✅ HR: upload profile image for any employee
  uploadEmployeeImage: async (employeeId, file) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await axiosInstance.put(
      `/employees/hr/profile/image/${employeeId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );

    return res.data;
  },

  // ✅ REMOVE EMPLOYEE
  deleteEmployee: async (id) => {
    await axiosInstance.delete(`/employees/${id}`);
  },

  // ✅ UPDATE EMPLOYEE (basic)
  updateEmployee: async (id, payload) => {
    const res = await axiosInstance.put(`/employees/${id}`, payload);
    return res.data;
  }

};

export default hrService;
