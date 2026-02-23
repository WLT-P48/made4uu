import React, { useState } from "react";
import { useCart } from "../CartContext";


export default function Navbar({ setIsCartOpen }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentPath = window.location.pathname;

  const { cart } = useCart();

  const navLinks = [
<<<<<<< HEAD
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Profile", href: "/profile" },
=======
    {
      name: "Home",
      href: "/",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9v9a2 2 0 0 1-2 2h-4V14H9v7H5a2 2 0 0 1-2-2z" />
        </svg>
      ),
    },
    {
      name: "Products",
      href: "/products",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M20 7H4m0 0v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7m-16 0l4-4h8l4 4" />
        </svg>
      ),
    },
    {
      name: "Contact",
      href: "/contact",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 15a4 4 0 0 1-4 4H7l-4 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"
          />
        </svg>
      ),
    },
>>>>>>> main
  ];

  const iconOnlyLinks = [
    {
      name: "Cart",
      href: "/cart",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2 3h2l2.4 12.4a2 2 0 0 0 2 1.6h8.4a2 2 0 0 0 2-1.6L21 7H6" />
          <circle cx="9" cy="21" r="1" />
          <circle cx="17" cy="21" r="1" />
        </svg>
      ),
    },
    {
      name: "Profile",
      href: "/profile",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5z" />
        </svg>
      ),
    },
  ];

  const isActive = (href) => currentPath === href;

  return (
<<<<<<< HEAD
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
=======
    <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md shadow-md">
      <div className="px-6">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo */}
          <a
            href="/"
            className="text-2xl font-extrabold text-indigo-600 transition hover:scale-105"
          >
            Made4UU
          </a>
>>>>>>> main

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`
                  relative flex items-center gap-2 px-3 py-2 rounded-lg
                  transition-all duration-300
                  ${
                    isActive(link.href)
                      ? "text-indigo-600 bg-indigo-50"
                      : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
                  }
                `}
              >
                {link.icon}
                <span className="text-sm font-medium">{link.name}</span>

                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-indigo-600 rounded-full" />
                )}
              </a>
            ))}

            {/* Icon-only buttons */}
            {iconOnlyLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                title={link.name}
                className={`
                  relative p-2 rounded-lg
                  transition-all duration-300
                  ${
                    isActive(link.href)
                      ? "text-indigo-600 bg-indigo-50"
                      : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
                  }
                `}
              >
                {link.icon}

                {isActive(link.href) && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-indigo-600 rounded-full" />
                )}
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

<<<<<<< HEAD
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
=======
          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-indigo-50"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
>>>>>>> main
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-4 space-y-2 bg-white border-t">
          {[...navLinks, ...iconOnlyLinks].map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={`
                flex items-center gap-3 px-4 py-2 rounded-lg
                transition
                ${
                  isActive(link.href)
                    ? "text-indigo-600 bg-indigo-50"
                    : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                }
              `}
            >
              {link.icon}
              <span className="font-medium">{link.name}</span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
