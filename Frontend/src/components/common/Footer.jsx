import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-10">
        
        {/* Top Section */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8">
          
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Made4UU</h2>
            <p className="mt-2 text-sm text-gray-600 max-w-sm">
              Custom-designed products made just for you. Quality,
              creativity, and style delivered to your doorstep.
            </p>
          </div>

          {/* Links */}
          <ul className="flex flex-col sm:flex-row gap-4 text-sm font-medium">
            <li>
              <a
                href="/privacy"
                className="hover:text-black transition duration-300"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="/terms"
                className="hover:text-black transition duration-300"
              >
                Terms of Service
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="hover:text-black transition duration-300"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 my-6"></div>

        {/* Bottom Section */}
        <div className="text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Made4UU. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
