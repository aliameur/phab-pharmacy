const MEDUSA_BACKEND_URL =
  process.env['NEXT_PUBLIC_MEDUSA_BACKEND_URL'] || 'http://localhost:9000';
const MEDUSA_API_KEY = process.env['MEDUSA_API_KEY'] || '';

export async function adminFetch<T>({
  cache = 'no-cache',
  method = 'GET',
  path = '',
  query,
  body,
  headers,
  tags = ['medusa_admin_request'],
}: {
  cache?: RequestCache;
  method?: 'GET' | 'POST' | 'DELETE';
  headers?: HeadersInit;
  body?: Record<string, string | number>;
  path?: string;
  query?: { [key: string]: string | string[] | number };
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
      const params = toURLSearchParams(query).toString();
      builtPath = `${path}?${params}`;
    }

    const result = await fetch(`${MEDUSA_BACKEND_URL}/admin${builtPath}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'x-medusa-access-token}': MEDUSA_API_KEY,
        ...headers,
      },
      body: JSON.stringify(body),
      ...(cache && { cache }),
      ...(tags && { next: { tags } }),
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

function toURLSearchParams(query?: {
  [key: string]: string | string[] | number;
}) {
  const params = new URLSearchParams();

  for (const key in query) {
    const value = query[key];

    if (Array.isArray(value)) {
      // If the value is an array, format with an array at the end of the key, and turn into csv format
      params.append(`${key}[]`, value.join(','));
    } else {
      params.append(key, value.toString());
    }
  }

  return params;
}
