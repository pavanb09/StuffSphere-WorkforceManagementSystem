import axios from "axios";

const publicAxios = axios.create({
  baseURL: "https://stuffsphere-workforcemanagementsystem.onrender.com/api",
});

export default publicAxios;
