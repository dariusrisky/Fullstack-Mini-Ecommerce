import React from "react";
import { apiClient } from "../lib/axiosIntercept";

export default function TokoUser({ onClose }) {
  const handleConfirm = async () => {
    const resp = await apiClient.put("/auth/profile/edit", {
      role: "TOKO",
    });

    onClose();
    window.location.reload();
  };

  return (
    <div>
      <div
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div
          onClick={e => e.stopPropagation()}
          className="relative w-full max-w-md p-6 mx-4 bg-white rounded-lg shadow-xl"
        >
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 mx-auto bg-green-100 rounded-full sm:mx-0 sm:h-10 sm:w-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M5 21V7h14v14H5z" />
                <path d="M9 7V4a3 3 0 0 1 6 0v3" />
                <path d="M12 11h.01" />
                <path d="M12 15h.01" />
                <path d="M12 19h.01" />
              </svg>
            </div>

            <div className="flex-grow">
              <h3 className="text-lg font-bold text-gray-900">Konfirmasi :</h3>

              <div className="mt-2 text-sm text-gray-600">
                Jika anda menyetujui menjadi Bagian dari toko anda akan diberi
                beberapa hak untuk mengola toko dan anda harus bisa bertanggung
                jawab atas produk yang anda tawarkan
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-4">
            <button
              onClick={onClose}
              type="button"
              className="w-full sm:w-auto px-4 py-2 mt-2 sm:mt-0 text-sm font-medium text-black bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Batalkan
            </button>
            <button
              onClick={handleConfirm}
              type="button"
              className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-black bg-green-200 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Konfirmasi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
