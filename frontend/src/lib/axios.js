import axios from "axios";
import dotenv from "dotenv";


export default axios.create({
  // baseURL: `${process.env.VITE_API_URL}/api/v1`,
  baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});
