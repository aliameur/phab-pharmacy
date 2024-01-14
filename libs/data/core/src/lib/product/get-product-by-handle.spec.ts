import { getProductByHandle } from './get-product-by-handle';

const mockProduct = {
  id: 'prod_01HK5JK45QK06Y30KNSVHNMZ63',
  title: 'Medusa Coffee Mug',
  subtitle: null,
  status: 'published',
  external_id: null,
  description: "Every programmer's best friend.",
  handle: 'coffee-mug',
  is_giftcard: false,
  discountable: true,
  thumbnail:
    'https://medusa-public-images.s3.eu-west-1.amazonaws.com/coffee-mug.png',
  collection_id: null,
  type_id: null,
  weight: 400,
  length: null,
  height: null,
  width: null,
  hs_code: null,
  origin_country: null,
  mid_code: null,
  material: null,
  created_at: '2024-01-02T17:12:27.557Z',
  updated_at: '2024-01-02T17:12:27.557Z',
  deleted_at: null,
  metadata: null,
  profile_id: 'sp_01HK5JK3JWF64ZF7H74MHJ506M',
  collection: null,
  images: [
    {
      id: 'img_01HK5JK45NXRCX5CRW1N0K6TPJ',
      created_at: '2024-01-02T17:12:27.557Z',
      updated_at: '2024-01-02T17:12:27.557Z',
      deleted_at: null,
      url: 'https://medusa-public-images.s3.eu-west-1.amazonaws.com/coffee-mug.png',
      metadata: null,
    },
  ],
  options: [
    {
      id: 'opt_01HK5JK45STSKTVG26BQZBYGN2',
      created_at: '2024-01-02T17:12:27.557Z',
      updated_at: '2024-01-02T17:12:27.557Z',
      deleted_at: null,
      title: 'Size',
      product_id: 'prod_01HK5JK45QK06Y30KNSVHNMZ63',
      metadata: null,
      values: [
        {
          id: 'optval_01HK5JK45XBKH5TT7423RCJHQ9',
          created_at: '2024-01-02T17:12:27.557Z',
          updated_at: '2024-01-02T17:12:27.557Z',
          deleted_at: null,
          value: 'One Size',
          option_id: 'opt_01HK5JK45STSKTVG26BQZBYGN2',
          variant_id: 'variant_01HK5JK45XAGTG8VDK8NBYKZ1T',
          metadata: null,
        },
      ],
    },
  ],
  profiles: [
    {
      id: 'sp_01HK5JK3JWF64ZF7H74MHJ506M',
      created_at: '2024-01-02T17:12:27.447Z',
      updated_at: '2024-01-02T17:12:27.447Z',
      deleted_at: null,
      name: 'Default Shipping Profile',
      type: 'default',
      metadata: null,
    },
  ],
  tags: [],
  type: null,
  variants: [
    {
      id: 'variant_01HK5JK45XAGTG8VDK8NBYKZ1T',
      created_at: '2024-01-02T17:12:27.557Z',
      updated_at: '2024-01-02T17:12:27.557Z',
      deleted_at: null,
      title: 'One Size',
      product_id: 'prod_01HK5JK45QK06Y30KNSVHNMZ63',
      sku: null,
      barcode: null,
      ean: null,
      upc: null,
      variant_rank: 0,
      inventory_quantity: 100,
      allow_backorder: false,
      manage_inventory: true,
      hs_code: null,
      origin_country: null,
      mid_code: null,
      material: null,
      weight: null,
      length: null,
      height: null,
      width: null,
      metadata: null,
      options: [
        {
          id: 'optval_01HK5JK45XBKH5TT7423RCJHQ9',
          created_at: '2024-01-02T17:12:27.557Z',
          updated_at: '2024-01-02T17:12:27.557Z',
          deleted_at: null,
          value: 'One Size',
          option_id: 'opt_01HK5JK45STSKTVG26BQZBYGN2',
          variant_id: 'variant_01HK5JK45XAGTG8VDK8NBYKZ1T',
          metadata: null,
        },
      ],
      prices: [
        {
          id: 'ma_01HK5JK460CQ0KHYQZD3YKPH76',
          created_at: '2024-01-02T17:12:27.557Z',
          updated_at: '2024-01-02T17:12:27.557Z',
          deleted_at: null,
          currency_code: 'eur',
          amount: 1000,
          min_quantity: null,
          max_quantity: null,
          price_list_id: null,
          region_id: null,
          price_list: null,
          variant_id: 'variant_01HK5JK45XAGTG8VDK8NBYKZ1T',
        },
        {
          id: 'ma_01HK5JK460CQNMVCNJ3MMRXRW6',
          created_at: '2024-01-02T17:12:27.557Z',
          updated_at: '2024-01-02T17:12:27.557Z',
          deleted_at: null,
          currency_code: 'usd',
          amount: 1200,
          min_quantity: null,
          max_quantity: null,
          price_list_id: null,
          region_id: null,
          price_list: null,
          variant_id: 'variant_01HK5JK45XAGTG8VDK8NBYKZ1T',
        },
      ],
      original_price: null,
      calculated_price: null,
      original_price_incl_tax: null,
      calculated_price_incl_tax: null,
      original_tax: null,
      calculated_tax: null,
      tax_rates: null,
    },
  ],
};

describe('getProductByHandle', () => {
  const mockRequestFn = jest.fn();

  beforeEach(() => {
    mockRequestFn.mockClear();
  });

  it('fetches product by handle successfully', async () => {
    mockRequestFn.mockResolvedValue({ body: { products: [mockProduct] } });

    const result = await getProductByHandle(mockRequestFn)('coffee-mug');

    expect(mockRequestFn).toHaveBeenCalledWith({
      path: '/products',
      query: { handle: 'coffee-mug' },
    });
    expect(result).toEqual(mockProduct);
  });

  it('throws error if no product', async () => {
    mockRequestFn.mockResolvedValue({ body: { products: [] }, count: 0 });

    expect(getProductByHandle(mockRequestFn)('not-coffee-mug')).rejects.toThrow(
      'No products found',
    );

    expect(mockRequestFn).toHaveBeenCalledWith({
      path: '/products',
      query: { handle: 'not-coffee-mug' },
    });
  });

  it('handles errors', async () => {
    mockRequestFn.mockRejectedValue(new Error('Network error'));

    await expect(
      getProductByHandle(mockRequestFn)('test-handle'),
    ).rejects.toThrow('Network error');
  });
});
