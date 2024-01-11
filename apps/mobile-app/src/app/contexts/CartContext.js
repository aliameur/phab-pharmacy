import React, { createContext, useState } from 'react';
import { getCartItemNumber } from '../scripts/CartScripts';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  
  const loadNumberCart = async () => {
    count = await getCartItemNumber();
    setCartCount(count);
  }

  return (
    <CartContext.Provider value={{ cartCount, loadNumberCart }}>
      {children}
    </CartContext.Provider>
  );
};