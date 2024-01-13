import { MedusaCartOperation, TRequestFn } from '../types';

export const updateCartLineItem =
  (requestFn: TRequestFn) =>
  async (cartId: string, lineId: string, quantity: number) => {
    const res = await requestFn<MedusaCartOperation>({
      path: `/carts/${cartId}/line-items/${lineId}`,
      method: 'POST',
      body: {
        quantity,
      },
    });

    return res.body.cart;
  };
