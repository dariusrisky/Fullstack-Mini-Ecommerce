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
});

let accessToken = null;

export const setAuthToken = token => {
  accessToken = token;
};

axiosInstance.interceptors.request.use(
  config => {
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    console.log(config);
    return config;
  },
  error => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  // Jika response sukses, langsung kembalikan
  response => response,

  // Jika response error, jalankan logika ini
  async error => {
    const originalRequest = error.config;

    // Cek jika error adalah 401 dan BUKAN dari request refresh token itu sendiri
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Tandai sudah di-retry

      try {
        // Panggil endpoint refresh token
        const response = await axios.post(
          "http://localhost:3000/api/v1/auth/refresh-token"
        ); // Pastikan endpoint benar

        // Ambil access token baru dari response
        const newAccessToken = response.data.accessToken;

        // Simpan token baru di memori
        accessToken = newAccessToken;

        // Atur header Authorization dengan token baru
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        // Ulangi request yang gagal dengan token baru
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Jika refresh token juga gagal, logout pengguna
        console.error("Sesi habis, silakan login kembali.", refreshError);
        // Hapus token
        accessToken = null;
        // Redirect ke halaman login
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
