import React, { useState, useEffect } from "react";
import { apiClient } from "../../lib/axiosIntercept";
import axios from "../../lib/axios";

export default function CreateProduct({ onClose }) {
  const [imagePreview, setImagePreview] = useState(
    `${process.env.VITE_API_URL}/image/default/default_product.webp`
  );
  const [formData, setFormData] = useState({
    productName: "",
    productCategory: "",
    productDescription: "",
    productPrice: "",
    productStock: "",
  });
  const [productImage, setProductImage] = useState(
    `${process.env.VITE_API_URL}/image/default/default_product.webp`
  );
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
      setImagePreview(URL.createObjectURL(e.target.files[0]));
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
        },
      });
      console.log("Data berhasil dikirim ke API:", response.data);
      onClose();
    } catch (error) {
      console.error("Gagal mengirim data ke API:", error);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl m-4 bg-white rounded-xl shadow-lg transform transition-transform duration-300"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Create Product</h1>
          <button
            onClick={onClose}
            className="text-2xl text-gray-500 hover:text-gray-800"
          >
            &times;
          </button>
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col gap-6 md:flex-row">
              <div className="flex flex-col items-center space-y-3 md:w-1/3">
                <label className="w-full text-sm font-medium text-gray-700">
                  Preview Image
                </label>
                <img
                  src={imagePreview}
                  alt="Product Preview"
                  className="object-cover w-full bg-gray-100 border border-gray-300 rounded-lg aspect-square"
                />
                <div>
                  <label
                    htmlFor="image-upload"
                    className="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-100 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-200"
                  >
                    Add Image
                  </label>
                  <input
                    id="image-upload"
                    type="file"
                    className="sr-only"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </div>
              </div>

              <div className="flex flex-col flex-1 space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-1 text-sm font-medium text-gray-700"
                  >
                    Nama Produk
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block mb-1 text-sm font-medium text-gray-700"
                  >
                    Deskripsi Produk
                  </label>
                  <textarea
                    name="productDescription"
                    id="productDescription"
                    rows="6"
                    value={formData.productDescription}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="price"
                      className="block mb-1 text-sm font-medium text-gray-700"
                    >
                      Price
                    </label>
                    <input
                      type="number"
                      name="price"
                      id="productPrice"
                      value={formData.price}
                      onChange={handleChange}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      min="0"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="stock"
                      className="block mb-1 text-sm font-medium text-gray-700"
                    >
                      Stock
                    </label>
                    <input
                      type="number"
                      name="stock"
                      id="productStock"
                      value={formData.stock}
                      onChange={handleChange}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      min="0"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end p-5 border-t border-gray-200 bg-gray-50 rounded-b-xl">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 mr-2 font-bold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 font-bold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700"
              >
                SAVE
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}