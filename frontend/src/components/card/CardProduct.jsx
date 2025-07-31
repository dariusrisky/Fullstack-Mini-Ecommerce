import React from "react";
import { Link } from "react-router-dom";
import formaterPrice from "../../lib/formaterPrice";

export default function CardProduct({ item }) {
  const formatted = formaterPrice(item.price);

  return (
    <>
      <Link
        key={item.id}
        className=" rounded-lg overflow-hidden shadow-lg bg-white "
        to={`/buy/product/${item.id}?c=${item.category}&n=${item.name}`}
      >
        <img
          className="w-full h-48 object-fill"
          src={item.productImageURL}
          alt={item.name}
        />

        <div className="px-6 py-4">
          <div className="font-semibold text-sm mb-2 text-gray-800">
            {item.name}
          </div>

          <p className="price text-gray-700 text-base">Rp.{formatted} </p>
        </div>

        <div className="px-6 pb-4">
          <div className="flex items-center">
            <svg
              className="w-4 h-4 text-gray-500 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
            </svg>
            <span className="text-sm text-gray-600 font-semibold">
              {item.toko.name}
            </span>
          </div>
        </div>
      </Link>
    </>
  );
}
