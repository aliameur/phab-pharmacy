import { render } from '@testing-library/react-native';
import React from 'react';

import App from './App';

describe('App Navigation', () => {
  it('renders App', async () => {
    render(<App />);
  });
});
