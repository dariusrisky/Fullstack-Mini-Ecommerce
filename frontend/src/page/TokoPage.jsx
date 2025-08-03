import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../lib/axios";
import HeaderTokoPage from "../components/HeaderTokoPage";
import CardProduct from "../components/card/CardProduct";

function TokoPage() {
  const [data, setData] = useState();
  const param = useParams();

  useEffect(() => {
    const getInfo = async () => {
      try {
        const toko = await axios.get(`/product/toko/${param.id}`);
        setData(toko.data);
      } catch (error) {
        console.log(error);
      }
    };
    getInfo();
  }, [param]);

  return (
    <div>
      
      <div className="bg-gray-100 min-h-screen">
        <HeaderTokoPage id={param.id}></HeaderTokoPage>

        <nav className="bg-white shadow-sm sticky top-0 z-10">
          <div className="container mx-auto px-4">
            <div className="flex space-x-8">
              <a
                href="#"
                className="py-4 px-2 text-green-600 border-b-2 border-green-600 font-semibold"
              >
                Produk
              </a>
            </div>
          </div>
        </nav>

        <main className="container mx-auto p-4">
          <div className="bg-white p-3 rounded-lg shadow-sm mb-4 flex justify-between items-center">
            <span className="text-gray-600">
              Menampilkan {data?.length} produk
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {data?.map(product => (
              <CardProduct key={product.id} item={product} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default TokoPage;
