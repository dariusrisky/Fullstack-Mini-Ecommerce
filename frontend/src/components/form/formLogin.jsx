import React, { useState, useEffect } from "react";
import axios, { setAccessToken } from "../../lib/axios";

export default function FormLogin({ renderForm }) {
  const [Loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async e => {
    e.preventDefault();
    setError("");
    setSuccess("");

    setLoading(true);

    const payload = {
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await axios.post("/auth/login", payload, {
        withCredentials: true,
      });

      console.log("Respon dari server:", response.data.user.accessToken);
      setAccessToken(response.data.user.accessToken);
      setSuccess("login berhasil!");
      window.location.href = "/";
    } catch (err) {
      console.error("Error saat registrasi:", err);
      if (err.response && err.response.data && err.response.data.msg) {
        setError(err.response.data.msg);
      } else {
        setError(`${err.response.data.msg}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={renderForm}
    >
      <div
        className="w-full max-w-sm p-8 space-y-4 bg-white rounded-xl shadow-lg relative"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={renderForm}
          className="absolute top-2 right-4 text-2xl text-gray-500 hover:text-gray-800"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-center text-gray-800 pt-4">
          SIGN IN
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              className="block text-sm font-medium text-gray-700 my-3"
              htmlFor="email"
            >
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Alamat Email"
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700 my-3"
              htmlFor="password"
            >
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Password"
              onChange={handleChange}
            />
          </div>

          {error && <p className="text-sm text-center text-red-500">{error}</p>}
          {success && (
            <p className="text-sm text-center text-green-500">{success}</p>
          )}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
            >
              LOGIN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
