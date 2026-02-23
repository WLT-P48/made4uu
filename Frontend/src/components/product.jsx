import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import { HeartIcon as SolidHeart } from "@heroicons/react/24/solid";
import { HeartIcon as OutlineHeart } from "@heroicons/react/24/outline";
import coffeeMug from "../assets/images/coffee-mug.jpg";
import steelBottle from "../assets/images/steel-bottle.jpg";
import giftCombo from "../assets/images/gift-combo.jpg";
import digitalMala from "../assets/images/digital-mala.png";

const Products = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [likedProducts, setLikedProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleLike = (id) => {
    if (likedProducts.includes(id)) {
      setLikedProducts(likedProducts.filter((item) => item !== id));
    } else {
      setLikedProducts([...likedProducts, id]);
    }
  };

  const products = [
    {
      id: 1,
      name: "Aesthetic Coffee Mug",
      category: "Mugs",
      price: 299,
      oldPrice: 399,
      img: coffeeMug,
      rating: 4.5,
      reviews: 120,
    },
    {
      id: 2,
      name: "Steel Water Bottle",
      category: "Bottles",
      price: 499,
      oldPrice: 699,
      img: steelBottle,
      rating: 4.3,
      reviews: 95,
    },
    {
      id: 3,
      name: "Couple Gift Combo",
      category: "Gift Combos",
      price: 899,
      oldPrice: 1199,
      img: giftCombo,
      rating: 4.8,
      reviews: 210,
    },
    {
      id: 4,
      name: "Digital Mala",
      category: "Trending",
      price: 749,
      oldPrice: 999,
      img: digitalMala,
      rating: 4.4,
      reviews: 140,
    },
  ];

  // Filter by category
  const categoryFiltered =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  // Filter by search
  const filteredProducts = categoryFiltered.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 px-10 py-12">

      {/* 🔍 SEARCH BAR */}
      <div className="flex justify-center mb-12">
        <div className="relative w-full max-w-2xl">

          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
            🔍
          </span>

          <input
            type="text"
            placeholder="Search mugs, bottles, gifts..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowDropdown(true);
            }}
            className="w-full pl-14 pr-12 py-4 rounded-full bg-gray-50 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />

          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery("");
                setShowDropdown(false);
              }}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
            >
              ✕
            </button>
          )}

          {/* Dropdown suggestions ONLY when typing */}
          {showDropdown && searchQuery.length > 0 && (
            <div className="absolute top-full mt-3 w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-3 z-50">

              {filteredProducts.length > 0 ? (
                filteredProducts.slice(0, 4).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      navigate(`/product/${item.id}`);
                      setSearchQuery("");
                      setShowDropdown(false);
                    }}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition"
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <span className="text-sm">{item.name}</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 p-2">
                  No results found
                </p>
              )}

            </div>
          )}

        </div>
      </div>

      {/* CATEGORY FILTER */}
      <div className="flex flex-wrap gap-3 mb-12 justify-center">
        {["All", "Trending", "Bottles", "Mugs", "Gift Combos"].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition duration-300 ${
              selectedCategory === cat
                ? "bg-black text-white shadow-lg"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-black hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredProducts.map((product) => {
          const discount = Math.round(
            ((product.oldPrice - product.price) /
              product.oldPrice) *
              100
          );

          return (
            <div
              key={product.id}
              className="bg-white rounded-3xl shadow-lg p-5 hover:shadow-2xl transition duration-300"
            >
              <div
                className="relative cursor-pointer overflow-hidden rounded-2xl"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-2xl hover:scale-110 transition duration-500"
                />

                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(product.id);
                  }}
                  className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md cursor-pointer"
                >
                  {likedProducts.includes(product.id) ? (
                    <SolidHeart className="h-6 w-6 text-red-500" />
                  ) : (
                    <OutlineHeart className="h-6 w-6 text-gray-500" />
                  )}
                </div>
              </div>

              <h3
                onClick={() => navigate(`/product/${product.id}`)}
                className="mt-4 text-lg font-semibold cursor-pointer hover:text-indigo-600"
              >
                {product.name}
              </h3>

              <div className="flex items-center gap-1 text-yellow-500 text-sm mt-1">
                ⭐ {product.rating}
                <span className="text-gray-500">
                  ({product.reviews} reviews)
                </span>
              </div>

              <div className="mt-3">
                <p className="text-2xl font-bold">
                  ₹{product.price}
                </p>
                <div className="flex items-center gap-3">
                  <p className="text-gray-400 line-through text-sm">
                    ₹{product.oldPrice}
                  </p>
                  <p className="text-green-600 text-sm font-semibold">
                    {discount}% OFF
                  </p>
                </div>
              </div>

              <div className="mt-5 flex gap-3">
                <button
                  onClick={() => addToCart(product)}
                  className="w-1/2 bg-black text-white py-2 rounded-xl hover:bg-gray-800 transition"
                >
                  Add to Cart
                </button>

                <button
                  onClick={() =>
                    navigate(`/product/${product.id}`)
                  }
                  className="w-1/2 bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 transition"
                >
                  View Details
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center text-gray-500 text-lg mt-16">
          😔 No products found
        </div>
      )}
    </div>
  );
};

export default Products;
