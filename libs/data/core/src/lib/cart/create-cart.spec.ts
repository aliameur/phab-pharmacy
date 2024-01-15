import { createCart } from './create-cart';

describe('createCart', () => {
  const mockRequestFn = jest.fn();
  const createCartFn = createCart(mockRequestFn);

  beforeEach(() => {
    mockRequestFn.mockClear();
  });

  it('creates a new cart successfully', async () => {
    mockRequestFn.mockResolvedValue({ body: { cart: { id: 'cart_123' } } });

    const result = await createCartFn();

    expect(mockRequestFn).toHaveBeenCalledWith({
      method: 'POST',
      path: '/carts',
      cache: 'no-store',
    });
    expect(result).toEqual({ id: 'cart_123' });
  });

  it('handles errors', async () => {
    mockRequestFn.mockRejectedValue(new Error('Network error'));

    await expect(createCartFn()).rejects.toThrow('Network error');
  });
});
