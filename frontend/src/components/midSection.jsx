import React, { useState, useEffect } from "react";
import axios, { axiosInstance } from "../lib/axios";
import MidSectionProfile from "./midSectionProfile";
import generateAccess from "../lib/generateAccess";

export default function MidSection() {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [role, setRole] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await generateAccess("get", "/get/profile", setError);
      setRole(response.data.user.role);
    };
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

    fetchData()
    fetchCategory();
    setLoading(false);
  }, []);

  if (loading) {
    return <h1 className="text-center p-10">Loading...</h1>;
  }

  return (
    <div className=" p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                Kelola Akun
              </h2>
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                status : {role}
              </span>
            </div>

            <div className="space-y-4">
              <button className="w-full bg-purple-800 text-white font-bold py-3 px-4 rounded-lg hover:bg-purple-600 transition-colors">
                Riwayat Belanja
              </button>
            </div>
          </div>
        </div>

        <MidSectionProfile />
      </div>
    </div>
  );
}
