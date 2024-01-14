import React, { createContext, useState } from 'react';

import { getCartItemNumber, getCartItems } from '../scripts/CartScripts';
import { getShippingAddress } from '../scripts/ShopScript';

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [cartData, setCartData] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [shipping_addresses, setShipping] = useState([]);
  
  const loadNumberCart = async () => {
    count = await getCartItemNumber();
    setCartCount(count);
  };

  const loadCartData = async () => {
    const items = await getCartItems();
    const sortedData = items[0].sort((a, b) => {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    });
    setCartData(sortedData);
    setCartTotal(items[1]);
  }
  
  const loadShippingAddress = async () => {
    const shipping = await getShippingAddress();
    setShipping(shipping);
  }

  return (
    <ShopContext.Provider value={{ cartCount, cartData, cartTotal, shipping_addresses, loadNumberCart, loadCartData, loadShippingAddress }}>
      {children}
    </ShopContext.Provider>
  );
};
