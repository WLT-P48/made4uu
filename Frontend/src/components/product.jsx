import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import { HeartIcon as SolidHeart } from "@heroicons/react/24/solid";
import { HeartIcon as OutlineHeart } from "@heroicons/react/24/outline";
import coffeeMug from "../assets/images/coffee-mug.jpg";
import steelBottle from "../assets/images/steel-bottle.jpg";
import giftCombo from "../assets/images/gift-combo.jpg";
import digitalMala from "../assets/images/digital-mala.png";
import luxuryClock from "../assets/images/Luxury-Wall-Clock.jpg";
import ceramicVase from "../assets/images/Ceramic-Flower-Vase.jpg";
import decorativePot from "../assets/images/Decorative-Plant-Pot.jpg";
import modermlamp from "../assets/images/Modern-Table-Lamp.jpg";

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
  {
    id: 5,
    name: "Luxury Wall Clock",
    category: "Trending",
    price: 1299,
    oldPrice: 1599,
    img: luxuryClock,
    rating: 4.7,
    reviews: 88,
  },
  {
    id: 6,
    name: "Ceramic Flower Vase",
    category: "Gift Combos",
    price: 699,
    oldPrice: 899,
    img: ceramicVase,
    rating: 4.5,
    reviews: 110,
  },
  {
    id: 7,
    name: "Decorative Plant Pot",
    category: "Bottles",
    price: 499,
    oldPrice: 699,
    img: decorativePot,
    rating: 4.4,
    reviews: 72,
  },
  {
    id: 8,
    name: "Modern Table Lamp",
    category: "Trending",
    price: 699,
    oldPrice: 999,
    img: modermlamp,
    rating: 4.4,
    reviews: 72,
  },
];

  const categoryFiltered =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const filteredProducts = categoryFiltered.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 px-6 md:px-20 py-16">

      {/* SEARCH BAR */}
      <div className="flex justify-center mb-12">
        <div className="relative w-full max-w-7xl">

          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-900 text-lg">
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
            className="w-full text-2xl text-black pl-14 pr-12 py-7 rounded-full bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
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

          {showDropdown && searchQuery.length > 0 && (
            <div className="absolute top-full mt-3 w-full bg-white rounded-xl shadow-lg p-3 z-50">
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
                      className="w-full h-48 rounded-2xl object-cover"
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
<div className="flex flex-wrap gap-6 mb-14 justify-center">

  {["All", "Trending", "Bottles", "Mugs", "Gift Combos"].map((cat) => (
    <button
      key={cat}
      onClick={() => setSelectedCategory(cat)}
      className={`px-6 py-2 rounded-full text-sm font-medium
      transition-colors duration-200 ease-in-out
      focus:outline-none focus:ring-0
      ${
        selectedCategory === cat
          ? "bg-black text-white"
          : "bg-transparent text-gray-700 hover:text-black"
      }`}
    >
      {cat}
    </button>
  ))}

</div>

      {/* PRODUCT GRID */}
     {/* PRODUCT GRID */}
<div className="max-w-[3000px] mx-auto">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 items-stretch">

    {filteredProducts.map((product) => {
      const discount = Math.round(
        ((product.oldPrice - product.price) / product.oldPrice) * 100
      );

      return (
        <div
          key={product.id}
          className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-2xl transition duration-300"
        >
          <div
  className="relative cursor-pointer"
  onClick={() => navigate(`/product/${product.id}`)}
>
  <div className="w-full h-80 flex items-center justify-center bg-white rounded-2xl overflow-hidden">
    <img
      src={product.img}
      alt={product.name}
      className="max-h-full max-w-full object-contain transition duration-500 hover:scale-105"
    />
  </div>

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
            className="mt-4 text-2xl font-bold tracking-wide text-gray-900 cursor-pointer hover:text-indigo-600 transition"
          >
            {product.name}
          </h3>

         <div className="flex items-center gap-2 mt-2">

  <span className="text-green-600 text-3xl">★</span>

  <span className="text-green-600 font-bold text-2xl">
    {product.rating}
  </span>

  <span className="text-black-950 text-2xl">
    ({product.reviews})
  </span>

</div>

          <div className="mt-3">
            <p className="text-3xl font-bold">
              ₹{product.price}
            </p>
            <div className="flex items-center gap-3">
              <p className="text-black-400 line-through text-2xl">
                ₹{product.oldPrice}
              </p>
              <p className="text-orange-400 text-3xl font-semibold">
                {discount}% OFF
              </p>
            </div>
          </div>

          <div className="mt-5 flex gap-3">
            <button
              onClick={() => addToCart(product)}
              className="w-1/2 bg-black  text-white text-xl py-4 rounded-xl hover:bg-gray-200 transition"
            >
              Add to Cart
            </button>

            <button
              onClick={() => navigate(`/product/${product.id}`)}
              className="w-1/2 bg-indigo-600 text-white text-xl py-4 rounded-xl hover:bg-indigo-700 transition"
            >
              View Details
            </button>
          </div>
        </div>
      );
    })}

  </div>
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
