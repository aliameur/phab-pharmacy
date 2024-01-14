import { fireEvent } from '@testing-library/react-native';
import React from 'react';

import { render } from '../../test-utils';
import ShopScreen from '../ShopScreen';
import searchSubmit from '../ShopScreen';

describe('ShopScreen', () => {
  it('renders the shop screen with a search input and buttons', () => {
    const { getByPlaceholderText, getByText, getByTestId } = render(
      <ShopScreen navigation={{ setOptions: () => {} }} />,
    );

    // Check if important elements are rendered
    expect(getByPlaceholderText('What are you looking for?')).toBeTruthy();
    expect(getByText('Your One-Stop Online Wellness Shop')).toBeTruthy();
    expect(
      getByText(
        'Find all your healthcare needs with ease. Just type and search below.',
      ),
    ).toBeTruthy();
    expect(getByTestId('search-button')).toBeTruthy();
    expect(getByTestId('chat-button')).toBeTruthy();
    expect(getByTestId('cart-button')).toBeTruthy();
  });

  it('updates the search text state when typing in the search input', () => {
    const { getByPlaceholderText } = render(
      <ShopScreen navigation={{ setOptions: () => {} }} />,
    );
    const searchInput = getByPlaceholderText('What are you looking for?');

    fireEvent.changeText(searchInput, 'Test Product');

    expect(searchInput.props.value).toBe('Test Product');
  });
  it('calls searchSubmit when the search button is pressed', () => {
    const navigationMock = {
      setOptions: jest.fn(),
      navigate: jest.fn(),
    };
    const { getByTestId } = render(<ShopScreen navigation={navigationMock} />);
    const searchButton = getByTestId('search-button');

    fireEvent.press(searchButton);

    expect(navigationMock.navigate).toHaveBeenCalledWith('Search', {
      search: '',
    });
  });

  it('navigates to the Chat screen when the chat button is pressed', () => {
    const navigationMock = {
      setOptions: jest.fn(),
      navigate: jest.fn(),
    };
    const { getByTestId } = render(<ShopScreen navigation={navigationMock} />);
    const chatButton = getByTestId('chat-button');

    fireEvent.press(chatButton);

    expect(navigationMock.navigate).toHaveBeenCalledWith('Chat');
  });
});
