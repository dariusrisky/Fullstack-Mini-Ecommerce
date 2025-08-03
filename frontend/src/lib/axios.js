import axios from "axios";

export default axios.create({
  baseURL: `${process.env.VITE_API_URL}/api/v1/user`,
  headers: {
    "Content-Type": "application/json",
  },
});
