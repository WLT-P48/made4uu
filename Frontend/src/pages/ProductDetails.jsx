import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../components/CartContext";

import coffeeMug from "../assets/images/coffee-mug.jpg";
import steelBottle from "../assets/images/steel-bottle.jpg";
import giftCombo from "../assets/images/gift-combo.jpg";
import digitalMala from "../assets/images/digital-mala.png";
import woodenSofa from "../assets/images/wooden-sofa.jpg";
import cupDrink from "../assets/images/cup-drink.jpg";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const products = [
    {
      id: 1,
      name: "Aesthetic Coffee Mug",
      price: 299,
      oldPrice: 399,
      rating: 4.5,
      reviews: 120,
      img: coffeeMug,
      description:
        "Premium ceramic coffee mug perfect for home and office use.",
    },
    {
      id: 2,
      name: "Steel Water Bottle",
      price: 499,
      oldPrice: 699,
      rating: 4.3,
      reviews: 95,
      img: steelBottle,
      description:
        "Insulated stainless steel bottle keeps drinks hot & cold for hours.",
    },
    {
      id: 3,
      name: "Couple Gift Combo",
      price: 899,
      oldPrice: 1199,
      rating: 4.8,
      reviews: 210,
      img: giftCombo,
      description:
        "Perfect romantic gift combo for special occasions.",
    },
    {
      id: 4,
      name: "Digital Mala",
      price: 749,
      oldPrice: 999,
      rating: 4.4,
      reviews: 140,
      img: digitalMala,
      description:
        "Digital counter mala for meditation and spiritual counting.",
    },
    {
      id: 5,
      name: "Wooden Sofa Decor",
      price: 1499,
      oldPrice: 1899,
      rating: 4.6,
      reviews: 75,
      img: woodenSofa,
      description:
        "Elegant wooden sofa decor piece for modern home interiors.",
    },
    {
      id: 6,
      name: "Glass Cup Drink Jar",
      price: 349,
      oldPrice: 499,
      rating: 4.2,
      reviews: 88,
      img: cupDrink,
      description:
        "Stylish glass drink jar perfect for juices and cold beverages.",
    },
  ];

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return <h2 className="text-center mt-10">Product not found</h2>;
  }

  const discount = Math.round(
    ((product.oldPrice - product.price) / product.oldPrice) * 100
  );

  return (
    <div className="min-h-screen bg-gray-100 px-10 py-16">

      {/* MAIN PRODUCT SECTION */}
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl p-10 grid md:grid-cols-2 gap-12">

        {/* IMAGE */}
        <div className="overflow-hidden rounded-2xl">
          <img
            src={product.img}
            alt={product.name}
            className="w-full transition duration-500 hover:scale-105"
          />
          {/* ======================= */}
{/* MOBILE STICKY BUTTON */}
{/* ======================= */}

<div className="md:hidden fixed bottom-0 left-0 w-full bg-white shadow-2xl p-4 flex gap-3">

  <button
    onClick={() => {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
    }}
    className="w-1/2 bg-gradient-to-r from-pink-500 to-rose-500 
    text-white py-3 rounded-xl font-semibold"
  >
    ADD TO BAG
  </button>

  <button
    onClick={() => navigate("/checkout")}
    className="w-1/2 border-2 border-pink-500 text-pink-500 
    py-3 rounded-xl font-semibold"
  >
    BUY NOW
  </button>

</div>

        </div>

        {/* DETAILS */}
        <div>
          <h1 className="text-3xl font-bold mb-3">
            {product.name}
          </h1>

          <div className="text-yellow-500 mb-2">
            ⭐ {product.rating} ({product.reviews} reviews)
          </div>

          <div className="mb-4">
            <p className="text-3xl font-bold">
              ₹{product.price}
            </p>
            <div className="flex items-center gap-3">
              <p className="line-through text-gray-400">
                ₹{product.oldPrice}
              </p>
              <p className="text-green-600 font-semibold">
                {discount}% OFF
              </p>
            </div>
          </div>

          <p className="text-gray-600 mb-6">
            {product.description}
          </p>

          {/* ======================= */}
{/* PREMIUM ADD TO CART UI */}
{/* ======================= */}

<div className="mt-6 space-y-5">

  {/* Quantity Selector */}
  <div className="flex items-center justify-between bg-gray-100 p-4 rounded-2xl">
    <span className="font-semibold text-gray-700">
      Quantity
    </span>

    <div className="flex items-center gap-4">
      <button
        onClick={() =>
          setQuantity(quantity > 1 ? quantity - 1 : 1)
        }
        className="w-9 h-9 rounded-full bg-white shadow-md 
        hover:scale-110 transition font-bold"
      >
        −
      </button>

      <span className="text-lg font-semibold">
        {quantity}
      </span>

      <button
        onClick={() => setQuantity(quantity + 1)}
        className="w-9 h-9 rounded-full bg-white shadow-md 
        hover:scale-110 transition font-bold"
      >
        +
      </button>
    </div>
  </div>

  {/* Desktop Buttons */}
  <div className="hidden md:flex gap-4">

    <button
      onClick={() => {
        for (let i = 0; i < quantity; i++) {
          addToCart(product);
        }
      }}
      className="w-1/2 bg-gradient-to-r from-pink-500 to-rose-500 
      text-white py-3 rounded-xl font-semibold 
      hover:scale-105 transition duration-300 shadow-lg"
    >
      ADD TO BAG
    </button>

    <button
      onClick={() => navigate("/checkout")}
      className="w-1/2 border-2 border-pink-500 text-pink-500 
      py-3 rounded-xl font-semibold hover:bg-pink-50 transition"
    >
      BUY NOW
    </button>

  </div>

</div>

          {/* Extra Info */}
          <div className="mt-8 border-t pt-6 text-sm text-gray-600 space-y-2">
            <p>🚚 Free Delivery within 3-5 days</p>
            <p>🔄 7 Days Easy Return</p>
            <p>🔒 Secure Payment Options</p>
          </div>
        </div>
      </div>

      {/* SUGGESTED PRODUCTS */}
      <div className="max-w-6xl mx-auto mt-20">
        <h2 className="text-2xl font-bold mb-8">
          You may also like
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products
            .filter((item) => item.id !== product.id)
            .slice(0, 4)
            .map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/product/${item.id}`)}
                className="bg-white rounded-2xl shadow-md p-4 hover:shadow-2xl transition duration-300 cursor-pointer group"
              >
                <div className="overflow-hidden rounded-xl">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-40 object-cover transition duration-500 group-hover:scale-110"
                  />
                </div>

                <h3 className="mt-3 text-sm font-semibold group-hover:text-indigo-600 transition">
                  {item.name}
                </h3>

                <p className="text-lg font-bold mt-2">
                  ₹{item.price}
                </p>
              </div>
            ))}
        </div>
      </div>

    </div>
  );
};

export default ProductDetails;
