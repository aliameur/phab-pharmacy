import { getTestimonials } from './get-testimonials';

describe('getTestimonials', () => {
  const mockRequestFn = jest.fn();

  beforeEach(() => {
    mockRequestFn.mockClear();
  });

  it('fetches products successfully', async () => {
    mockRequestFn.mockResolvedValue({
      body: { testimonials: [{ id: 'testimonial_123' }] },
    });

    const result = await getTestimonials(mockRequestFn)();

    expect(mockRequestFn).toHaveBeenCalledWith({
      path: '/testimonials',
    });
    expect(result).toEqual([{ id: 'testimonial_123' }]);
  });

  it('handles errors', async () => {
    mockRequestFn.mockRejectedValue(new Error('Network error'));

    await expect(getTestimonials(mockRequestFn)()).rejects.toThrow(
      'Network error',
    );
  });
});
