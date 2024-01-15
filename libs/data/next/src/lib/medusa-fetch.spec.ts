import { enableFetchMocks } from 'jest-fetch-mock';



import { medusaFetch } from './medusa-fetch';


describe('medsusaFetch', () => {
  enableFetchMocks();

  beforeEach(() => {
    fetchMock.mockClear();
  });

  it('applies defaults correctly', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: 'test' }));

    const response = await medusaFetch({ path: '/test' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ data: 'test' });
    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:9000/store/test', // Default URL
      {
        method: 'GET', // Default method
        cache: 'force-cache', // Default method
        headers: {
          'Content-Type': 'application/json',
          'x-publishable-key': '', // Default API key
        },
        body: undefined, // Default body
      },
    );
  });

  test('handles JSON response', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: 'test' }), {
      headers: { 'Content-Type': 'application/json' },
    });
    const response = await medusaFetch({ path: '/json' });
    expect(response.body).toEqual({ data: 'test' });
  });

  test('handles network errors', async () => {
    fetchMock.mockReject(new Error('Network Error'));

    // await expect(medusaFetch({ path: '/network-error' })).rejects
    await expect(medusaFetch({ path: '/network-error' })).rejects.toEqual({
      error: new Error('Network Error'),
      path: '/network-error',
    });
  });

  test('parses error response body', async () => {
    const errorMessage = {
      error: new Error('Internal Server Error'),
      path: '/server-error',
    };
    fetchMock.mockReject(new Error('Internal Server Error'));

    await expect(medusaFetch({ path: '/server-error' })).rejects.toEqual(errorMessage)
  });
});
