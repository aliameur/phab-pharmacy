import React from 'react';
import { render } from '@testing-library/react-native';
import App from './App';

describe('App Navigation', () => {
  it('renders App', async () => {
    render(<App />);
  });
  
});