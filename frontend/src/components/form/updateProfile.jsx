import React, { useEffect, useState } from "react";
import { apiClient } from "../../lib/axiosIntercept";

export default function UpdateProfile({ renderUpdateForm, data }) {
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [username, setUsername] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!username && !selectedFile) {
      setError("Tidak ada perubahan untuk disimpan.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    if (username) {
      formData.append("name", username);
    }
    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    try {
      const response = await apiClient.put("/auth/profile/edit", formData);
      setSuccess(response.data.msg || "Profil berhasil diperbarui!");
      renderUpdateForm();
    } catch (err) {
      setError(err.response?.data?.msg || "Terjadi kesalahan.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUsername = e => {
    setUsername(e.target.value);
  };

  const handleFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={renderUpdateForm}
    >
      <div
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm flex flex-col items-center gap-y-5"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-gray-800">Profil</h2>

        <img
          src={preview}
          alt="Pratinjau Foto Profil"
          className="w-32 h-32 rounded-full object-cover border-4 border-gray-100"
        />

        <form onSubmit={handleSubmit} className="w-full space-y-5">
          <div>
            <label
              htmlFor="file-upload"
              className="w-full text-center cursor-pointer bg-gray-100 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors block"
            >
              {selectedFile ? selectedFile.name : "Ubah Foto"}
            </label>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              className="sr-only"
              onChange={handleFile}
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Input username baru"
              value={username ? `${username}` : `${setUsername(data.name)}`}
              onChange={handleUsername}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {success && (
            <p className="text-green-500 text-sm text-center">{success}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white font-bold py-2.5 rounded-lg hover:bg-purple-700 transition-colors disabled:bg-purple-400"
          >
            {loading ? "Menyimpan..." : "UPDATE"}
          </button>
        </form>
      </div>
    </div>
  );
}
