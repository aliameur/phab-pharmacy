import { MedusaCartOperation, TRequestFn } from '../types';

type TAddCartLineItem = {
  cartId: string;
  variantId: string;
  quantity: number;
};

export const addCartLineItem =
  (requestFn: TRequestFn) =>
  async ({ cartId, variantId, quantity }: TAddCartLineItem) => {
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
