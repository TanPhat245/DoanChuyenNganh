import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { FaBars, FaTimes } from "react-icons/fa";

const Slidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // Mở/tắt sidebar trên mobile
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isProductOpen, setIsProductOpen] = useState(false);
  const [isManagement, setIsManagement] = useState(false);
  const [isSupplierOpen, setIsSupplierOpen] = useState(false);

  return (
    <>
      {/* Nút mở sidebar trên mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded-lg"
        onClick={() => setIsOpen(true)}
      >
        <FaBars size={20} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed md:relative top-0 left-0 w-64 md:w-[20%] min-h-screen bg-gray-100 border-r border-gray-300 transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 z-50`}
      >
        {/* Nút đóng sidebar trên mobile */}
        <button
          className="md:hidden absolute top-4 right-4 text-gray-700"
          onClick={() => setIsOpen(false)}
        >
          <FaTimes size={24} />
        </button>

        <div className="flex flex-col gap-2 pt-6 pl-4 text-gray-700">
          <h2 className="text-lg font-semibold pl-2 mb-4">Menu</h2>

          {/* Trang chủ */}
          <NavLink className="menu-item" to="/">
            <img className="menu-icon" src={assets.order_icon} alt="" />
            Trang chủ
          </NavLink>

          {/* Dropdown - Danh mục */}
          <div>
            <div className="menu-item dropdown" onClick={() => setIsCategoryOpen(!isCategoryOpen)}>
              <div className="flex items-center gap-3">
                <img className="menu-icon" src={assets.order_icon} alt="" />
                <span>Danh mục</span>
              </div>
              <span>{isCategoryOpen ? "▲" : "▼"}</span>
            </div>
            {isCategoryOpen && (
              <div className="dropdown-content">
                <NavLink className="submenu-item" to="/category/add">Thêm danh mục</NavLink>
                <NavLink className="submenu-item" to="/category/list">Danh sách</NavLink>
              </div>
            )}
          </div>

          {/* Dropdown - Nhà cung cấp */}
          <div>
            <div className="menu-item dropdown" onClick={() => setIsSupplierOpen(!isSupplierOpen)}>
              <div className="flex items-center gap-3">
                <img className="menu-icon" src={assets.order_icon} alt="" />
                <span>Nhà cung cấp</span>
              </div>
              <span>{isSupplierOpen ? "▲" : "▼"}</span>
            </div>
            {isSupplierOpen && (
              <div className="dropdown-content">
                <NavLink className="submenu-item" to="/up">Logo</NavLink>
                <NavLink className="submenu-item" to="/up">Khuyến mãi</NavLink>
                <NavLink className="submenu-item" to="/up">Banner</NavLink>
              </div>
            )}
          </div>

          {/* Dropdown - Sản phẩm */}
          <div>
            <div className="menu-item dropdown" onClick={() => setIsProductOpen(!isProductOpen)}>
              <div className="flex items-center gap-3">
                <img className="menu-icon" src={assets.order_icon} alt="" />
                <span>Sản phẩm</span>
              </div>
              <span>{isProductOpen ? "▲" : "▼"}</span>
            </div>
            {isProductOpen && (
              <div className="dropdown-content">
                <NavLink className="submenu-item" to="/add">Thêm sản phẩm</NavLink>
                <NavLink className="submenu-item" to="/list">Danh sách</NavLink>
              </div>
            )}
          </div>

          {/* Đơn đặt hàng */}
          <NavLink className="menu-item" to="/order">
            <img className="menu-icon" src={assets.order_icon} alt="" />
            Đơn đặt hàng
          </NavLink>

          {/* Bình luận */}
          <NavLink className="menu-item" to="/comments">
            <img className="menu-icon" src={assets.order_icon} alt="" />
            Bình luận
          </NavLink>

          {/* Dropdown - Nhân viên */}
          <div>
            <div className="menu-item dropdown" onClick={() => setIsManagement(!isManagement)}>
              <div className="flex items-center gap-3">
                <img className="menu-icon" src={assets.order_icon} alt="" />
                <span>Nhân viên</span>
              </div>
              <span>{isManagement ? "▲" : "▼"}</span>
            </div>
            {isManagement && (
              <div className="dropdown-content">
                <NavLink className="submenu-item" to="/employee/add">Thêm nhân viên</NavLink>
                <NavLink className="submenu-item" to="/employee/list">Danh sách</NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Slidebar;
