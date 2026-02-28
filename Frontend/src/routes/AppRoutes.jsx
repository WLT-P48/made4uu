import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "../app/Layout";
import Home from "../app/Home";
import PageNotFound from "../app/PageNotFound";
import Login from "../pages/login";
import Register from "../pages/register";
import Cart from "../pages/cart";
import Checkout from "../pages/checkout";
import Profile from "../pages/profile";
import Aboutus from "../pages/Aboutus";
import Contact from "../pages/Contact";
import Products from "../pages/products";
import ProductDetails from "../pages/ProductDetails";
import MyOrders from "../pages/MyOrders";

// ADMIN
import AdminLayout from "../pages/adminPages/AdminLayout";
import AdminDashboard from "../pages/adminPages/AdminDashboard";
import CreateProduct from "../pages/adminPages/CreateProduct";
import UpdateProduct from "../pages/adminPages/UpdateProduct";
import DeleteProduct from "../pages/adminPages/DeleteProduct";

const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // ✅ Navbar + Footer
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "cart", element: <Cart /> },
      { path: "checkout", element: <Checkout /> },
      { path: "profile", element: <Profile /> },
      { path: "orders", element: <MyOrders /> },
      { path: "about-us", element: <Aboutus /> },
      { path: "contact", element: <Contact /> },
      { path: "products", element: <Products /> },
      { path: "product/:id", element: <ProductDetails /> },

      // 🔥 ADMIN NESTED INSIDE LAYOUT
      {
        path: "admin",
        element: <AdminLayout />, // AdminNav
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          { path: "dashboard", element: <AdminDashboard /> },
          { path: "products", element: <AdminDashboard /> },
          { path: "products/create", element: <CreateProduct /> },
          { path: "products/update", element: <UpdateProduct /> },
          { path: "products/delete", element: <DeleteProduct /> },
        ],
      },
    ],
  },

  { path: "*", element: <PageNotFound /> },
]);

export default AppRoutes;
