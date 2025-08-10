// src/context/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage on first render
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  function addToCart(item) {
    setCartItems((prev) => {
      const existing = prev.find(
        (p) =>
          p.id === item.id && p.size === item.size && p.color === item.color
      );
      if (existing) {
        return prev.map((p) =>
          p.id === item.id && p.size === item.size && p.color === item.color
            ? { ...p, quantity: p.quantity + item.quantity }
            : p
        );
      }
      return [...prev, item];
    });
  }

  function removeFromCart(itemId, size, color) {
    setCartItems((prev) =>
      prev.filter(
        (p) => !(p.id === itemId && p.size === size && p.color === color)
      )
    );
  }

  function getTotalQuantity() {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  function getSubtotal() {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        getTotalQuantity,
        getSubtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  return useContext(CartContext);
}
