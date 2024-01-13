import { MedusaCartOperation, TRequestFn } from '../../types';

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
      body: {
        quantity,
      },
    });

    return res.body.cart;
  };
