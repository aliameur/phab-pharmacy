import { ProductCategory } from '../types';
import { getCategories } from './get-categories';

const mockCategories: ProductCategory[] = [
  {
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
  },
  {
    id: 'pcat_shirts',
    created_at: new Date('2024-01-02T17:12:27.557Z'),
    updated_at: new Date('2024-01-02T17:12:27.557Z'),
    name: 'Shirts',
    description: '',
    handle: 'shirts',
    parent_category_id: null,
    rank: 1,
    metadata: null,
    category_children: [],
    parent_category: null,
  },
];

describe('getCategories', () => {
  const mockRequestFn = jest.fn();

  beforeEach(() => {
    mockRequestFn.mockClear();
  });

  it('fetches categories successfully', async () => {
    mockRequestFn.mockResolvedValue({
      body: { product_categories: mockCategories },
    });

    const result = await getCategories(mockRequestFn)();

    expect(mockRequestFn).toHaveBeenCalledWith({
      path: '/product-categories',
    });
    expect(result).toEqual(mockCategories);
  });

  it('handles errors', async () => {
    mockRequestFn.mockRejectedValue(new Error('Network error'));

    await expect(getCategories(mockRequestFn)()).rejects.toThrow(
      'Network error',
    );
  });
});
