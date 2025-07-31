import React from "react";

export default function NavbarComponent() {


  return (
    <nav className=" sticky top-0 w-full bg-purple-600 text-white shadow z-50">
      <div className="max-w-5xl mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <div className="font-bold text-xl">WeComLTE</div>
        {/* Search */}
        <div className="flex-1 mx-4">
          <input
            type="text"
            name="search"
            className="w-full rounded px-3 py-1 text-black"
            placeholder="Search Product"
          />
        </div>
        {/* Icons */}
      </div>
    </nav>
  );
}
