import React, { useState } from "react";
import { useCart } from "../CartContext";


export default function Navbar({ setIsCartOpen }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { cart } = useCart();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Profile", href: "/profile" },
  ];

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 left-0 z-50">
      <div className="w-full px-6">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div className="flex-shrink-0">
            <a
              href="/"
              className="text-2xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              Made4UU
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}

            {/* 🛒 CART ICON */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative text-2xl hover:scale-110 transition"
            >
              🛒

              {cart?.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cart.length}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">

            {/* Mobile Cart Icon */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative text-xl"
            >
              🛒
              {cart?.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cart.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-indigo-600 focus:outline-none p-2"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden w-full bg-white border-t border-gray-100">
          <div className="px-6 py-3 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-3 py-2 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-md font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
