import React, { useEffect, useState } from "react";
import { apiClient } from "../lib/axiosIntercept";
import ProfileMain from "./ProfileMain";

export default function Profile() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const data = async () => {
      try {
        const res = await apiClient.get("/get/profile");
        setData(res.data.user);
      } catch (error) {
        console.log(error);
      }
    };
    data();
  }, [setData]);

  return (
    <div>
      <div key={data.id} className="w-full max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-md flex items-center p-4">
          <div className="flex-shrink-0">
            <img
              src={data.profileImageURL}
              alt={data.name}
              className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
            />
          </div>

          <div className="flex-grow px-6">
            <p className="text-sm text-gray-600">
              Nama :{" "}
              <span className="font-semibold text-gray-800">{data.name} </span>
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Status :{" "}
              <span className="font-semibold text-green-500">{data.role}</span>
            </p>
            {data.role === "TOKO" ? (
              <p className="text-sm text-gray-600 mt-1">
                Total terjual :{" "}
                <span className="font-semibold text-gray-800">aa</span>
              </p>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
      <ProfileMain user={data}></ProfileMain>
    </div>
  );
}
