import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

const Slidebar = () => {
  // State để quản lý mở/đóng menu con
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isProductOpen, setIsProductOpen] = useState(false);
  const [isManagement, setIsManagement] = useState(false);
  const [isSupplierOpen, setIsSupplierOpen] = useState(false); // State mới cho nhà cung cấp

  return (
    <div className="w-[20%] min-h-screen bg-gray-100 border-r border-gray-300">
      <div className="flex flex-col gap-2 pt-6 pl-4 text-gray-700">
        {/* Header */}
        <h2 className="text-lg font-semibold pl-2 mb-4">Menu</h2>

        {/* Dashboard */}
        <NavLink
          className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-200 transition-all"
          to="/"
        >
          <img className="w-5 h-5" src={assets.order_icon} alt="" />
          <span className="text-sm font-medium">Trang chủ</span>
        </NavLink>

        {/* Category */}
        <div>
          <div
            className="flex items-center justify-between gap-3 py-3 px-4 rounded-lg hover:bg-gray-200 transition-all cursor-pointer"
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
          >
            <div className="flex items-center gap-3">
              <img className="w-5 h-5" src={assets.order_icon} alt="" />
              <span className="text-sm font-medium">Danh mục</span>
            </div>
            <span>{isCategoryOpen ? '▲' : '▼'}</span>
          </div>
          {isCategoryOpen && (
            <div className="ml-8 mt-1">
              <NavLink
                className="block py-2 px-4 rounded-lg hover:bg-gray-200 transition-all"
                to="/category/add"
              >
                Thêm danh mục
              </NavLink>
              <NavLink
                className="block py-2 px-4 rounded-lg hover:bg-gray-200 transition-all"
                to="/category/list"
              >
                Danh sách
              </NavLink>
            </div>
          )}
        </div>

        {/* Supplier */}
        <div>
          <div
            className="flex items-center justify-between gap-3 py-3 px-4 rounded-lg hover:bg-gray-200 transition-all cursor-pointer"
            onClick={() => setIsSupplierOpen(!isSupplierOpen)}
          >
            <div className="flex items-center gap-3">
              <img className="w-5 h-5" src={assets.order_icon} alt="" />
              <span className="text-sm font-medium">Nhà cung cấp</span>
            </div>
            <span>{isSupplierOpen ? '▲' : '▼'}</span>
          </div>
          {isSupplierOpen && (
            <div className="ml-8 mt-1">
              <NavLink
                className="block py-2 px-4 rounded-lg hover:bg-gray-200 transition-all"
                to="/up"
              >
                Logo
              </NavLink>
              <NavLink
                className="block py-2 px-4 rounded-lg hover:bg-gray-200 transition-all"
                to="/up"
              >
                Khuyến mãi
              </NavLink>
              <NavLink
                className="block py-2 px-4 rounded-lg hover:bg-gray-200 transition-all"
                to="/up"
              >
                Banner
              </NavLink>
            </div>
          )}
        </div>

        {/* Products */}
        <div>
          <div
            className="flex items-center justify-between gap-3 py-3 px-4 rounded-lg hover:bg-gray-200 transition-all cursor-pointer"
            onClick={() => setIsProductOpen(!isProductOpen)}
          >
            <div className="flex items-center gap-3">
              <img className="w-5 h-5" src={assets.order_icon} alt="" />
              <span className="text-sm font-medium">Sản phẩm</span>
            </div>
            <span>{isProductOpen ? '▲' : '▼'}</span>
          </div>
          {isProductOpen && (
            <div className="ml-8 mt-1">
              <NavLink
                className="block py-2 px-4 rounded-lg hover:bg-gray-200 transition-all"
                to="/add"
              >
                Thêm sản phẩm
              </NavLink>
              <NavLink
                className="block py-2 px-4 rounded-lg hover:bg-gray-200 transition-all"
                to="/list"
              >
                Danh sách
              </NavLink>
            </div>
          )}
        </div>

        {/* Orders */}
        <NavLink
          className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-200 transition-all"
          to="/order"
        >
          <img className="w-5 h-5" src={assets.order_icon} alt="" />
          <span className="text-sm font-medium">Đơn đặt hàng</span>
        </NavLink>

        {/* Comments */}
        <NavLink
          className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-200 transition-all"
          to="/up"
        >
          <img className="w-5 h-5" src={assets.order_icon} alt="" />
          <span className="text-sm font-medium">Bình luận</span>
        </NavLink>

        <div>
          <div
            className="flex items-center justify-between gap-3 py-3 px-4 rounded-lg hover:bg-gray-200 transition-all cursor-pointer"
            onClick={() => setIsManagement(!isManagement)}
          >
            <div className="flex items-center gap-3">
              <img className="w-5 h-5" src={assets.order_icon} alt="" />
              <span className="text-sm font-medium">Nhân viên</span>
            </div>
            <span>{isManagement ? '▲' : '▼'}</span>
          </div>
          {isManagement && (
            <div className="ml-8 mt-1">
              <NavLink
                className="block py-2 px-4 rounded-lg hover:bg-gray-200 transition-all"
                to="/up"
              >
                Thêm nhân viên
              </NavLink>
              <NavLink
                className="block py-2 px-4 rounded-lg hover:bg-gray-200 transition-all"
                to="/up"
              >
                Danh sách
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Slidebar;
