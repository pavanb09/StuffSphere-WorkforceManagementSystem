import axiosInstance from "../api/axiosInstance";

const profileService = {

  // ✅ EMPLOYEE: update own full name
  updateFullName: async (fullName) => {
    const params = new URLSearchParams();
    params.append("fullName", fullName);

    const res = await axiosInstance.put(
      "/employees/profile",
      params
    );
    return res.data;
  },

  // ✅ EMPLOYEE: upload own profile image
  uploadProfileImage: async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await axiosInstance.put(
      "/employees/profile/image",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );
    return res.data;
  },

  // ✅ EMPLOYEE: change password
  changePassword: async (currentPassword, newPassword) => {
    const res = await axiosInstance.put(
      "/employees/profile/change-password",
      {
        currentPassword,
        newPassword
      }
    );
    return res.data;
  },

  getMyProfile: async () => {
    const res = await axiosInstance.get("/employees/me");
    return res.data;
  }

};

export default profileService;
