import React, { useState,useEffect } from "react";
import axios from "../lib/axios";
import { useNavigate } from "react-router-dom";
import ErrorPage from "../page/errorPage";


export default function HeaderTokoPage({ id }) {
  const [toko, setToko] = useState("");

  useEffect(() => {
    const getInfo = async () => {
      try {
        const toko = await axios.get(`/toko/${id}`);
        setToko(toko.data.data);
      } catch (error) {
        return <ErrorPage />
      }
    };
    getInfo();
  }, [id]);

  return (
    <div>
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 ">
          <div className="flex items-end space-x-4 bg-white p-4 rounded-lg shadow-lg">
            <img
              src={toko.profileImageURL}
              alt={toko.name}
              className="w-24 h-24 rounded-full border-4 border-white object-cover"
            />
            <div className="my-auto mx-auto flex-grow">
              <h1 className="text-2xl font-bold text-gray-800">{toko.name}</h1>
              <p className="text-gray-600">{toko.email}</p>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
