import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/product/ProductCard";

import mug from "../assets/images/coffee-mug.jpg";
import bottle from "../assets/images/steel-bottle.jpg";
import gift from "../assets/images/gift-combo.jpg";
import mala from "../assets/images/digital-mala.png";
import clock from "../assets/images/Luxury-Wall-Clock.jpg";
import vase from "../assets/images/Ceramic-Flower-Vase.jpg";
import plant from "../assets/images/Decorative-Plant-Pot.jpg";
import lamp from "../assets/images/Modern-Table-Lamp.jpg";
import gymbag from "../assets/images/Duffel-Gymbag.jpg";
import smartwatch from "../assets/images/Smart-Watch.jpg";
import earbuds from "../assets/images/wireless-earbuds.jpg";
import headphones from "../assets/images/Head-phones.jpg";
import laptop from "../assets/images/Laptop.jpg";
import speaker from "../assets/images/smart-speaker.jpg";

const Products = () => {
const navigate = useNavigate();

const [products, setProducts] = useState([]);
const [selectedCategory, setSelectedCategory] = useState("All");
const [likedProducts, setLikedProducts] = useState([]);
const [searchQuery, setSearchQuery] = useState("");
const [showDropdown, setShowDropdown] = useState(false);

const productData = [
{
id: 1,
name: "Aesthetic Coffee Mug",
img: mug,
price: 299,
oldPrice: 399,
rating: 4.5,
reviews: 120,
category: "Mugs"
},
{
id: 2,
name: "Steel Water Bottle",
img: bottle,
price: 499,
oldPrice: 699,
rating: 4.3,
reviews: 95,
category: "Bottles"
},
{
id: 3,
name: "Couple Gift Combo",
img: gift,
price: 899,
oldPrice: 1199,
rating: 4.8,
reviews: 210,
category: "Gift Combos"
},
{
id: 4,
name: "Digital Mala",
img: mala,
price: 749,
oldPrice: 999,
rating: 4.4,
reviews: 140,
category: "Trending"
},
{
id: 5,
name: "Luxury Wall Clock",
img: clock,
price: 1299,
oldPrice: 1599,
rating: 4.7,
reviews: 88,
category: "Trending"
},
{
id: 6,
name: "Ceramic Flower Vase",
img: vase,
price: 699,
oldPrice: 899,
rating: 4.5,
reviews: 110,
category: "Trending"
},
{
id: 7,
name: "Decorative Plant Pot",
img: plant,
price: 499,
oldPrice: 699,
rating: 4.4,
reviews: 72,
category: "Trending"
},
{
id: 8,
name: "Modern Table Lamp",
img: lamp,
price: 699,
oldPrice: 899,
rating: 4.4,
reviews: 72,
category: "Trending"
},
{
id: 9,
name: "Duffel Gym Bag",
img: gymbag,
price: 1499,
oldPrice: 1999,
rating: 4.4,
reviews: 64,
description: "Spacious duffel bag perfect for gym and travel.",
stock: 10
},

{
id: 10,
name: "Smart Watch",
img: smartwatch,
price: 2999,
oldPrice: 3999,
rating: 4.6,
reviews: 120,
description: "Smart fitness watch with heart rate monitoring.",
stock: 15
},

{
id: 11,
name: "Wireless Earbuds",
img: earbuds,
price: 1999,
oldPrice: 2599,
rating: 4.5,
reviews: 98,
description: "High quality wireless earbuds with noise cancellation.",
stock: 20
},
{
  id: 12,
  name: "Wireless Headphones",
  img: headphones,
  price: 3499,
  oldPrice: 4299,
  rating: 4.5,
  reviews: 85,
  description: "Premium wireless headphones with deep bass.",
  stock: 14
},

{
  id: 13,
  name: "Laptop",
  img: laptop,
  price: 59999,
  oldPrice: 65999,
  rating: 4.6,
  reviews: 110,
  description: "High performance laptop for work and study.",
  stock: 6
},

{
  id: 14,
  name: "Smart Speaker",
  img: speaker,
  price: 2999,
  oldPrice: 3499,
  rating: 4.4,
  reviews: 72,
  description: "Voice assistant smart speaker with powerful sound.",
  stock: 12
}

];

useEffect(() => {
setProducts(productData);
}, []);

const toggleLike = (id) => {
if (likedProducts.includes(id)) {
setLikedProducts(likedProducts.filter((item) => item !== id));
} else {
setLikedProducts([...likedProducts, id]);
}
};

const filteredProducts = products.filter((product) => {
const matchesSearch = product.name
.toLowerCase()
.includes(searchQuery.toLowerCase());


const matchesCategory =
  selectedCategory === "All" || product.category === selectedCategory;

return matchesSearch && matchesCategory;


});

return ( <div className="min-h-screen bg-gray-100 px-4 py-8 md:px-16 md:py-16 lg:px-20 lg:py-20">


  {/* SEARCH BAR */}
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
        className="w-full pl-14 pr-12 py-4 rounded-full bg-gray-50 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
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
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
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
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
    {filteredProducts.map((product) => (
      <ProductCard
        key={product.id}
        product={product}
        likedProducts={likedProducts}
        toggleLike={toggleLike}
      />
    ))}
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
