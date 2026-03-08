import React, { useEffect, useState } from "react";
import CardProduct from "../components/card/CardProduct";
import CreateProduct from "../components/form/createProduct";
import axios from "../lib/axios";
import { useParams } from "react-router-dom";
import { apiClient } from "../lib/axiosIntercept";
import UpdateProduct from "./form/UpdateProduct";


export default function Dashboard() {
  const [productToEdit, setProductToEdit] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [item, setItem] = useState([]);

  const param = useParams();

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`/product/toko/${param.id}`);
      setItem(data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [param.id]);

  const editHandling = (product) => {
    setProductToEdit(product);
    setShowEditForm(true);
  };

  const removeHandling = async (id) => {
    try {
      await apiClient.put(`/product/remove/${id}`);
      fetchData(); // Refresh the product list
    } catch (error) {
      console.log("Error removing product:", error);
      
    }
  };

  const handleProductCreated = () => {
    fetchData();
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
          <CreateProduct onClose={() => setShowCreateForm(false)} onProductCreated={handleProductCreated} />
        )}
        {showEditForm && productToEdit && (
          <UpdateProduct  
            onClose={() => setShowEditForm(false)} 
            onProductUpdated={fetchData} 
            product={productToEdit} 
          />
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
                onEdit={() => editHandling(item)}
                onRemove={removeHandling}
              ></CardProduct>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}