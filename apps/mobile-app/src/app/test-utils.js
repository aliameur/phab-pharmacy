import React from 'react';
import { render } from '@testing-library/react-native';
import { CartContext } from './contexts/CartContext';

const customRender = (ui) => {
    const providerProps = {
        cartCount: 0,
        loadNumberCart: jest.fn(),
    };
  return render(
    <CartContext.Provider value={providerProps}>
      {ui}
    </CartContext.Provider>
  );
};

export * from '@testing-library/react-native';
export { customRender as render };