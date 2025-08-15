import React, { useEffect, useState } from "react";
import CardProduct from "../components/card/CardProduct";
import CreateProduct from "../components/form/createProduct";
import axios from "../lib/axios";
import { useParams } from "react-router-dom";

function TokoAdminPage() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [item, setItem] = useState([]);

  const param = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get(`/product/toko/${param.id}`);
        console.log(data.data);
        setItem(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [item]);

  const editHandling = (id) => {
    console.log('id');
  };

  const removeHandling = (id) => {
    console.log('id');
  };

  return (
    <div>
      <header class="bg-white shadow-md">
        <div class="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 class="text-2xl font-bold text-gray-800">
            Dashboard Produk
          </h1>
          <button
            id="createNewBtn"
            onClick={() => setShowCreateForm(true)}
            class="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center"
          >
            <i class="fas fa-plus mr-2"></i> Create New
          </button>
        </div>
      </header>
      {showCreateForm && (
        <CreateProduct onClose={() => setShowCreateForm(false)} />
      )}
      <main class="container mx-auto p-6">
        <div
          id="card-grid"
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
        >
          {item.map(item => (
            <CardProduct key={item.id} item={item} onEdit={editHandling} onRemove={removeHandling}></CardProduct>
          ))}
        </div>
      </main>
    </div>
  );
}

export default TokoAdminPage;
