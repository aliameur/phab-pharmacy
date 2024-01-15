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

export interface ItemLocation {
  stocked_quantity: number;
  location_id: string;
  inventory_item_id: string;
}

export interface Variant {
  id: string;
  title: string;
  metadata: ItemMetadata;
  product_id: string;
}

export interface Item {
  sku: string | null;
  id: string;
  variants: Variant[];
  stocked_quantity: number;
  location_levels: ItemLocation[];
}
