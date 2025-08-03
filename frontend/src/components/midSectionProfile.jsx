import React, { useEffect, useState } from "react";
import { apiClient } from "../lib/axiosIntercept";
import { Link } from "react-router-dom";

export default function MidSectionProfile() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiClient.get("/get/profile");
      setData(response.data.user);
    };

    fetchData();
  }, []);

  return (
    <div>
      <div key={data.id} className="lg:col-span-1">
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
          <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center mb-4">
            <img src={data.profileImageURL} alt="" />
          </div>

          <h3 className="text-md lg:text-lg font-bold text-gray-800">
            {data.name}
          </h3>
          {data.role === "TOKO" ? (
            <Link to="/dashboard" className="mt-4 w-full bg-gray-800 text-white font-semibold py-2 rounded-lg hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800">
              KELOLA TOKO
            </Link>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}
