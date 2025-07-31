import React, { useState, useEffect } from "react";
import axios , { axiosInstance } from "../lib/axios";

export default function MidSection() {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/view/categories");
        setCategory(response.data.categories);
      } catch (err) {
        console.error("Gagal mengambil produk:", err);
        setError("Gagal memuat produk. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
    setLoading(false);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        
      } catch (error) {
        console.log(error);
        se
      }
    }
  })

  if (loading) {
    return <h1 className="text-center p-10">Loading...</h1>;
  }

  return (
    <div className=" p-4 sm:p-6 md:p-8">
      {/* Wrapper untuk membatasi lebar dan menengahkan konten */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* === Kolom Kiri (Konten Utama) === */}
        <div className="lg:col-span-2">
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-3">
              CATEGORI
            </h2>
            <div className="flex flex-wrap gap-3">
              {category.map(category => (
                <button
                  key={category.id}
                  className="px-4 py-2 rounded-md text-sm font-medium transition-colors bg-emerald-600 text-white shadow"
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <div className="flex items-center gap-4 mb-4">
              <h2 className="text-lg font-semibold text-gray-700">
                RIWAYAT BELANJA
              </h2>
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                status : TOKO
              </span>
            </div>

            <div className="space-y-4">
              <button className="w-full bg-gray-800 text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-900 transition-colors">
                Riwayat Belanja
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
            {/* Avatar/Logo Toko */}
            <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center mb-4">
              <img src="https://via.placeholder.com/150" alt="" />
            </div>

            <h3 className="text-xl font-bold text-gray-800">NAMA TOKO</h3>

            <button className="mt-4 w-full bg-gray-800 text-white font-semibold py-2 rounded-lg hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800">
              KELOLA TOKO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
