export interface AddressData {
  company: string | null;
  first_name: string | null;
  last_name: string | null;
  address_1: string | null;
  address_2: string | null;
  city: string | null;
  country_code: string | null;
  province: string | null;
  postal_code: string | null;
  phone: string | null;
}

export interface Order {
  id: string;
  status: string;
  fulfillment_status: string;
  payment_status: string;
  cart_id: string;
  customer_id: string;
  email: string;
  created_at: Date;
  shipping_address: AddressData;
  items: Item[];
}

export interface Item {
  id: string;
  title: string;
  quantity: number;
}
