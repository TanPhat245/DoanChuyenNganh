import React from 'react';
import { FaSignOutAlt } from 'react-icons/fa';

const Navbar = ({ setToken }) => {
  return (
    <div className="flex items-center py-3 px-[4%] justify-between bg-gray-100 shadow-md">

      <img
        className="w-[max(10%,80px)]"
        src="https://shop-t1-na.gg/cdn/shop/files/T1_Logo_Vector__e2012c_130x.png?v=1662060200"
        alt="T1 Logo"
      />

      <button
        onClick={() => setToken('')}
        className="flex items-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full transition duration-200"
      >
        <FaSignOutAlt className="mr-2" />
        <span className="hidden sm:inline text-sm font-medium">Đăng xuất</span>
      </button>
    </div>
  );
};

export default Navbar;
