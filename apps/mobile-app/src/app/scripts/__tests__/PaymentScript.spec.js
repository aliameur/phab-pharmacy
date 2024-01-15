import { createPaymentSessions, setStripePaymentSession } from "../PaymentsScripts";
import axios from 'axios';

jest.mock('axios');

const BASE_URL = 'https://phab-pharmacy-backend-ab775283aa48.herokuapp.com';

describe('createPaymentSessions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create payment sessions successfully', async () => {

    const mockResponseData = { cart: { id: 'some_id' } };
    axios.post.mockResolvedValueOnce({ data: mockResponseData });

    const mockCartId = 'mocked_cart_id';

    const result = await createPaymentSessions(mockCartId);

    expect(axios.post).toHaveBeenCalledWith(`${BASE_URL}/store/carts/${mockCartId}/payment-sessions`);

    expect(result).toEqual(mockResponseData.cart);
  });

  it('should handle errors gracefully', async () => {
    const consoleLogError = jest.spyOn(console, 'error').mockImplementation();

    const mockError = new Error('Axios error');
    axios.post.mockRejectedValueOnce(mockError);

    const mockCartId = 'mocked_cart_id';

    const result = await createPaymentSessions(mockCartId);

    expect(axios.post).toHaveBeenCalledWith(`${BASE_URL}/store/carts/${mockCartId}/payment-sessions`);

    expect(consoleLogError).toHaveBeenCalledWith('Error creating payment sessions:', mockError.message);

    expect(result).toBeUndefined();
  });
});