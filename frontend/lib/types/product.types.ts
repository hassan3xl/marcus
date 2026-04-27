import { Merchant } from "./merchant.types";

export type Category = {
  id: string;
  name: string;
  product_count: number;
  image: string;
  description?: string;
  default_best_before_days?: number;
  expiry_strategy?: "PERISHABLE" | "STABLE" | "MEDICAL" | "GENERAL";
  created_at: string;
  updated_at: string;
};

type ProductImages = {
  id: string;
  image: string;
  image_url: string;
  created_at: string;
  updated_at: string;
};

type ProductReviews = {
  id: string;
  avatar: string;
  first_name: string;
  last_name: string;
  rating: number;
  comment: string;
  reviews: string;
  created_at: string;
};

type ProductInventory = {
  id: string;
};

export type Product = {
  id: string;
  is_active: boolean;
  merchant: Merchant;
  category: Category;
  name: string;
  stock: number;
  inventory: ProductInventory;
  description: string;
  images: ProductImages[];
  unit_price: number;
  production_date?: string;
  expiry_date?: string;
  predicted_expiry_date?: string;
  best_before_days?: number;
  is_expired?: boolean;
  created_at: string;
  updated_at: string;
};
