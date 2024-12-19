import React, { useState } from "react";
import axios from 'axios'
import { backendUrl } from '../App.jsx'
import { toast } from 'react-toastify'


const AddCategory = ({ token }) => {
    const [hovered, setHovered] = useState(false)
    const [name, setName] = useState("");

    const onSubmitHandler = async (e) => {
      e.preventDefault();
  
      // Kiểm tra nếu name không rỗng
      if (!name.trim()) {
          toast.error("Tên không được để trống");
          return;
      }
  
      try {
          const data = { name };
  
          const response = await axios.post(backendUrl+ "/api/category/add", data, {
              headers: { 
                  'Content-Type': 'application/json',
                  'token': token  // Đảm bảo token hợp lệ và gửi đúng trong header
              }
          });
  
          if (response.data.success) {
              toast.success(response.data.message);
              setName('');
          } else {
              toast.error(response.data.message);
          }
  
      } catch (error) {
          console.log(error);
          toast.error(error.message || "Lỗi không xác định");
      }
  };

    return (
       <form onSubmit={onSubmitHandler}>
            <div style={{ padding: "20px", textAlign: "center" }}>
                <h2 style={{ fontSize: "50px", marginBottom: "90px" }}>Nhập tên danh mục</h2>
                <input  onChange={(e)=>setName(e.target.value)} value={name} placeholder="Nhập tên danh mục" style={{ width: "100%", height: "50px", fontSize: "30px" }} type="text" />
                <button 
               type='submit'
                    onMouseEnter={() => setHovered(true)}  // Khi hover vào
                    onMouseLeave={() => setHovered(false)}
                    style={{ marginTop: "50px", padding: "40px", fontSize: "30px", backgroundColor: "white", border: "1px solid #ccc", borderColor: hovered ? "green" : "#ccc" , borderRadius: "10px" }}>Thêm</button>
            </div>
       </form>
    );
}
  
  export default AddCategory