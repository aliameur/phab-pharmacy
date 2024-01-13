import { MedusaCartOperation, TRequestFn } from '../types';

export const addCartLineItem =
  (requestFn: TRequestFn) =>
  async (cartId: string, variantId: string, quantity: number) => {
    const res = await requestFn<MedusaCartOperation>({
      path: `/carts/${cartId}/line-items`,
      method: 'POST',
      body: {
        variant_id: variantId,
        quantity,
      },
    });

    return res.body.cart;
  };
