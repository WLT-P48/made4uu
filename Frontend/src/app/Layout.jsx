import { useState } from "react";
import Navbar from "../components/common/Navbar";
import CartDrawer from "../components/CartDrawer";
import { Outlet } from "react-router-dom";
import Footer from "../components/common/Footer";

export default function Layout() {
  
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar setIsCartOpen={setIsCartOpen} />

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />

      <CartDrawer
        isOpen={isCartOpen}
        setIsOpen={setIsCartOpen}
      />
    </div>
  );
}
