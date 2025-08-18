import React from "react";

export default function UpdateProduct({ onClose }) {
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
          <h1 className="text-2xl font-bold text-gray-900">Update Product</h1>
          <button
            onClick={onClose}
            className="text-2xl text-gray-500 hover:text-gray-800"
          >
            &times;
          </button>
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <form
            // onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="flex flex-col gap-6 md:flex-row">
              <div className="flex flex-col items-center space-y-3 md:w-1/3">
                <label className="w-full text-sm font-medium text-gray-700">
                  Preview Image
                </label>
                <img
                  // src={product.imageUrl}
                  alt="Product Preview"
                  className="object-cover w-full bg-gray-100 border border-gray-300 rounded-lg aspect-square"
                />
                <div>
                  <label
                    htmlFor="image-upload"
                    className="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-100 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-200"
                  >
                    Update Image
                  </label>
                  <input
                    id="image-upload"
                    type="file"
                    className="sr-only"
                    // onChange={handleImageChange}
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
                    Update Nama Produk
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    // value={product.name}
                    // onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block mb-1 text-sm font-medium text-gray-700"
                  >
                    Update Deskripsi Produk
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    rows="6"
                    // value={product.description}
                    // onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="price"
                      className="block mb-1 text-sm font-medium text-gray-700"
                    >
                      Update Price
                    </label>
                    <input
                      type="number"
                      name="price"
                      id="price"
                      // value={product.price}
                      // onChange={handleChange}
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
                      Update Stock
                    </label>
                    <input
                      type="number"
                      name="stock"
                      id="stock"
                      // value={product.stock}
                      // onChange={handleChange}
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
