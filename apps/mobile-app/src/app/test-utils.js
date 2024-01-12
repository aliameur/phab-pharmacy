import React from 'react';
import { render } from '@testing-library/react-native';
import { ShopContext } from './contexts/ShopContext';

const customRender = (ui) => {
    const providerProps = {
        cartCount: 0,
        loadNumberCart: jest.fn(),
    };
  return render(
    <ShopContext.Provider value={providerProps}>
      {ui}
    </ShopContext.Provider>
  );
};

export * from '@testing-library/react-native';
export { customRender as render };