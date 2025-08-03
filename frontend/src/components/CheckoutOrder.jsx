import React, { useState } from "react";
import formaterPrice from "../lib/formaterPrice";
import { apiClient } from "../lib/axiosIntercept";

export default function CheckoutOrder({ onClose, idproduct, products }) {
  const [success, setSuccess] = useState();
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState();

  formaterPrice(products.price);

  const handleIncrease = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrease = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  const handleCheckout = async () => {
    const res = await apiClient.post("/order/product/item", {
      items: [{ productId: idproduct, quantity: quantity }],
    });
    console.log(res.data);
    setSuccess("Pesanan berhasil dibuat.");
    onClose();

    if(!res) setError("Terjadi kesalahan.");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-xl p-6 md:p-8 m-4 w-full max-w-3xl flex flex-col md:flex-row gap-6 md:gap-8"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="w-full md:w-1/2">
          <img
            src={products.productImageURL}
            alt={products.name}
            className="w-full h-64 md:h-full object-cover rounded-xl"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              {products.name}
            </h2>
            <p className="text-sm text-gray-500 mt-2">{products.description}</p>
            <p className="text-2xl font-bold text-blue-600 mt-4">
              {formaterPrice(products.price)}
            </p>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between">
              <span className="text-gray-700 font-semibold">Jumlah</span>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={handleDecrease}
                  className="px-4 py-2 text-lg font-bold text-gray-600 hover:bg-gray-100 rounded-l-lg"
                >
                  -
                </button>
                <span className="px-6 py-2 text-lg font-semibold">
                  {quantity}
                </span>
                <button
                  onClick={handleIncrease}
                  className="px-4 py-2 text-lg font-bold text-gray-600 hover:bg-gray-100 rounded-r-lg"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full mt-6 bg-purple-600 text-white font-bold py-3 rounded-lg text-center hover:bg-purple-700 transition-colors duration-300"
            >
              CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
