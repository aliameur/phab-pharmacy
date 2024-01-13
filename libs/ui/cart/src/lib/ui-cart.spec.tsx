import { render } from '@testing-library/react';

import UiCart from './ui-cart';

describe('UiCart', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiCart />);
    expect(baseElement).toBeTruthy();
  });
});
