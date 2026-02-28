import { useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";
import { HeartIcon as SolidHeart } from "@heroicons/react/24/solid";
import { HeartIcon as OutlineHeart } from "@heroicons/react/24/outline";

const ProductCard = ({ product, likedProducts, toggleLike }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // ✅ Safe ID handling (fix)
  const productId = product.id || product._id;

  const discount =
    product.oldPrice > product.price
      ? Math.round(
          ((product.oldPrice - product.price) / product.oldPrice) * 100
        )
      : 0;

  const handleCardClick = () => {
    navigate(`/product/${productId}`);
  };

  const handleLikeClick = (e) => {
    e.stopPropagation();
    toggleLike(productId);
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    try {
      await addToCart({
        id: productId,
        name: product.name || product.title,
        price: product.price,
        img: product.img || product.images?.[0]?.url
      });
      alert("Product added to cart successfully!");
    } catch (error) {
      alert("Failed to add product to cart. Please try again.");
    }
  };

  return (
    <div
      className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-gray-100"
      onClick={handleCardClick}
    >
      <div className="relative overflow-hidden rounded-t-2xl">
        <img
          src={product.img || product.images?.[0]?.url}
          alt={product.name || product.title}
          className="w-full h-48 object-cover hover:scale-110 transition duration-500"
        />

        {discount > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {discount}% OFF
          </div>
        )}

        <div
          onClick={handleLikeClick}
          className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md cursor-pointer hover:scale-110 transition-transform"
        >
          {likedProducts.includes(productId) ? (
            <SolidHeart className="h-5 w-5 text-red-500" />
          ) : (
            <OutlineHeart className="h-5 w-5 text-gray-600 hover:text-red-500 transition-colors" />
          )}
        </div>

        <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <span className="bg-white text-gray-800 px-4 py-2 rounded-full text-sm font-medium shadow-lg">
            Quick View
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-800 cursor-pointer hover:text-indigo-600 line-clamp-2 mb-2">
          {product.name || product.title}
        </h3>

        <div className="flex items-center gap-1 text-yellow-500 text-sm mb-3">
          <span className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={
                  i < Math.floor(product.rating || 0)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }
              >
                ★
              </span>
            ))}
          </span>
          <span className="text-gray-500 text-xs ml-1">
            ({product.reviews || 0} reviews)
          </span>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <p className="text-xl font-bold text-gray-900">
            ₹{product.price}
          </p>
          {product.oldPrice > product.price && (
            <p className="text-gray-400 line-through text-sm">
              ₹{product.oldPrice}
            </p>
          )}
        </div>

        <div className="mt-2">
          <button
            onClick={handleAddToCart}
            className="w-full bg-gradient-to-r from-gray-900 to-gray-700 text-white text-sm font-medium py-2.5 rounded-xl hover:from-gray-800 hover:to-gray-600 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;