import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1/user",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

let access_token = "";

export const setAccessToken = token => {
  access_token = token;
};

axiosInstance.interceptors.request.use(config => {
  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`;
  }
  if (!access_token) console.log(access_token);

  return config;
});

axiosInstance.interceptors.response.use(
  res => res,
  async err => {
    const originalRequest = err.config;

    if (err) {
      originalRequest._retry = true;
      try {
        const res = await axios.post(
          "http://localhost:3000/api/user/auth/refresh-token",
          { withCredentials: true }
        );
        const newAccess = res.data.accessToken;
        setAccessToken(newAccess);
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return axiosInstance(originalRequest);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    return Promise.reject(err);
  }
);
