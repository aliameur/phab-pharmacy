import { HTTPClient } from '../types';

export const request = async <T>(
  httpClient: HTTPClient<T>,
  url: string,
  options: Record<string, string>,
//   TODO specify options and url
) => {
  return httpClient(url, options);
};
