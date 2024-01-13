import { MedusaCartOperation, TRequestFn } from '../../types';
import { isMedusaError } from '../utils';

type TRemoveCartLineItem = {
  cartId: string;
  lineId: string;
};

export const removeCartLineItem =
  (requestFn: TRequestFn) =>
  async ({ cartId, lineId }: TRemoveCartLineItem) => {
    const res = await requestFn<MedusaCartOperation>({
      path: `/carts/${cartId}/line-items/${lineId}`,
      method: 'DELETE',
    });

    if (isMedusaError(res.body))
      throw new Error('Medusa Error: is the cartId valid?');

    return res.body.cart;
  };
