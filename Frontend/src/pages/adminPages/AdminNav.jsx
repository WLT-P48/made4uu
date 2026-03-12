import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Users,
  Package,
  ShoppingCart,
  BarChart3,
  Settings,
  Plus,
  Pencil,
  Trash2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function AdminNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showProductsSubNav, setShowProductsSubNav] = useState(false);

  const buttons = [
    { label: "Dashboard", path: "/admin", icon: <BarChart3 size={16} /> },
    { label: "Users", path: "/admin/users", icon: <Users size={16} /> },
    { label: "Orders", path: "/admin/orders", icon: <ShoppingCart size={16} /> },
    { label: "Settings", path: "/admin/settings", icon: <Settings size={16} /> },
  ];

  const productSubNav = [
    { label: "View Products", path: "/admin/products", icon: <Package size={14} /> },
    { label: "Create Product", path: "/admin/products/create", icon: <Plus size={14} /> },
  ];

  const isProductsActive = location.pathname.startsWith("/admin/products");

  return (
    <div className="bg-white shadow-sm">
      <div className="px-6 py-4">
        <h1 className="text-xl font-bold">Admin Panel</h1>
      </div>

      <div className="px-6 pb-4 flex gap-3 flex-wrap">
        {buttons.map((btn) => {
          const isDashboard = btn.path === "/admin";
          const isActive =
            isDashboard
              ? location.pathname === "/admin" ||
                location.pathname === "/admin/dashboard"
              : location.pathname.startsWith(btn.path);

          return (
            <button
              key={btn.label}
              onClick={() => navigate(btn.path)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium border-2 transition ${
                isActive
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-800 border-gray-300 hover:bg-blue-600 hover:text-white hover:border-blue-600"
              }`}
            >
              {btn.icon}
              {btn.label}
            </button>
          );
        })}

        {/* Products Button with Sub-nav */}
        <div className="relative">
          <button
            onClick={() => setShowProductsSubNav(!showProductsSubNav)}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium border-2 transition ${
              isProductsActive
                ? "bg-black text-white border-black"
                : "bg-white text-gray-800 border-gray-300 hover:bg-blue-600 hover:text-white hover:border-blue-600"
            }`}
          >
            <Package size={16} />
            Products
            {showProductsSubNav ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>

          {/* Sub-nav dropdown */}
          {showProductsSubNav && (
            <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg py-2 min-w-[180px] z-50 border border-gray-200">
              {productSubNav.map((subBtn) => {
                const isSubActive = location.pathname === subBtn.path;
                return (
                  <button
                    key={subBtn.label}
                    onClick={() => {
                      navigate(subBtn.path);
                      setShowProductsSubNav(false);
                    }}
                    className={`w-full flex items-center gap-2 px-4 py-2 text-sm transition ${
                      isSubActive
                        ? "bg-black text-white"
                        : "hover:bg-blue-50 text-gray-700"
                    }`}
                  >
                    {subBtn.icon}
                    {subBtn.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
