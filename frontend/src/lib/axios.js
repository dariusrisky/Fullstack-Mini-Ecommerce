import axios from "axios";

export default axios.create({
  // dev
  baseURL: "http://localhost:3000/api/v1",
  // baseURL: `${process.env.VITE_API_URL}/api/v1`,
  // baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});
