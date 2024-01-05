import { getCategoryByHandle } from './get-category-by-handle';

const mockCategory = {
  id: 'pcat_pants',
  created_at: new Date('2024-01-02T17:12:27.557Z'),
  updated_at: new Date('2024-01-02T17:12:27.557Z'),
  name: 'Pants',
  description: '',
  handle: 'pants',
  parent_category_id: null,
  rank: 0,
  metadata: null,
  category_children: [],
  parent_category: null,
};

describe('getCategoryByHandle', () => {
  const mockRequestFn = jest.fn();

  beforeEach(() => {
    mockRequestFn.mockClear();
  });

  it('fetches category by handle successfully', async () => {
    mockRequestFn.mockResolvedValue({
      body: { product_categories: [mockCategory] },
    });

    const result = await getCategoryByHandle(mockRequestFn)('pcat_pants');

    expect(mockRequestFn).toHaveBeenCalledWith({
      path: '/product-categories',
      query: { handle: 'pcat_pants' },
    });
    expect(result).toEqual(mockCategory);
  });

  it('throws error if no category', async () => {
    mockRequestFn.mockResolvedValue({ body: { product_categories: [] }, count: 0 });

    expect(
      getCategoryByHandle(mockRequestFn)('not-pcat_pants'),
    ).rejects.toThrow('No categories found');

    expect(mockRequestFn).toHaveBeenCalledWith({
      path: '/product-categories',
      query: { handle: 'not-pcat_pants' },
    });
  });

  it('handles errors', async () => {
    mockRequestFn.mockRejectedValue(new Error('Network error'));

    await expect(
      getCategoryByHandle(mockRequestFn)('test-handle'),
    ).rejects.toThrow('Network error');
  });
});
