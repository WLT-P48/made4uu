import { createBrowserRouter } from "react-router-dom";
import Layout from "../app/Layout";
import Home from "../app/Home";
import PageNotFound from "../app/PageNotFound";
import Login from "../pages/login";
import Register from "../pages/register";
import Cart from "../pages/cart";
import Checkout from "../pages/checkout";
import Profile from "../pages/profile";
import Products from "../components/product";
import ProductDetails from "../pages/ProductDetails";


const AppRoutes = createBrowserRouter([
    {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/product/:id",
    element: <ProductDetails />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "cart",
        element: <Cart />
      },
      {
        path: "checkout",
        element: <Checkout />
      },
      {
        path: "profile",
        element: <Profile />
      },
      {
        path: "*",
        element: <PageNotFound />
      }
    ]
  }
]);

export default AppRoutes;