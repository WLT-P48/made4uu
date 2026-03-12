import React, { useState, useEffect } from "react";
import { createBrowserRouter, Navigate, useLocation } from "react-router-dom";
import Layout from "../app/Layout";
import Home from "../app/home/Home";
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
import Wishlist from "../pages/Wishlist";

// ADMIN
import AdminLayout from "../pages/adminPages/AdminLayout";
import AdminDashboard from "../pages/adminPages/AdminDashboard";
import AdminOrders from "../pages/adminPages/AdminOrders";
import AdminUsers from "../pages/adminPages/AdminUsers";
import CreateProduct from "../pages/adminPages/CreateProduct";
import UpdateProduct from "../pages/adminPages/UpdateProduct";
import DeleteProduct from "../pages/adminPages/DeleteProduct";

// Reusable CSS spinner loader
const PageLoader = () => (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 99999,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'rgba(248, 248, 255, 0.95)',
  }}>
    <div style={{
      width: '50px',
      height: '50px',
      border: '5px solid #f3f3f3',
      borderTop: '5px solid #FFCC33',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }}></div>
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

// Wrapper component to show loader during navigation
const RouteLoader = ({ children }) => {
  const location = useLocation();
  const [isNavigating, setIsNavigating] = useState(false);
  const [displayLocation, setDisplayLocation] = useState(location);

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      // Show loader during route changes - 300ms delay to make it visible
      // This gives time for the loader to appear during page transitions
      setIsNavigating(true);
      const timer = setTimeout(() => {
        setDisplayLocation(location);
        setIsNavigating(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [location, displayLocation]);

  return (
    <>
      {isNavigating && <PageLoader />}
      {children}
    </>
  );
};

const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: (
      <RouteLoader>
        <Layout />
      </RouteLoader>
    ),
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
      { path: "wishlist", element: <Wishlist /> },

      // ADMIN NESTED INSIDE LAYOUT
      {
        path: "admin",
        element: <AdminLayout />,
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          { path: "dashboard", element: <AdminDashboard /> },
          { path: "orders", element: <AdminOrders /> },
          { path: "users", element: <AdminUsers /> },
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
