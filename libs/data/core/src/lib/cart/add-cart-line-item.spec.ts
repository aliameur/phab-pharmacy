import { addCartLineItem } from './add-cart-line-item';

describe('addCartLineItem', () => {
  const mockRequestFn = jest.fn();
  const addCartLineItemFn = addCartLineItem(mockRequestFn);

  beforeEach(() => {
    mockRequestFn.mockClear();
  });

  it('adds new cart line item and returns new cart successfully', async () => {
    mockRequestFn.mockResolvedValue({ body: { cart: { id: 'cart_123' } } });

    const result = await addCartLineItemFn({
      cartId: 'cart_123',
      variantId: 'variant_123',
      quantity: 1,
    });

    expect(mockRequestFn).toHaveBeenCalledWith({
      method: 'POST',
      path: '/carts/cart_123/line-items',
      cache: 'no-cache',
      body: {
        variant_id: 'variant_123',
        quantity: 1,
      },
    });
    expect(result).toEqual({ id: 'cart_123' });
  });

  it('throws error if invalid cartId', async () => {
    mockRequestFn.mockResolvedValue({
      status: 404,
      body: { type: 'not_found' },
    });

    await expect(
      addCartLineItemFn({
        cartId: 'not_cart_123',
        variantId: 'variant_123',
        quantity: 1,
      }),
    ).rejects.toThrow('Cart not found');
  });

  it('handles errors', async () => {
    mockRequestFn.mockRejectedValue(new Error('Network error'));

    await expect(
      addCartLineItemFn({
        cartId: 'cart_123',
        variantId: 'variant_123',
        quantity: 1,
      }),
    ).rejects.toThrow('Network error');
  });
});
