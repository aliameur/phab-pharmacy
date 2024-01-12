import { MedusaCartOperation, TRequestFn } from '../types';

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

    return res.body.cart;
  };
