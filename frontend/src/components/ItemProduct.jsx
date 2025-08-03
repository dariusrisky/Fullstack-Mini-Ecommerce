import React, { useState, useEffect } from "react";
import axios from "../lib/axios";
import CardProduct from "./card/CardProduct";

export default function ItemProduct() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [item, setItem] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/products");
        setItem(response.data.data);
      } catch (err) {
        console.error("Gagal mengambil produk:", err);
        setError("Gagal memuat produk. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <h1 className="text-center p-10">Loading...</h1>;
  }

  if (error) {
    return <h1 className="text-center p-10 text-red-500">{error}</h1>;
  }

  return (
    <>
      <div className="place-self-center grid max-w-7xl grid-cols-2 p-0 m-1 md:grid-cols-3 lg:m-2 lg:grid-cols-4 xl:grid-cols-6">
        {item.map(item => {
          return <CardProduct key={item.id} item={item}></CardProduct>;
        })}
      </div>
    </>
  );
  6;
}
