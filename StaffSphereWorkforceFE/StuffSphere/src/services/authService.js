import publicAxios from "../api/publicAxios";

const authService = {
  login: async (payload) => {
    const response = await publicAxios.post("/auth/login", payload);
    return response.data;
  },

  forgotPassword: async (email) => {
    const response = await publicAxios.post("/auth/forgot-password", { email });
    return response.data;
  },

  resetPassword: async (payload) => {
    const response = await publicAxios.post("/auth/reset-password", payload);
    return response.data;
  },
};

export default authService;
