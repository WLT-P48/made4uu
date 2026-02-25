import { createBrowserRouter } from "react-router-dom";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";

const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Products />,
  },
  {
    path: "/product/:id",
    element: <ProductDetails />,
  },
]);

export default AppRoutes;