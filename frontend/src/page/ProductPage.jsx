import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../lib/axios";
import formaterPrice from "../lib/formaterPrice";
import OtherProduct from "../components/OtherProduct";
import CheckoutOrder from "../components/CheckoutOrder";

function ProductPage() {
  const [Checkout, setCheckout] = useState(false);
  const [products, setProducts] = useState([]);
  const param = useParams();

  useEffect(() => {
    const product = async () => {
      try {
        const product = await axios.get(`/product/${param.productid}`);
        setProducts(product.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    product();
  }, [param]);

  const formatted = formaterPrice(products.price);
  return (
    <>
      <div className="container mx-auto p-4 md:p-8">
        <div className="bg-white p-6 shadow-purple-300 rounded-xl shadow-lg">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3">
              <img
                src={products.productImageURL}
                alt={products.name}
                className="w-full h-auto aspect-square rounded-xl object-cover"
              ></img>
            </div>

            <div className="w-full md:w-2/3 flex flex-col justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 border-b-2 border-black">
                  {products.name}
                  <p className="text-sm py-2 font-normal ">
                    {products.category?.name}
                  </p>
                </h1>
                <h2 className="font-semibold text-black">Tentang : </h2>{" "}
                <p className="mt-2 text-gray-600">{products.description}</p>
                <p className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-4">
                  {formatted}
                </p>
                {products.stock ? (
                  <span className="text-gray-600">Stock: {products.stock}</span>
                ) : (
                  <p className="text-red-500 font-semibold">Stock habis</p>
                )}
              </div>
              <button onClick={() => setCheckout(true)} className="w-full md:w-auto mt-6 bg-purple-800 text-white font-bold py-3 px-8 rounded-lg hover:bg-purple-500 transition-colors duration-300">
                CHECKOUT
              </button>
              {Checkout && <CheckoutOrder products={products} idproduct={param.productid} pmClose={() => setCheckout(false)} />}
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Produk Lainnya di {products.toko?.name}
          </h2>

          <div className="flex items-start space-x-4 overflow-x-auto pb-4">
            <div className="text-center flex-shrink-0 w-28 md:w-32">
              <Link
                to={`/toko/${products.toko?.id}`}
                className="block border-2  border-purple-400 shadow-sm shadow-purple-200 rounded-xl p-2 hover:border-gray-400"
              >
                <img
                  src={products.toko?.profileImageURL}
                  alt={products.toko?.productImagePath}
                  className="w-full h-auto aspect-square rounded-lg object-cover"
                ></img>
              </Link>
              <p className="mt-2 text-sm font-semibold text-gray-700">
                {products.toko?.name}
              </p>
            </div>

            <OtherProduct key={products.toko?.id} tokoid={products.toko?.id} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductPage;
