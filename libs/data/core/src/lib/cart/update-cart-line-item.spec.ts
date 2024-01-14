import { updateCartLineItem } from './update-cart-line-item';

describe('updateCartLineItem', () => {
  const mockRequestFn = jest.fn();
  const updateCartLineItemFn = updateCartLineItem(mockRequestFn);

  beforeEach(() => {
    mockRequestFn.mockClear();
  });

  it('updates cart line item and returns new cart successfully', async () => {
    mockRequestFn.mockResolvedValue({ body: { cart: { id: 'cart_123' } } });

    const result = await updateCartLineItemFn({
      cartId: 'cart_123',
      lineId: 'line_123',
      quantity: 3,
    });

    expect(mockRequestFn).toHaveBeenCalledWith({
      method: 'POST',
      path: '/carts/cart_123/line-items/line_123',
      body: {
        quantity: 3,
      },
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
      updateCartLineItemFn({
        cartId: 'not_cart_123',
        lineId: 'line_123',
        quantity: 3,
      }),
    ).rejects.toThrow('Medusa Error: is the cartId valid?');
  });

  it('throws error if invalid lineId', async () => {
    mockRequestFn.mockResolvedValue({
      status: 400,
      body: { type: 'invalid_data' },
    });

    await expect(
      updateCartLineItemFn({
        cartId: 'cart_123',
        lineId: 'not_line_123',
        quantity: 3,
      }),
    ).rejects.toThrow('Medusa Error: is the lineId valid?');
  });

  it('handles errors', async () => {
    mockRequestFn.mockRejectedValue(new Error('Network error'));

    await expect(
      updateCartLineItemFn({
        cartId: 'cart_123',
        lineId: 'line_123',
        quantity: 3,
      }),
    ).rejects.toThrow('Network error');
  });
});
