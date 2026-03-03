import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import adminService from "../../services/admin.service";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalProducts: 0,
    totalUsers: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
    totalRevenue: 0,
  });
  const [recentOrdersByDate, setRecentOrdersByDate] = useState([]);
  const [systemStatus, setSystemStatus] = useState({
    mongodb: { status: "unknown", message: "Loading..." },
    cloudinary: { status: "unknown", message: "Loading..." },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch stats
      const statsResult = await adminService.getStats();
      if (statsResult.success) {
        setStats(statsResult.data.stats);
        setRecentOrdersByDate(statsResult.data.recentOrdersByDate || []);
      }

      // Fetch system status
      const statusResult = await adminService.getSystemStatus();
      if (statusResult.success) {
        setSystemStatus(statusResult.data);
      }
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Prepare data for the bar chart (orders by date)
  const chartData = recentOrdersByDate.map((item) => ({
    date: item._id,
    orders: item.count,
    revenue: item.revenue,
  }));

  // Prepare data for pie chart (pending vs delivered)
  const orderStatusData = [
    { name: "Pending", value: stats.pendingOrders, color: "#f59e0b" },
    { name: "Delivered", value: stats.deliveredOrders, color: "#10b981" },
  ].filter((item) => item.value > 0);

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "connected":
      case "live":
        return "text-green-600";
      case "disconnected":
      case "error":
        return "text-red-600";
      default:
        return "text-yellow-600";
    }
  };

  const statsData = [
    { title: "Total Users", value: stats.totalUsers.toLocaleString() },
    { title: "Products", value: stats.totalProducts.toLocaleString() },
    { title: "Orders", value: stats.totalOrders.toLocaleString() },
    { title: "Revenue", value: formatCurrency(stats.totalRevenue) },
  ];

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-semibold">Admin Dashboard</h2>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statsData.map((item) => (
          <div key={item.title} className="rounded-2xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">{item.title}</p>
            <p className="mt-2 text-2xl font-bold">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Orders - Bar Chart */}
        <div className="rounded-2xl bg-white p-6 shadow">
          <h3 className="mb-4 font-semibold">Recent Orders (Last 7 Days)</h3>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="orders" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-[250px] items-center justify-center text-gray-500">
              No order data available
            </div>
          )}
          
          {/* Order Status Summary */}
          <div className="mt-4 flex justify-center gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">{stats.pendingOrders}</p>
              <p className="text-sm text-gray-500">Pending</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{stats.deliveredOrders}</p>
              <p className="text-sm text-gray-500">Delivered</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{stats.totalOrders}</p>
              <p className="text-sm text-gray-500">Total</p>
            </div>
          </div>
        </div>

        {/* Order Status Pie Chart */}
        <div className="rounded-2xl bg-white p-6 shadow">
          <h3 className="mb-4 font-semibold">Order Status Distribution</h3>
          {orderStatusData.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-[200px] items-center justify-center text-gray-500">
              No order data available
            </div>
          )}

          {/* System Info */}
          <div className="mt-6 border-t pt-4">
            <h3 className="mb-3 font-semibold">System Info</h3>
            <div className="space-y-2 text-sm">
              <p className="flex items-center justify-between">
                <span className="text-gray-600">MongoDB:</span>
                <span className={`flex items-center gap-1 font-medium ${getStatusColor(systemStatus.mongodb.status)}`}>
                  {systemStatus.mongodb.status === "connected" ? "●" : "●"}
                  {systemStatus.mongodb.status === "connected" ? "Live" : "Offline"}
                </span>
              </p>
              <p className="flex items-center justify-between">
                <span className="text-gray-600">Cloudinary:</span>
                <span className={`flex items-center gap-1 font-medium ${getStatusColor(systemStatus.cloudinary.status)}`}>
                  {systemStatus.cloudinary.status === "live" ? "●" : "●"}
                  {systemStatus.cloudinary.status === "live" ? "Live" : systemStatus.cloudinary.status === "not_configured" ? "Not Configured" : "Offline"}
                </span>
              </p>
              <p className="flex items-center justify-between">
                <span className="text-gray-600">Version:</span>
                <span className="font-medium">v1.0.0</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
