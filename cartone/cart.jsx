import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../components/CartContext";
import { isAuthenticated } from "../services/auth.service";

const Cart = () => {
  const navigate = useNavigate();

  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount,
    loading,
    cartLoading,
  } = useCart();

  // Redirect if not logged in
  useEffect(() => {
    if (!isAuthenticated()) {
      window.location.href = '/login';
    }
  }, []);

  const [isClearing, setIsClearing] = useState(false);

  const increaseQuantity = (cartItemId, currentQty) => {
    if (!cartLoading) {
      console.log(`📦 Cart Page: Increasing cartItemId ${cartItemId} from ${currentQty} → ${currentQty + 1}`);
      updateQuantity(cartItemId, currentQty + 1);
    }
  };

  const decreaseQuantity = (cartItemId, currentQty) => {
    if (currentQty <= 1 || cartLoading) return;
    console.log(`📦 Cart Page: Decreasing cartItemId ${cartItemId} from ${currentQty} → ${currentQty - 1}`);
    updateQuantity(cartItemId, currentQty - 1);
  };

  const handleRemove = (cartItemId) => {
    removeFromCart(cartItemId);
  };

  const handleClearCart = async () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      setIsClearing(true);
      await clearCart();
      setIsClearing(false);
    }
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const handleContinueShopping = () => {
    navigate("/products");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Your cart is empty
            </h2>

            <button
              onClick={handleContinueShopping}
              className="bg-gray-900 text-white px-8 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.productId}
                  className="bg-white rounded-2xl shadow-md p-6 flex gap-4 hover:shadow-lg transition-shadow"
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-28 h-28 object-cover rounded-xl flex-shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold pr-4 line-clamp-2">
                        {item.name}
                      </h3>

                      <button
                        onClick={() => handleRemove(item.cartItemId || item._id)}
                        className="text-red-500 hover:text-red-700 font-medium text-sm p-1 -m-1 rounded transition-colors"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="flex items-center justify-between bg-gray-100 p-4 rounded-2xl mb-4">
                      <span className="font-semibold text-gray-700 text-sm">
                        Quantity
                      </span>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            decreaseQuantity(item.cartItemId || item._id, item.quantity)
                          }
                          disabled={cartLoading || item.quantity <= 1}
                          className="w-10 h-10 rounded-full bg-white shadow-md hover:shadow-lg active:scale-95 transition-all font-bold text-gray-800 border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center"
                        >
                          {cartLoading ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-400 border-t-gray-900"></div>
                          ) : (
                            "−"
                          )}
                        </button>

                        <span className="text-xl font-bold min-w-[2rem] text-center">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            increaseQuantity(item.cartItemId || item._id, item.quantity)
                          }
                          disabled={cartLoading}
                          className="w-10 h-10 rounded-full bg-white shadow-md hover:shadow-lg active:scale-95 transition-all font-bold text-gray-800 border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center"
                        >
                          {cartLoading ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-400 border-t-gray-900"></div>
                          ) : (
                            "+"
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-900">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">
                        ₹{item.price.toLocaleString()} x {item.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={handleClearCart}
                disabled={isClearing}
                className="text-red-500 hover:text-red-700 font-semibold text-sm py-2 px-4 rounded-lg border border-red-200 hover:bg-red-50 transition-all disabled:opacity-50"
              >
                {isClearing ? "Clearing..." : "Clear All Items"}
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 h-fit sticky top-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-700">
                    Subtotal ({cartCount} items)
                  </span>
                  <span className="font-semibold">
                    ₹{cartTotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between text-green-600 font-semibold">
                  <span>Shipping</span>
                  <span>FREE</span>
                </div>
              </div>

              <div className="border-t pt-4 mb-6 flex justify-between text-2xl font-bold text-gray-900">
                <span>Total</span>
                <span>₹{cartTotal.toLocaleString()}</span>
              </div>

              <button
                onClick={handleCheckout}
                disabled={cartLoading}
                className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:from-gray-800 hover:to-gray-700 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-4"
              >
                {cartLoading ? "Processing..." : "Proceed to Checkout →"}
              </button>

              <button
                onClick={handleContinueShopping}
                className="w-full bg-white border-2 border-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all"
              >
                ← Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;