import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
} from "chart.js";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement
);

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  const fetchStatistics = async () => {
    try {
      const response = await axios.get("/api/dashboard/stats"); 
      if (response.data.success) {
        setTotalUsers(response.data.stats.totalUsers);
        setTotalOrders(response.data.stats.totalOrders);
        setTotalProducts(response.data.stats.totalProducts);
        setTotalReviews(response.data.stats.totalReviews);
      } else {
        console.error("Failed to fetch statistics");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  // Data for Bar Chart
  const barData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Monthly Sales",
        data: [12000, 19000, 30000, 50000, 20000, 30000],
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Data for Line Chart
  const lineData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Weekly Orders",
        data: [10, 20, 30, 40],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: 0.4,
      },
    ],
  };

  // Options for charts
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Statistics",
      },
    },
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-6 mb-9">
        {/* Total Users */}
        <div className="bg-green-100 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-green-700">Người dùng</h3>
          <p className="text-3xl font-bold text-green-800 mt-2">9</p>
        </div>
        {/* Total Orders */}
        <div className="bg-purple-100 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-purple-700">Đơn hàng</h3>
          <p className="text-3xl font-bold text-purple-800 mt-2">15</p>
        </div>
        {/* Total Products */}
        <div className="bg-blue-100 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-blue-700">
            Sản phẩm
          </h3>
          <p className="text-3xl font-bold text-blue-800 mt-2">6</p>
        </div>
        {/* Total Reviews */}
        <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-yellow-700">
            Đánh giá
          </h3>
          <p className="text-3xl font-bold text-yellow-800 mt-2">{totalReviews}</p>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="grid grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Doanh số tháng</h3>
          <Bar data={barData} options={options} />
        </div>

        {/* Line Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Doanh số tuần</h3>
          <Line data={lineData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
