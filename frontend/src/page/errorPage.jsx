import React from 'react';
import { Link } from 'react-router-dom'; // Gunakan Link dari react-router-dom untuk navigasi

// Contoh SVG untuk ilustrasi, Anda bisa menggantinya dengan gambar atau SVG lain
const ErrorIllustration = () => (
  <svg
    className="w-48 h-48 sm:w-64 sm:h-64 text-red-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    ></path>
  </svg>
);


export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
      <div className="max-w-md w-full">
        <div className="mb-6">
          <ErrorIllustration />
        </div>
        
        <h1 className="text-8xl font-extrabold text-red-500 mb-2">Terjadi Kesalahan</h1>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">mohon coba lagi secara berkala</h2>
        
        <Link
          to={homePath}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}