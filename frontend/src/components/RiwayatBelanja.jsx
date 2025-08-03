import React, { useState, useEffect } from "react";
import { apiClient } from "../lib/axiosIntercept";

export default function RiwayatBelanja() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const res = async () => {
      const res = await apiClient.get("/view/order");
      setOrders(res.data.data);
    };
    res();
  }, []);
  return (
    <div>
      <section className="max-w-6xl mx-auto my-5">
        <h2 className="text-xl font-bold text-gray-800 border-b border-black pb-2">
          Riwayat Pembelian
        </h2>
        <div className="mt-4 overflow-auto max-h-[70vh] border rounded-md">
          <table className="min-w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                <th className="p-3 font-semibold">No</th>
                <th className="p-3 font-semibold">Nomor Produk</th>
                <th className="p-3 font-semibold">Nama Produk</th>
                <th className="p-3 font-semibold">Tanggal Beli</th>
                <th className="p-3 font-semibold">Status</th>
                <th className="p-3 font-semibold">Detail</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(i => (
                <tr key={i.id} className="border-b">
                  <td className="p-3">{i.id}</td>
                  <td className="p-3">{i.productId}</td>
                  <td className="p-3">{i.product?.name}</td>
                  <td className="p-3">{i.tanggal_order}</td>
                  {i.status === "PENDING" && (
                    <td className="p-3">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                        PROSES
                      </span>
                    </td>
                  )}
                  {i.status === "PAID" && (
                    <td className="p-3">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                        DIBAYAR
                      </span>
                    </td>
                  )}
                  <td className="p-3">
                    <button className="bg-purple-600 text-white font-semibold px-5 py-2 rounded-md hover:bg-blue-700 transition-colors">
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
