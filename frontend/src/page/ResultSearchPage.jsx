import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import CardProduct from "../components/card/CardProduct";
import axios from "../lib/axios";

function ResultSearchPage() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("q");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const callApi = useCallback(async () => {
    if (!keyword) return;

    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`/user/search?q=${keyword}`);
      console.log(res.data.data);
      setData(res.data.data || []);
    } catch (error) {
      setError(error.message);
      console.log(error);

      setData([]);
    } finally {
      setLoading(false);
    }
  }, [keyword]);

  useEffect(() => {
    callApi();
  }, [callApi]);

  return (
    <div className="place-self-center grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {!loading && error && data.length === 0 && (
        <p className="text-center text-gray-500">Produk tidak ditemukan.</p>
      )}
      {loading && <p className="text-center">Loading...</p>}
      {data.map(item => (
        <CardProduct key={item.id} item={item} />
      ))}
    </div>
  );
}

export default ResultSearchPage;
