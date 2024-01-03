const MEDUSA_BACKEND_URL =
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000';
const MEDUSA_API_KEY = process.env.NEXT_PUBLIC_MEDUSA_API_KEY || '';
const REVALIDATE_WINDOW =
  parseInt(process.env.REVALIDATE_WINDOW || '') || 60 * 30; // 30 minutes

export async function medusaFetch<T>({
  cache = 'force-cache',
  method = 'GET',
  path = '',
  query,
  body,
  headers,
  tags = ['medusa_request'],
  revalidate = REVALIDATE_WINDOW,
}: {
  cache?: RequestCache;
  method?: 'GET' | 'POST';
  headers?: HeadersInit;
  body?: string;
  path?: string;
  query?: { [key: string]: string };
  tags?: string[];
  revalidate?: number;
}): Promise<
  | {
      status: number;
      body: T;
    }
  | never
> {
  try {
    let builtPath = path;

    if (query) {
      const params = new URLSearchParams(query).toString();
      builtPath = `${path}?${params}`;
    }

    const result = await fetch(`${MEDUSA_BACKEND_URL}/store${builtPath}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'x-publishable-key': MEDUSA_API_KEY,
        ...headers,
      },
      body: JSON.stringify(body),
      cache,
      // TODO only specify cache or revalidate at once
      ...((tags || revalidate) && { next: { tags, revalidate } }),
    });

    const data = await result.json();

    if (data.errors) {
      throw data.errors[0];
    }

    return {
      status: result.status,
      body: data,
    };
  } catch (e) {
    throw {
      error: e,
      path,
    };
  }
}
