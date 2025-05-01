export interface VariantOption {
  name: string;
  value: string;
}

export interface ProductVariant {
  title: string;
  sku?: string;
  barcode?: string;
  images: string[];

  isPhysical: boolean;
  weightInGrams?: number;
  heightInCm?: number;
  widthInCm?: number;
  lengthInCm?: number;

  priceInCents: number;

  variantOptions: VariantOption[];
}

export interface ProductOption {
  name: string;
  values: string[];
}

export enum ProductStatus {
  DRAFT = "DRAFT",
  ACTIVE = "ACTIVE",
  ARCHIVED = "ARCHIVED",
}

export interface Product {
  id: string;
  title: string;
  description?: string;
  images: string[];
  category: string;
  tags: string[];

  isPhysical: boolean;
  weightInGrams?: number;
  heightInCm?: number;
  widthInCm?: number;
  lengthInCm?: number;

  priceInCents: number;

  stockAvailable: number;
  stockCommited: number;
  stockUnavailable: number;

  seoPageTitle?: string;
  seoDescription?: string;
  seoHandle?: string;

  status: ProductStatus;

  options: ProductOption[];
  productVariants: ProductVariant[];
}

export interface ProductWithoutVariants
  extends Omit<Product, "productVariants"> {}
