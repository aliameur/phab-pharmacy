import { MedusaCartOperation, TRequestFn } from '../../types';
import { isNotFoundError } from '../utils';

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

    if (isNotFoundError(res)) throw new Error('Cart not found');

    return res.body.cart;
  };
