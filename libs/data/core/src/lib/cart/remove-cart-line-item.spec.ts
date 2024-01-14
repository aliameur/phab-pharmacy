import { removeCartLineItem } from './remove-cart-line-item';

describe('removeCartLineItem', () => {
  const mockRequestFn = jest.fn();
  const removeCartLineItemFn = removeCartLineItem(mockRequestFn);

  beforeEach(() => {
    mockRequestFn.mockClear();
  });

  it('removes cart line item and returns new cart successfully', async () => {
    mockRequestFn.mockResolvedValue({ body: { cart: { id: 'cart_123' } } });

    const result = await removeCartLineItemFn({
      cartId: 'cart_123',
      lineId: 'line_123',
    });

    expect(mockRequestFn).toHaveBeenCalledWith({
      method: 'DELETE',
      path: '/carts/cart_123/line-items/line_123',
      cache: 'no-cache',
    });
    expect(result).toEqual({ id: 'cart_123' });
  });

  it('throws error if invalid cartId', async () => {
    mockRequestFn.mockResolvedValue({
      status: 500,
      body: { type: 'unknown_error' },
    });

    await expect(
      removeCartLineItemFn({
        cartId: 'not_cart_123',
        lineId: 'line_123',
      }),
    ).rejects.toThrow('Medusa Error: is the cartId valid?');
  });

  it('handles errors', async () => {
    mockRequestFn.mockRejectedValue(new Error('Network error'));

    await expect(
      removeCartLineItemFn({
        cartId: 'not_cart_123',
        lineId: 'line_123',
      }),
    ).rejects.toThrow('Network error');
  });
});
