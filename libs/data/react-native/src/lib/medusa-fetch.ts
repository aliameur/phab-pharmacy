import axios, { AxiosHeaders } from 'axios';

const MEDUSA_BACKEND_URL =
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000';
const MEDUSA_API_KEY = process.env.NEXT_PUBLIC_MEDUSA_API_KEY || '';

export const medusaFetch = async <T>({
  method = 'GET',
  path = '',
  query,
  body,
  headers,
}: {
  cache?: RequestCache;
  method?: 'GET' | 'POST';
  headers?: HeadersInit;
  body?: Record<string, string | number>;
  path?: string;
  query?: { [key: string]: string };
  tags?: string[];
  revalidate?: number;
}): Promise<{ status: number; body: T }> => {
  try {
    const result = await axios({
      method,
      url: `${MEDUSA_BACKEND_URL}/store${path}`,
      headers: {
        'Content-Type': 'application/json',
        'x-publishable-key': MEDUSA_API_KEY,
        ...(headers as AxiosHeaders),
      },
      params: query,
      data: body,
    });

    if (result.data.errors) {
      throw result.data.errors[0];
    }

    return {
      status: result.status,
      body: result.data,
    };
  } catch (e) {
    throw {
      error: e,
      path,
    };
  }
};
