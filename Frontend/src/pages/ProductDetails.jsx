import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../components/CartContext";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

import coffeeMug from "../assets/images/coffee-mug.jpg";
import steelBottle from "../assets/images/steel-bottle.jpg";
import giftCombo from "../assets/images/gift-combo.jpg";
import digitalMala from "../assets/images/digital-mala.png";
import woodenSofa from "../assets/images/wooden-sofa.jpg";
import luxuryClock from "../assets/images/Luxury-Wall-Clock.jpg";
import ceramicVase from "../assets/images/Ceramic-Flower-Vase.jpg";
import decorativePot from "../assets/images/Decorative-Plant-Pot.jpg";
import modermlamp from "../assets/images/Modern-Table-Lamp.jpg";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const products = [
    {
      id: 1,
      title: "Aesthetic Coffee Mug",
      description: "Premium ceramic coffee mug perfect for home and office use.",
      price: 299,
      discountPrice: 399,
      images: [coffeeMug],
      stock: 5,
      attributes: { category: "Mugs" },
      rating: 4.5,
      reviewCount: 120,
      isActive: true,
    },
    {
      id: 2,
      title: "Steel Water Bottle",
      description: "Insulated stainless steel bottle keeps drinks hot & cold for hours.",
      price: 499,
      discountPrice: 699,
      images: [steelBottle],
      stock: 10,
      rating: 4.3,
      reviewCount: 95,
      isActive: true,
    },
    {
      id: 3,
      title: "Couple Gift Combo",
      description: "Perfect romantic gift combo for special occasions.",
      price: 899,
      discountPrice: 1199,
      images: [giftCombo],
      stock: 7,
      rating: 4.8,
      reviewCount: 210,
      isActive: true,
    },
    {
      id: 4,
      title: "Digital Mala",
      description: "Digital counter mala for meditation and spiritual counting.",
      price: 749,
      discountPrice: 999,
      images: [digitalMala],
      stock: 8,
      rating: 4.4,
      reviewCount: 140,
      isActive: true,
    },
    {
      id: 5,
      title: "Wooden Sofa Decor",
      description: "Elegant wooden sofa decor piece for modern home interiors.",
      price: 1499,
      discountPrice: 1899,
      images: [woodenSofa],
      stock: 6,
      rating: 4.6,
      reviewCount: 75,
      isActive: true,
    },
   
    {
  id: 6,
  title: "Ceramic Flower Vase",
  description: "Elegant ceramic flower vase for home decoration.",
  price: 699,
  discountPrice: 899,
  images: [ceramicVase],
  stock: 10,
  attributes: { category: "Gift Combos" },
  rating: 4.5,
  reviewCount: 110,
  isActive: true,
},
{
  id: 7,
  title: "Decorative Plant Pot",
  description: "Stylish decorative plant pot for modern interiors.",
  price: 499,
  discountPrice: 699,
  images: [decorativePot],
  stock: 8,
  attributes: { category: "Trending" },
  rating: 4.4,
  reviewCount: 72,
  isActive: true,
},
{
  id: 8,
  title: "Modern Table Lamp",
  description: "Minimal design modern table lamp for bedroom and living area.",
  price: 699,
  discountPrice: 999,
  images: [modermlamp],
  stock: 6,
  attributes: { category: "Gift Combos" },
  rating: 4.4,
  reviewCount: 72,
  isActive: true,
},
{
  id: 9,
  title: "Aesthetic Coffee Mug",
  description: "Premium ceramic coffee mug perfect for home use.",
  price: 299,
  discountPrice: 399,
  images: [coffeeMug],
  stock: 12,
  attributes: { category: "All" },
  rating: 4.5,
  reviewCount: 120,
  isActive: true,
},
{
  id: 10,
  title: "Steel Water Bottle",
  description: "Insulated stainless steel water bottle.",
  price: 499,
  discountPrice: 699,
  images: [steelBottle],
  stock: 10,
  attributes: { category: "Bottles" },
  rating: 4.3,
  reviewCount: 95,
  isActive: true,
},
{
  id: 11,
  title: "Couple Gift Combo",
  description: "Romantic gift combo for special occasions.",
  price: 899,
  discountPrice: 1199,
  images: [giftCombo],
  stock: 7,
  attributes: { category: "Gift Combos" },
  rating: 4.8,
  reviewCount: 210,
  isActive: true,
},
{
  id: 12,
  title: "Digital Mala",
  description: "Digital counter mala for meditation and prayer.",
  price: 749,
  discountPrice: 999,
  images: [digitalMala],
  stock: 8,
  attributes: { category: "All" },
  rating: 4.4,
  reviewCount: 140,
  isActive: true,
},
{
  id: 13,
  title: "Luxury Wall Clock",
  description: "Premium luxury wall clock for home decor.",
  price: 1299,
  discountPrice: 1599,
  images: [luxuryClock],
  stock: 5,
  attributes: { category: "Trending" },
  rating: 4.7,
  reviewCount: 88,
  isActive: true,
},
{
  id: 14,
  title: "Ceramic Flower Vase",
  description: "Elegant ceramic vase for modern homes.",
  price: 699,
  discountPrice: 899,
  images: [ceramicVase],
  stock: 9,
  attributes: { category: "All" },
  rating: 4.5,
  reviewCount: 110,
  isActive: true,
},
{
  id: 15,
  title: "Decorative Plant Pot",
  description: "Indoor decorative plant pot.",
  price: 499,
  discountPrice: 699,
  images: [decorativePot],
  stock: 8,
  attributes: { category: "Bottles" },
  rating: 4.4,
  reviewCount: 72,
  isActive: true,
},
{
  id: 16,
  title: "Modern Table Lamp",
  description: "Modern bedside lamp for stylish lighting.",
  price: 699,
  discountPrice: 999,
  images: [modermlamp],
  stock: 6,
  attributes: { category: "Trending" },
  rating: 4.4,
  reviewCount: 72,
  isActive: true,
}
    ];
        
 

  const product = products.find((p) => p.id === Number(id));
  if (!product) return <h2 className="text-center mt-10">Not Found</h2>;

  const discount = Math.round(
    ((product.discountPrice - product.price) / product.discountPrice) * 100
  );

  return (
    <div className="min-h-screen bg-gray-100 px-6 md:px-12 py-16">

      {/* MAIN PRODUCT SECTION */}
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm p-10 grid md:grid-cols-2 gap-14">
        
        <div className="overflow-hidden rounded-xl">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full hover:scale-105 transition duration-500"
          />
        </div>

        <div>
          <h1 className="text-3xl font-semibold text-gray-900">
            {product.title}
          </h1>

          <div className="mt-4 inline-flex items-center gap-2 border px-3 py-1 rounded-md">
            <span className="text-green-600 text-2xl font-bold">
              {product.rating}
            </span>
            <span className="text-green-600 text-2xl font-bold">★</span>
            <span className="text-gray-600 text-lg">
              {product.reviewCount} Ratings
            </span>
          </div>

          <hr className="my-6" />

          <div className="flex items-center gap-4">
            <span className="text-4xl font-bold">
              ₹{product.price}
            </span>
            <span className="line-through text-xl text-gray-400">
              ₹{product.discountPrice}
            </span>
            <span className="text-orange-500 text-xl font-semibold">
              ({discount}% OFF)
            </span>
          </div>

          <p className="text-green-600 mt-2">
            inclusive of all taxes
          </p>

          <p className="mt-6 text-gray-700 text-lg">
            {product.description}
          </p>

          {/* Quantity */}
          <div className="mt-8">
            <p className="font-semibold text-lg mb-4">Quantity</p>
            <div className="flex items-center gap-6 bg-gray-100 px-6 py-4 rounded-xl w-fit">
              <button
                onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                className="w-10 h-10 bg-white rounded-full border"
              >
                −
              </button>

              <span className="text-lg font-semibold">
                {quantity}
              </span>

              <button
                onClick={() =>
                  setQuantity(quantity < product.stock ? quantity + 1 : quantity)
                }
                className="w-10 h-10 bg-white rounded-full border"
              >
                +
              </button>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={() => addToCart(product)}
              className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-lg transition"
            >
              <ShoppingBagIcon className="w-5 h-5" />
              ADD TO BAG
            </button>
          </div>
        </div>
      </div>

    {/* ========================= */}
{/* SUGGESTED PRODUCTS */}
{/* ========================= */}

<div className="max-w-[2000px] mx-auto mt-24 px-2">
  <h2 className="text-3xl font-semibold mb-10">
    You may also like
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">

    {products
      .filter((item) => item.id !== product.id)
.slice(0, 8)
.map((item) => {
        const discount = Math.round(
          ((item.discountPrice - item.price) / item.discountPrice) * 100
        );

        return (
          <div
            key={item.id}
            onClick={() => navigate(`/product/${item.id}`)}
            className="bg-white rounded-3xl shadow-lg p-6 cursor-pointer transition duration-300"
          >

            {/* IMAGE */}
            <div className="overflow-hidden rounded-2xl">
              <img
                src={item.images[0]}
                alt={item.title}
                className="w-full h-60 object-cover rounded-2xl hover:scale-110 transition duration-500"
              />
            </div>

            {/* TITLE */}
            <h3 className="mt-4 text-2xl font-bold text-gray-900">
              {item.title}
            </h3>

            {/* PRICE */}
            <div className="mt-3">
              <p className="text-2xl font-bold">
                ₹{item.price}
              </p>

              <div className="flex items-center gap-2">
                <p className="text-black-400 line-through text-2xl">
                  ₹{item.discountPrice}
                </p>
                <p className="text-orange-500 text-2xl font-semibold">
                  {discount}% OFF
                </p>
              </div>
            </div>

          </div>
        );
      })}

  </div>
</div>

    </div>
  );
};

export default ProductDetails; 