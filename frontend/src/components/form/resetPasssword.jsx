import React, { useState } from "react";
import { apiClient } from "../../lib/axiosIntercept";

export default function ResetPasssword({ renderResetForm }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await apiClient.put("/auth/edit/password", {
        password: password,
        password_confirm: confirmPassword,
      });

      setSuccess("Password berhasil diubah.");
      setLoading(false);
      renderResetForm();
    } catch (error) {
      setError("Gagal mereset password. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={renderResetForm}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 transition-opacity duration-300"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-md p-8 mx-4 bg-white rounded-lg shadow-xl transform transition-all duration-300"
      >
        <button
          onClick={renderResetForm}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-center text-gray-800">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div>
            <label
              htmlFor="password"
              className="text-sm font-bold text-gray-600 block"
            >
              Password Baru
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Masukkan password baru Anda"
              className="w-full p-3 mt-1 text-gray-800 bg-gray-50 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          <div>
            <label
              htmlFor="confirm-password"
              className="text-sm font-bold text-gray-600 block"
            >
              Konfirmasi Password Baru
            </label>
            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="Ulangi password baru Anda"
              className="w-full p-3 mt-1 text-gray-800 bg-gray-50 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}
          {success && (
            <p className="text-sm text-green-600 text-center">{success}</p>
          )}

          <div>
            <button
              type="submit"
              className="w-full px-4 py-3 font-bold text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
