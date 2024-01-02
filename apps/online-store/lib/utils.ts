import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const objectToURLSearchParams = (
  obj: Record<string, never>,
): URLSearchParams => {
  const params = new URLSearchParams();

  for (const key in obj) {
    if (Array.isArray(obj[key])) {
      (obj[key] as []).forEach((value) => {
        params.append(`${key}[]`, value);
      });
    } else {
      params.append(key, obj[key]);
    }
  }

  return params;
};
