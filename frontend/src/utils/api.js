// src/utils/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000", // Your backend URL
  withCredentials: true, // important to send cookies
});

export default API;
