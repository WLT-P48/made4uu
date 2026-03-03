import { createContext, useContext, useState, useEffect, useCallback } from "react";
import cartService from "../services/cart.service";
import { getProfile } from "../services/auth.service";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  /* =============================
     FETCH USER
  ============================== */
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const userData = await getProfile();
          setUserId(userData._id);
        }
      } catch (error) {
        console.log("User not logged in");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  /* =============================
     FETCH CART
  ============================== */
  const fetchCart = async () => {
    if (!userId) return;

    try {
      const cartData = await cartService.getCart(userId);
      const items = cartData.items || [];

      setCart(
        items.map((item) => ({
          _id: item._id, // Include the unique cart item ID
          productId: item.productId?._id || item.productId,
          name: item.productId?.title || "Product",
          price: item.priceSnapshot,
          quantity: item.quantity,
          img: item.productId?.images?.[0]?.url || "/placeholder.jpg",
        }))
      );
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchCart();
    } else {
      const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
      setCart(guestCart);
    }
  }, [userId]);

  /* =============================
     ADD TO CART (Merge quantity for same product)
  ============================== */
  const addToCart = useCallback(
    async (product, quantity = 1) => {
      if (!userId) {
        // For guest cart, check if product exists and merge quantity
        const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
        const existingItemIndex = guestCart.findIndex(
          (item) => item.productId === product.id
        );

        if (existingItemIndex > -1) {
          // Product exists - merge quantity
          guestCart[existingItemIndex].quantity += quantity;
        } else {
          // New product - add as new item
          guestCart.push({
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity: quantity,
            img: product.img,
          });
        }

        localStorage.setItem("guestCart", JSON.stringify(guestCart));
        setCart(guestCart);
        return;
      }

      try {
        // Pass the quantity to the backend (backend will merge if product exists)
        await cartService.addToCart(userId, product.id, quantity);

        await fetchCart();
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    },
    [userId]
  );

  /* =============================
     REMOVE
  ============================== */
  const removeFromCart = useCallback(
    async (productId) => {
      if (!userId) {
        const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
        const filtered = guestCart.filter(
          (item) => item.productId !== productId
        );
        localStorage.setItem("guestCart", JSON.stringify(filtered));
        setCart(filtered);
        return;
      }

      try {
        await cartService.removeFromCart(userId, productId);
        await fetchCart();
      } catch (error) {
        console.error("Error removing from cart:", error);
      }
    },
    [userId]
  );

  /* =============================
     UPDATE QUANTITY
  ============================== */
  const updateQuantity = useCallback(
    async (productId, quantity) => {
      if (quantity < 1) return;

      if (!userId) {
        const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
        const updated = guestCart.map((item) =>
          item.productId === productId ? { ...item, quantity } : item
        );
        localStorage.setItem("guestCart", JSON.stringify(updated));
        setCart(updated);
        return;
      }

      try {
        // Use the new updateCartQuantity to set absolute quantity (not add)
        await cartService.updateCartQuantity(userId, productId, quantity);
        await fetchCart();
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    },
    [userId]
  );

  /* =============================
     CLEAR
  ============================== */
  const clearCartItems = useCallback(async () => {
    if (!userId) {
      localStorage.removeItem("guestCart");
      setCart([]);
      return;
    }

    try {
      await cartService.clearCart(userId);
      setCart([]);
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  }, [userId]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart: clearCartItems,
        cartCount,
        cartTotal,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);