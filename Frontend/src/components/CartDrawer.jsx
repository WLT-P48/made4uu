import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";

const CartDrawer = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const { cart, cartTotal, removeFromCart, updateQuantity } = useCart();

  const handleCheckout = () => {
    setIsOpen(false);
    navigate("/cart");
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-6 flex justify-between items-center border-b">
          <h2 className="text-xl font-semibold">Your Cart</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-black text-xl"
          >
            ✕
          </button>
        </div>

        {/* Cart Items */}
        <div className="p-6 space-y-4 overflow-y-auto h-[70%]">
          {!cart || cart.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Your cart is empty</p>
          ) : (
            cart.map((item) => (
              <div
                key={item._id || item.productId}
                className="flex items-center gap-4 border-b pb-3"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <p className="font-semibold text-sm line-clamp-2">{item.name}</p>
                  <p className="text-gray-600">₹{item.price}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200"
                    >
                      −
                    </button>
                    <span className="text-sm font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.productId)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart && cart.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t bg-white">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold">Total</span>
              <span className="text-xl font-bold">₹{cartTotal}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-gradient-to-r from-gray-900 to-gray-700 text-white py-3 rounded-xl font-semibold hover:from-gray-800 hover:to-gray-600 transition-all"
            >
              View Cart & Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
