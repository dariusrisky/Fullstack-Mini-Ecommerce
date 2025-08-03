import React, { useState } from "react";
import CardProduct from "../components/card/CardProduct";
import CreateProduct from "../components/form/createProduct";

function TokoAdminPage() {
  const [showCreateForm, setShowCreateForm] = useState(false);

  return (
    <div>
      <header class="bg-white shadow-md">
        <div class="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 class="text-2xl font-bold text-gray-800">
            Dashboard Produk {"toko.name"}
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
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {/* <CardProduct item={item}></CardProduct> */}
        </div>
      </main>
    </div>
  );
}

export default TokoAdminPage;
