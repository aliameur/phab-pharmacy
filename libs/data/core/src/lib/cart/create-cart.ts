import { MedusaCartOperation, TRequestFn } from '../../types';

export const createCart = (requestFn: TRequestFn) => async () => {
  const res = await requestFn<MedusaCartOperation>({
    path: '/carts',
    method: 'POST',
    cache: 'no-store',
    body: {
      sales_channel_id: 'sc_01HM54EQ2MEYDC0SF09624FJVW',
    },
  });

  return res.body.cart;
};
