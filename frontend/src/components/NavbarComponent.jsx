import React, { useCallback, useEffect, useState } from "react";
import axios from "../lib/axios";
import CardProduct from "./card/CardProduct";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../lib/axiosIntercept";


export default function NavbarComponent() {
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlelogout = async () => {
    const resp = await apiClient.post("/auth/logout");
    await sessionStorage.removeItem("isLogin");
    console.log(resp);
    
    window.location.href = "/";
  };

  const handleSearch = event => {
    if (event.key === "Enter" && keyword.trim() !== "") {
      navigate(`/search?q=${keyword}`);
    }
  };

  return (
    <>
      <nav className=" sticky top-0 w-full bg-purple-600 text-white shadow z-50">
        <div className="max-w-5xl mx-auto flex items-center justify-between p-4">
          <div
            className="font-bold text-xl"
            onClick={() => (window.location.href = "/")}
          >
            WeComLTE
          </div>
          <div className="flex-1 mx-4">
            <input
              type="text"
              name="search"
              onKeyDown={handleSearch}
              onChange={e => setKeyword(e.target.value)}
              value={keyword}
              className="w-full rounded px-3 py-1 text-black"
              placeholder="Search Product"
            />
          </div>
          <div>
            {sessionStorage.getItem("isLogin") === "true" && (
              <input
                className="cursor-pointer"
                type="button"
                value="Logout"
                onClick={handlelogout}
              />
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
