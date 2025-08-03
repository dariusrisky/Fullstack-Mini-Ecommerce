import { axiosInstance, setAccessToken } from "./axios";

const generateAccess = async (method, url, setError) => {
  try {
    const response = await axiosInstance.post("/auth/refresh-token");
    const accessToken = response.data.accessToken;
    setAccessToken(accessToken);
    const data = await axiosInstance[method](url);
    if(data === null) console.log("data null");
    
    return data;
  } catch (error) {
    console.error("Error:", error);
    setError("Gagal memuat data. Silakan coba lagi.");
    return null;
  }
};

export default generateAccess;
