export interface Category {
  id: string;
  name: string;
  handle: string;
}

interface Price {
  currency_code: string;
  amount: number;
  id: string;
}

interface Variant {
  id: string;
  prices: Price[];
}

export interface Product {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  handle: string;
  variants: Variant[];
}
