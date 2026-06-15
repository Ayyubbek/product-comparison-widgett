export interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  display: string;
  ram: string;
  storage: string;
  camera: string;
  battery: string;
  os: string;
}

export interface ComparisonRow {
  key: keyof Omit<Product, "id" | "name" | "category">;
  label: string;
}
