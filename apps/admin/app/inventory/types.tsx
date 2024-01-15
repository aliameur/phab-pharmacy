export interface Location {
  id: string;
  address_id: string | null;
  name: string | null;
  created_at: string | Date;
  updated_at: string | Date;
}

export interface ItemMetadata {
  MaxStock: number;
}

export interface Variant {
  id: string;
  title: string;
  inventory_quantity: number;
  metadata: ItemMetadata;
}

export interface Item {
  sku: string | null;
  id: string;
  variants: Variant[];
}
