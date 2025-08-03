import axios from "../../lib/axios";
import React, { useState, useEffect } from "react";
import { apiClient } from "../../lib/axiosIntercept";

export default function CreateProduct({ onClose }) {
  const [formData, setFormData] = useState({
    productName: "",
    productCategory: "",
    productDescription: "",
    productPrice: "",
    productStock: "",
  });
  const [productImage, setProductImage] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/view/categories");
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Gagal mengambil data kategori:", error);
      }
    };

    fetchCategories();
  }, []);
  const handleChange = e => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleFileChange = e => {
    if (e.target.files && e.target.files[0]) {
      setProductImage(e.target.files[0]);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const dataToSend = new FormData();
    dataToSend.append("name", formData.productName);
    dataToSend.append("categoryId", formData.productCategory);
    dataToSend.append("description", formData.productDescription);
    dataToSend.append("price", formData.productPrice);
    dataToSend.append("stock", formData.productStock);
    if (productImage) {
      dataToSend.append("file", productImage);
    }

    console.log("Data yang akan dikirim ke API:");
    for (let [key, value] of dataToSend.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      const response = await apiClient.post("/product/create", dataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });
      console.log("Data berhasil dikirim ke API:", response.data);
        onClose();
    } catch (error) {
      console.error("Gagal mengirim data ke API:", error);
    }
  };

  return (
    <div>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 transition-opacity duration-300"
        onClick={onClose}
      >
        <div
          className="modal-content bg-white rounded-lg shadow-xl w-full max-w-lg m-4 transform transition-transform duration-300"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex justify-between items-center p-5 border-b">
            <h3 className="text-xl font-bold text-gray-800">
              Create New Product
            </h3>
            <button
              className="text-gray-500 hover:text-gray-800 text-2xl"
              onClick={onClose}
            >
              &times;
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div>
                <label
                  htmlFor="productName"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  id="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Laptop Pro"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="productCategory"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Category
                </label>
                <select
                  id="productCategory"
                  value={formData.productCategory}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  required
                >
                  <option>
                    Select a category
                  </option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="productDescription"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Description
                </label>
                <textarea
                  id="productDescription"
                  rows="3"
                  value={formData.productDescription}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe the product details..."
                  required
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="productPrice"
                    className="block text-sm font-semibold text-gray-700 mb-1"
                  >
                    Price (IDR)
                  </label>
                  <input
                    type="number"
                    id="productPrice"
                    value={formData.productPrice}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 15000000"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="productStock"
                    className="block text-sm font-semibold text-gray-700 mb-1"
                  >
                    Stock
                  </label>
                  <input
                    type="number"
                    id="productStock"
                    value={formData.productStock}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 100"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="file-upload"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Product Image
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          onChange={handleFileChange}
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, JPEG max 5MB
                    </p>
                  </div>
                </div>
                {productImage && (
                  <p className="text-sm text-gray-600 mt-2">
                    File: {productImage.name}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end items-center p-5 border-t bg-gray-50 rounded-b-lg">
              <button
                type="button"
                className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors mr-2"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
