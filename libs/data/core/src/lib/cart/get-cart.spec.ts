import { getCart } from './get-cart';

describe('getCart', () => {
  const mockRequestFn = jest.fn();
  const getCartFn = getCart(mockRequestFn);

  beforeEach(() => {
    mockRequestFn.mockClear();
  });

  it('fetches cart successfully', async () => {
    mockRequestFn.mockResolvedValue({ body: { cart: { id: 'cart_123' } } });

    const result = await getCartFn('cart_123');

    expect(mockRequestFn).toHaveBeenCalledWith({
      path: '/carts/cart_123',
      cache: 'no-store',
    });
    expect(result).toEqual({ id: 'cart_123' });
  });

  it('returns undefined if no cart', async () => {
    mockRequestFn.mockResolvedValue({
      status: 404,
      body: { type: 'not_found' },
    });

    const result = await getCartFn('not_cart_123');

    expect(mockRequestFn).toHaveBeenCalledWith({
      path: '/carts/not_cart_123',
      cache: 'no-cache',
    });
    expect(result).toEqual(undefined);
  });

  it('handles errors', async () => {
    mockRequestFn.mockRejectedValue(new Error('Network error'));

    await expect(getCartFn('cart_123')).rejects.toThrow('Network error');
  });
});
