import { MedusaCartOperation, TRequestFn } from '../../types';
import { isMedusaError } from '../utils';

type TUpdateCartLineItem = {
  cartId: string;
  lineId: string;
  quantity: number;
};

export const updateCartLineItem =
  (requestFn: TRequestFn) =>
  async ({ cartId, lineId, quantity }: TUpdateCartLineItem) => {
    const res = await requestFn<MedusaCartOperation>({
      path: `/carts/${cartId}/line-items/${lineId}`,
      method: 'POST',
      cache: 'no-store',
      body: {
        quantity,
      },
    });

    if (isMedusaError(res.body) && res.status === 400)
      throw new Error('Medusa Error: is the lineId valid?');

    if (isMedusaError(res.body))
      throw new Error('Medusa Error: is the cartId valid?');

    return res.body.cart;
  };
