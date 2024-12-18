import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Navbar = () => {
  const [visible, setVisible] = useState(false);

  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } =
    useContext(ShopContext);

  const logout = () => {
    toast.success("Đăng xuất thành công");
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  return (
    <div className="bg-white shadow-md sticky top-0 z-50">
      <div className="flex items-center justify-between py-4 px-6 font-medium">
        <Link to="/">
          <img
            src="https://shop-t1-na.gg/cdn/shop/files/T1_Logo_Vector__e2012c_130x.png?v=1662060200"
            className="w-36"
            alt="Logo"
          />
        </Link>

        <ul className="hidden sm:flex gap-8 text-sm text-gray-700">
          <NavLink
            to="/"
            className="flex flex-col items-center gap-1 hover:text-black transition-all"
          >
            <p>TRANG CHỦ</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>

          <NavLink
            to="/collection"
            className="flex flex-col items-center gap-1 hover:text-black transition-all"
          >
            <p>BỘ SƯU TẬP</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>

          <NavLink
            to="/about"
            className="flex flex-col items-center gap-1 hover:text-black transition-all"
          >
            <p>GIỚI THIỆU</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>

          <NavLink
            to="/contact"
            className="flex flex-col items-center gap-1 hover:text-black transition-all"
          >
            <p>LIÊN HỆ</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
        </ul>

        <div className="flex items-center gap-6">
          <img
            onClick={() => setShowSearch(true)}
            src={assets.search_icon}
            className="w-5 cursor-pointer"
            alt="Search"
          />

          <div className="group relative">
            <img
              onClick={() => (token ? null : navigate("/login"))}
              className="w-5 cursor-pointer"
              src={assets.profile_icon}
              alt="Profile"
            />
            {token && (
              <div className="group-hover:block hidden absolute right-0 pt-4 bg-slate-100 rounded text-gray-500">
                <div className="flex flex-col gap-2 w-36 py-3 px-5">
                    <p
                     onClick={() => navigate("/profile")}
                    className="cursor-pointer hover:text-black">Tôi</p>
                  <p
                    onClick={() => navigate("/orders")}
                    className="cursor-pointer hover:text-black"
                  >
                    Đơn hàng
                  </p>
                  <p onClick={logout} className="cursor-pointer hover:text-black">
                    Đăng xuất
                  </p>
                </div>
              </div>
            )}
          </div>

          <Link to="/cart" className="relative">
            <img src={assets.cart_icon} className="w-5 min-w-5" alt="Cart" />
            <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
              {getCartCount()}
            </p>
          </Link>

          <img
            onClick={() => setVisible(!visible)}
            src={assets.menu_icon}
            className="w-5 cursor-pointer sm:hidden"
            alt="Menu"
          />
        </div>
      </div>

      <div
        className={`fixed top-0 left-0 right-0 bg-white h-screen z-40 transform transition-transform ${
          visible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img className="h-4 rotate-180" src={assets.cross_icon} alt="Close Menu" />
            <p>Đóng</p>
          </div>

          <NavLink
            onClick={() => setVisible(false)}
            className="py-4 pl-6 border-t hover:bg-gray-100 text-lg"
            to="/"
          >
            TRANG CHỦ
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-4 pl-6 border-t hover:bg-gray-100 text-lg"
            to="/collection"
          >
            BỘ SƯU TẬP
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-4 pl-6 border-t hover:bg-gray-100 text-lg"
            to="/about"
          >
            GIỚI THIỆU
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-4 pl-6 border-t hover:bg-gray-100 text-lg"
            to="/contact"
          >
            LIÊN HỆ
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
