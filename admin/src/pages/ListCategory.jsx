import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CategoryList = () => {

      const [categorylist, setCategoryList] = useState([]);

      const navigate = useNavigate(); 


      const fetchList = async () => {
        try {
          const response = await axios.get(backendUrl + "/api/category/list");
          if (response.data.success) {
            setCategoryList(response.data.products);
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      };
    


  const handleEdit = (id) => {
    navigate(`category/update/${id}`);
  };

  const handleDelete = (id) => {
    alert(`Xóa danh mục có ID: ${id}`);
  };

   useEffect(() => {
      fetchList();
    }, []);

    useEffect(() => {
      console.log("categorylist: ", categorylist)
    }, [categorylist]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Danh sách danh mục</h1>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>STT</th>
            <th style={styles.th}>Tên danh mục</th>
            <th style={styles.th}>Hành động</th>
          </tr>
        </thead>
        <tbody>

          {categorylist?.map((category, index) => (
            <tr key={category._id}>
              <td style={styles.td}>{index + 1}</td>
              <td style={styles.td}>{category.name}</td>
              <td style={styles.td}>
                <button
                  style={{ ...styles.actionButton, ...styles.editButton }}
                  onClick={() => handleEdit(category._id)}
                >
                  Sửa
                </button>
                <button
                  style={{ ...styles.actionButton, ...styles.deleteButton }}
                  onClick={() => handleDelete(category._id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}

          
        </tbody>
      </table>
    </div>
  );
};

// CSS styles dưới dạng JS object
const styles = {
  container: {
    maxWidth: "800px",
    margin: "20px auto",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    color: "#333",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  th: {
    backgroundColor: "#f4f4f4",
    color: "#333",
    padding: "10px",
    textAlign: "left",
    borderBottom: "2px solid #ddd",
  },
  td: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
    textAlign: "left",
  },
  actionButton: {
    padding: "5px 10px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "5px",
  },
  editButton: {
    backgroundColor: "#4CAF50", 
    color: "#fff",
  },
  deleteButton: {
    backgroundColor: "#f44336",
    color: "#fff",
  },
};

export default CategoryList;
