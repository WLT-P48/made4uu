import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../components/CartContext";

const Cart = () => {
  const navigate = useNavigate();

  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    clearCart,
    cartTotal,
    cartCount,
    loading 
  } = useCart();

  const [isClearing, setIsClearing] = useState(false);

  /* Quantity Increase */
  const increaseQuantity = (productId, currentQty) => {
    updateQuantity(productId, currentQty + 1);
  };

  /* Quantity Decrease */
  const decreaseQuantity = (productId, currentQty) => {
    if (currentQty <= 1) return;
    updateQuantity(productId, currentQty - 1);
  };

  const handleRemove = (productId) => {
    removeFromCart(productId);
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

        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Shopping Cart
        </h1>

        {cart.length === 0 ? (

          <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Your cart is empty
            </h2>

            <button
              onClick={handleContinueShopping}
              className="bg-gray-900 text-white px-8 py-3 rounded-xl font-semibold"
            >
              Continue Shopping
            </button>
          </div>

        ) : (

          <div className="grid lg:grid-cols-3 gap-8">

            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">

              {cart.map((item) => (

                <div
                  key={item.productId}
                  className="bg-white rounded-2xl shadow-md p-6 flex gap-4"
                >

                  {/* Product Image */}
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-28 h-28 object-cover rounded-xl"
                  />

                  {/* Product Details */}
                  <div className="flex-1">

                    <div className="flex justify-between">
                      <h3 className="text-lg font-semibold">
                        {item.name}
                      </h3>

                      <button
                        onClick={() => handleRemove(item.productId)}
                        className="text-red-500"
                      >
                        Remove
                      </button>
                    </div>

                    {/* Quantity Section */}
                    <div className="flex items-center justify-between bg-gray-100 p-4 rounded-2xl mt-4">

                      <span className="font-semibold text-gray-700">
                        Quantity
                      </span>

                      <div className="flex items-center gap-4">

                        <button
                          onClick={() =>
                            decreaseQuantity(item.productId, item.quantity)
                          }
                          disabled={item.quantity <= 1}
                          className="w-9 h-9 rounded-full bg-white shadow-md hover:scale-110 transition font-bold disabled:opacity-50"
                        >
                          −
                        </button>

                        <span className="text-lg font-semibold">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            increaseQuantity(item.productId, item.quantity)
                          }
                          className="w-9 h-9 rounded-full bg-white shadow-md hover:scale-110 transition font-bold"
                        >
                          +
                        </button>

                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-right mt-4">
                      <p className="text-xl font-bold">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>

                  </div>
                </div>

              ))}

              <button
                onClick={handleClearCart}
                disabled={isClearing}
                className="text-red-500 font-medium"
              >
                {isClearing ? "Clearing..." : "Clear Cart"}
              </button>

            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-6 h-fit">

              <h2 className="text-xl font-bold mb-6">
                Order Summary
              </h2>

              <div className="flex justify-between mb-3">
                <span>Items ({cartCount})</span>
                <span>₹{cartTotal}</span>
              </div>

              <div className="flex justify-between mb-4">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>

              <div className="border-t pt-3 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>₹{cartTotal}</span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-gray-900 text-white py-3 rounded-xl mt-6"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={handleContinueShopping}
                className="w-full mt-3 bg-gray-100 py-3 rounded-xl"
              >
                Continue Shopping
              </button>

            </div>

          </div>

        )}

      </div>
    </div>
  );
};

export default Cart;