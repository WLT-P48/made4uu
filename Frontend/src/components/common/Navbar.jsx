import React, { useState } from "react";
import { useCart } from "../CartContext";

export default function Navbar({ setIsCartOpen }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentPath = window.location.pathname;
  const { cart } = useCart();

  const navLinks = [
    {
      name: "Home",
      href: "/",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            d="M3 12l9-9 9 9v9a2 2 0 0 1-2 2h-4V14H9v7H5a2 2 0 0 1-2-2z" />
        </svg>
      ),
    },
    {
      name: "Products",
      href: "/products",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            d="M20 7H4m0 0v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7m-16 0l4-4h8l4 4" />
        </svg>
      ),
    },
    {
      name: "Contact",
      href: "/contact",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            d="M21 15a4 4 0 0 1-4 4H7l-4 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
        </svg>
      ),
    },
  ];

  const isActive = (href) => currentPath === href;

  return (
    <nav className="sticky top-0 z-50 w-full bg-white shadow-md">
      <div className="px-6">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <a
            href="/"
            className="text-2xl font-bold text-indigo-600 hover:scale-105 transition"
          >
            Made4UU
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`relative flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                  isActive(link.href)
                    ? "text-indigo-600 bg-indigo-50"
                    : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
                }`}
              >
                {link.icon}
                <span className="text-sm font-medium">{link.name}</span>
              </a>
            ))}

            {/* Cart */}
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

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-6 py-4 space-y-2 bg-white border-t">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-indigo-50 hover:text-indigo-600"
            >
              {link.icon}
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}