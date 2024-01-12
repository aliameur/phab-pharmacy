import React, { createContext, useState } from 'react';
import { getCartItemNumber, getCartItems } from '../scripts/CartScripts';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [cartData, setCartData] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  
  const loadNumberCart = async () => {
    count = await getCartItemNumber();
    setCartCount(count);
  }

  const loadCartData = async () => {
    const items = await getCartItems();
    setCartData(items[0]);
    setCartTotal(items[1]);
  }

  return (
    <CartContext.Provider value={{ cartCount, cartData, cartTotal, loadNumberCart, loadCartData }}>
      {children}
    </CartContext.Provider>
  );
};