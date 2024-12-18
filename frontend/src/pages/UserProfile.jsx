import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { backenUrl, navigate } = useContext(ShopContext);
  
  // Lấy token từ localStorage và gửi yêu cầu API
  const fetchUserProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Bạn chưa đăng nhập!");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.get(backenUrl + '/api/user/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setUser(response.data.user); 
      } else {
        toast.error(response.data.message); 
        navigate("/login"); 
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại!");
        navigate("/login"); 
      } else {
        toast.error("Không thể tải thông tin người dùng");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-gray-600">Đang tải...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-red-600">
          Không tìm thấy thông tin người dùng
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800 border-b pb-4 mb-6">
        Thông tin cá nhân
      </h1>
      <div className="space-y-4">
        <div>
          <p className="text-sm font-semibold text-gray-500">Họ và tên:</p>
          <p className="text-lg font-medium text-gray-800">{user.name}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-500">Email:</p>
          <p className="text-lg font-medium text-gray-800">{user.email}</p>
        </div>
      </div>
      <button
        onClick={() => toast.info("Chức năng cập nhật thông tin đang phát triển!")}
        className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md text-sm font-semibold"
      >
        Cập nhật thông tin
      </button>
    </div>
  );
};

export default UserProfile;
