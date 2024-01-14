export interface Location {
  id: string;
  address_id: string | null;
  name: string | null;
  created_at: string | Date;
  updated_at: string | Date;
}

export interface Item {
  sku: string | null;
  id: string;
  stocked_quantity: number;
}
