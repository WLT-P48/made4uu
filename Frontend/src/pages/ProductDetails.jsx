import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../components/CartContext";
import productService from "../services/product.service";
import { HeartIcon as SolidHeart } from "@heroicons/react/24/solid";
import { HeartIcon as OutlineHeart } from "@heroicons/react/24/outline";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [suggestedProducts, setSuggestedProducts] = useState([]);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const result = await productService.getById(id);

      if (result.success) {
        const transformedProduct = {
          id: result.data._id,
          name: result.data.title,
          price: result.data.discountPrice && result.data.discountPrice > 0
            ? result.data.price - result.data.discountPrice
            : result.data.price,
          oldPrice: result.data.price,
          rating: result.data.rating || 0,
          reviews: result.data.reviewCount || 0,
          img: result.data.images?.length > 0
            ? result.data.images[0].url
            : "/placeholder.jpg",
          description: result.data.description,
          stock: result.data.stock || 0,
        };

        setProduct(transformedProduct);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("Failed to fetch product details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (product) fetchSuggestedProducts();
  }, [product]);

  const fetchSuggestedProducts = async () => {
    try {
      const result = await productService.getAll({ limit: 6 });
      if (result.success) {
        const transformed = (result.data.products || [])
          .filter((p) => p._id !== id)
          .slice(0, 4)
          .map((p) => ({
            id: p._id,
            name: p.title,
            price: p.discountPrice && p.discountPrice > 0
              ? p.price - p.discountPrice
              : p.price,
            oldPrice: p.price,
            img: p.images?.length > 0
              ? p.images[0].url
              : "/placeholder.jpg",
          }));
        setSuggestedProducts(transformed);
      }
    } catch (err) {
      console.error("Failed to fetch suggested products");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg font-semibold">
        Loading...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex justify-center items-center min-h-screen text-xl font-semibold">
        Product not found
      </div>
    );
  }

  const discount = product.oldPrice > product.price
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10">

        {/* MAIN SECTION */}
        <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-10 grid lg:grid-cols-2 gap-10">

          {/* IMAGE SECTION */}
          <div className="relative overflow-hidden rounded-2xl group">
            <img
              src={product.img}
              alt={product.name}
              className="w-full h-72 sm:h-96 object-cover transition duration-500 group-hover:scale-105"
            />
            {discount > 0 && (
              <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">
                {discount}% OFF
              </div>
            )}
            <div
              onClick={() => setLiked(!liked)}
              className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-md cursor-pointer hover:scale-110 transition-transform"
            >
              {liked ? (
                <SolidHeart className="h-6 w-6 text-red-500" />
              ) : (
                <OutlineHeart className="h-6 w-6 text-gray-600 hover:text-red-500 transition-colors" />
              )}
            </div>
          </div>

          {/* DETAILS */}
          <div className="flex flex-col">
            <h1 className="text-2xl sm:text-3xl font-bold mb-3">
              {product.name}
            </h1>

            <div className="text-yellow-500 mb-3 text-sm sm:text-base">
              ⭐ {product.rating} ({product.reviews} reviews)
            </div>

            <div className="mb-6">
              <p className="text-2xl sm:text-3xl font-bold">
                ₹{product.price}
              </p>
              {discount > 0 && (
                <p className="text-gray-400 line-through mt-1">
                  ₹{product.oldPrice}
                </p>
              )}
            </div>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-8">
              {product.description}
            </p>

            {/* STOCK INFO */}
            <div className="mb-4">
              {product.stock > 0 ? (
                product.stock < 20 ? (
                  <span className="text-orange-600 font-bold text-sm bg-orange-100 px-3 py-1 rounded-full animate-pulse">
                    🔥 Hurry! Only {product.stock} left
                  </span>
                ) : (
                  <span className="text-green-600 font-semibold text-sm">
                    ✓ In Stock ({product.stock} available)
                  </span>
                )
              ) : (
                <span className="text-red-500 font-semibold text-sm">
                  ✗ Out of Stock
                </span>
              )}
            </div>

            {/* QUANTITY */}
            <div className="flex items-center justify-between bg-gray-100 p-4 rounded-2xl mb-6">
              <span className="font-semibold text-gray-700">Quantity</span>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                  disabled={product.stock === 0}
                  className="w-9 h-9 rounded-full bg-white shadow-md hover:scale-110 transition font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  −
                </button>
                <span className="text-lg font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={product.stock === 0 || quantity >= product.stock}
                  className="w-9 h-9 rounded-full bg-white shadow-md hover:scale-110 transition font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  +
                </button>
              </div>
            </div>

            {/* ADD TO BAG */}
            <button
              onClick={() => {
                if (product.stock === 0) {
                  alert("This product is out of stock");
                  return;
                }
                if (quantity > product.stock) {
                  alert(`Only ${product.stock} items available in stock`);
                  return;
                }
                addToCart(product, quantity);
              }}
              disabled={product.stock === 0}
              className="w-full bg-gradient-to-r from-gray-900 to-gray-700 text-white py-3 rounded-xl font-semibold hover:from-gray-800 hover:to-gray-600 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </button>

            {/* Extra Info */}
            <div className="mt-8 border-t pt-6 text-sm text-gray-600 space-y-2">
              <p>🚚 Free Delivery within 3-5 days</p>
              <p>🔄 7 Days Easy Return</p>
              <p>🔒 Secure Payment Options</p>
            </div>
          </div>
        </div>

        {/* SUGGESTED PRODUCTS */}
        <div className="mt-20">
          <h2 className="text-xl sm:text-2xl font-bold mb-8">
            You may also like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {suggestedProducts.map((item) => {
              const itemDiscount = item.oldPrice > item.price
                ? Math.round(((item.oldPrice - item.price) / item.oldPrice) * 100)
                : 0;
              return (
                <div
                  key={item.id}
                  onClick={() => navigate(`/product/${item.id}`)}
                  className="bg-white rounded-2xl shadow-md p-4 hover:shadow-xl transition cursor-pointer group"
                >
                  <div className="relative overflow-hidden rounded-xl">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-32 sm:h-40 object-cover transition duration-500 group-hover:scale-110"
                    />
                    {itemDiscount > 0 && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        {itemDiscount}% OFF
                      </div>
                    )}
                  </div>
                  <h3 className="mt-3 text-sm font-semibold group-hover:text-indigo-600 transition line-clamp-2">
                    {item.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-lg font-bold">₹{item.price}</p>
                    {item.oldPrice > item.price && (
                      <p className="text-gray-400 line-through text-sm">
                        ₹{item.oldPrice}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
