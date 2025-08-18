import React, { useEffect, useState } from "react";
import CardProduct from "../components/card/CardProduct";
import CreateProduct from "../components/form/createProduct";
import axios from "../lib/axios";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { apiClient } from "../lib/axiosIntercept";
import UpdateProduct from "./form/updateProduct";


export default function Dashboard() {
  const [showEditForm, setShowEditForm] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [item, setItem] = useState([]);

  const param = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const data = await axios.get(`/product/toko/${param.id}`, {
          signal: controller.signal,
        });
        setItem(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    return () => {
      controller.abort();
    };
  }, [param.id]);

  const editHandling = (id) => {
    setShowEditForm(true);

  };

  const removeHandling = (id) => {
    try {
      apiClient.put(`/product/remove/${id}`);
    } catch (error) {
      console.log("Error removing product:", error);
      
    }

  };

  return (
    <div>
      <div>
        <header className="bg-white shadow-md">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">
              Dashboard Produk
            </h1>
            <button
              id="createNewBtn"
              onClick={() => setShowCreateForm(true)}
              className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center"
            >
              <i className="fas fa-plus mr-2"></i> Create New
            </button>
          </div>
        </header>
        {showCreateForm && (
          <CreateProduct onClose={() => setShowCreateForm(false)} />
        )}
        {showEditForm && (
          <UpdateProduct  onClose={() => setShowEditForm(false)} />
        )}
        <main className="container mx-auto p-6">
          <div
            id="card-grid"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
          >
            {item.map(item => (
              <CardProduct
                key={item.id}
                item={item}
                onEdit={editHandling}
                onRemove={removeHandling}
              ></CardProduct>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
