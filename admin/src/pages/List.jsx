import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();  
  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const updateProductStatus = async (id, newStatus) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/product/update-status',
        { id, status: newStatus },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    const result = await Swal.fire({
      title: "Xác nhận xóa",
      text: "Bạn có chắc chắn muốn xóa sản phẩm này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.post(
          backendUrl + "/api/product/remove",
          { id },
          { headers: { token } }
        );
        if (response.data.success) {
          toast.success(response.data.message);
          await fetchList();
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    } else {
      Swal.fire("Hủy", "Sản phẩm không bị xóa.", "info");
    }
  };

  const handleEditClick = (id) => {
    navigate(`/update/${id}`);
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
  };

  useEffect(() => {
    fetchList();
  }, []);

  useEffect(() => {
    console.log("list: ", list);
  }, [list]);


  return (
    <>
      <p className="mb-4 text-2xl font-semibold text-indigo-600">
        Danh sách sản phẩm
      </p>
      <div className="overflow-x-auto bg-indigo-50 rounded-lg">
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr_1fr] items-center py-3 px-4 border bg-gray-100 text-sm font-semibold text-gray-700">
          <b className="text-center">Hình</b>
          <b className="text-left">Tên</b>
          <b className="text-center">Loại</b>
          <b className="text-center">Giá</b>
          <b className="text-center">Tình trạng</b>
          <b className="text-center">Sửa</b>
          <b className="text-center">Xóa</b>
          <b className="text-center">Xem Chi Tiết</b>
        </div>

        {list?.map((item, index) => (
          <div
            className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr_1fr] items-center gap-4 py-3 px-4 border-b bg-white rounded-lg shadow-sm transition hover:shadow-md"
            key={index}
          >
            <div className="flex justify-center items-center">
              <img
                className="w-16 h-16 object-cover rounded-full border"
                src={item.image[0]}
                alt={item.name}
              />
            </div>
            <p className="text-left font-medium text-gray-800">{item.name}</p>
            <p className="text-center text-gray-600">{item.category}</p>
            <p className="text-center font-semibold text-gray-900">
              {item.price}
              {currency}
            </p>
            <div className="flex justify-center items-center">
              <select
                value={item.status || "Còn hàng"}
                onChange={(e) => updateProductStatus(item._id, e.target.value)}
                className="border rounded px-2 py-1 text-sm focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Còn hàng">Còn hàng</option>
                <option value="Hết hàng">Hết hàng</option>
              </select>
            </div>
            <div className="flex justify-center items-center">
              <button
                onClick={() => handleEditClick(item._id)}
                className="text-blue-500 hover:text-blue-700 text-lg"
              >
                <FaEdit />
              </button>
            </div>
            <div className="flex justify-center items-center">
              <button
                onClick={() => removeProduct(item._id)}
                className="text-red-500 hover:text-red-700 text-lg"
              >
                <FaTrash />
              </button>
            </div>
            <div className="flex justify-center items-center">
              <button
                onClick={() => handleViewDetails(item)}
                className="border-2 border-green-500 text-green-500 hover:text-green-700 hover:border-green-700 text-lg rounded-lg p-2 transition-all"
              >
                Chi Tiết
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 transition-opacity duration-300">
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full transform scale-95 transition-transform duration-300 hover:scale-100">
            <h3 className="text-3xl font-semibold text-indigo-600 mb-6 text-center">
              Chi Tiết Sản Phẩm
            </h3>

            <div className="flex flex-col items-center mb-6">
              <img
                src={selectedProduct.image[0]}
                alt={selectedProduct.name}
                className="w-80 h-80 object-cover rounded-lg shadow-md mb-4"
              />
            </div>

            <div className="space-y-4">
              <p className="text-lg text-gray-800">
                <strong>Tên sản phẩm:</strong> {selectedProduct.name}
              </p>
              <p className="text-lg text-gray-800">
                <strong>Loại:</strong> {selectedProduct.category}
              </p>
              <p className="text-lg text-gray-800">
                <strong>Giá:</strong> {selectedProduct.price}
                {currency}
              </p>
              <p className="text-lg text-gray-800">
                <strong>Mô tả:</strong> {selectedProduct.description}
              </p>
            </div>

            <div className="flex justify-center mt-6">
              <button
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all"
                onClick={() => setSelectedProduct(null)}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default List;
