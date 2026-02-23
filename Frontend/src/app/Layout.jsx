import { useState } from "react";
import Navbar from "../components/common/Navbar";
import CartDrawer from "../components/CartDrawer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <Navbar setIsCartOpen={setIsCartOpen} />
      <Outlet />
      <CartDrawer
        isOpen={isCartOpen}
        setIsOpen={setIsCartOpen}
      />
    </>
  );
}
