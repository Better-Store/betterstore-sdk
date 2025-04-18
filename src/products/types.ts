export interface VariantOption {
  name: string;
  value: string;
}

export interface ProductVariant {
  sku: string;
  images: string[];
  stockAvailable: number;
  stockCommited: number;
  stockUnavailable: number;
  priceInCents: number;
  productId: string;
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

  status: ProductStatus;

  options: ProductOption[];
  productVariants: ProductVariant[];
}

export interface ProductWithoutVariants
  extends Omit<Product, "productVariants"> {}
