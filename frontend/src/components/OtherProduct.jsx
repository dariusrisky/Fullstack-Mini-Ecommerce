import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import generateAccess from "../lib/generateAccess";

export default function OtherProduct({ tokoid }) {
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const r = async () => {
      const response = await generateAccess(
        "get",
        `/product/toko/${tokoid}`,
        setError
      );
      setProducts(response.data);
    };
    r();
  }, [tokoid]);

  return (
    <>
      {products.slice(0, 5).map(i => {
        return (
          <Link
            key={i.id}
            to={`/buy/product/${i.id}?&n=${encodeURIComponent(i.name)}`}
            className="text-center flex-shrink-0 w-28 md:w-32"
          >
            <img
              src={i.productImageURL}
              alt={i.name}
              className="w-full h-auto aspect-square rounded-xl object-cover shadow-sm hover:shadow-md transition-shadow"
            ></img>
            <p className="mt-2 text-sm text-gray-600">{i.name}</p>
            <p>{error}</p>
          </Link>
        );
      })}
    </>
  );
}
