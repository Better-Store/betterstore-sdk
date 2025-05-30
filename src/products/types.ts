import { GetListParams, StringArrayQueryType } from "../_globals/types";

export interface VariantOption {
  name: string;
  value: string;
}

export interface ProductVariant {
  title: string;
  images: string[];

  trackInventory: boolean;
  sku?: string;
  barcode?: string;
  stockAvailable: number;
  stockCommited: number;
  stockUnavailable: number;

  isPhysical: boolean;
  weightInGrams?: number;
  heightInCm?: number;
  widthInCm?: number;
  lengthInCm?: number;

  priceInCents: number;
  billingType: ProductBillingType;
  billingInterval: ProductBillingInterval;
  billingIntervalCount: number;

  variantOptions: VariantOption[];
}

export interface ProductOption {
  name: string;
  values: string[];
}

export type ProductStatus = "DRAFT" | "ACTIVE" | "ARCHIVED";

export type ProductBillingInterval = "DAY" | "WEEK" | "MONTH" | "YEAR";
export type ProductBillingType = "ONE_TIME" | "SUBSCRIPTION";

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
  billingType: ProductBillingType;
  billingInterval: ProductBillingInterval;
  billingIntervalCount: number;

  trackInventory: boolean;
  sku?: string;
  barcode?: string;
  stockAvailable: number;
  stockCommited: number;
  stockUnavailable: number;

  seoPageTitle?: string;
  seoDescription?: string;
  seoHandle?: string;

  vendor?: string;

  status: ProductStatus;

  options: ProductOption[];
  productVariants: ProductVariant[];
}

export interface ProductWithoutVariants
  extends Omit<Product, "productVariants"> {}

export type ListProductsQuery = {
  // Collection
  collectionId?: StringArrayQueryType;
  collectionSeoHandle?: StringArrayQueryType;

  // String arrays
  tags?: StringArrayQueryType;
};

export type ListProductsSortBy =
  | "createdAt"
  | "updatedAt"
  | "title"
  | "stockAvailable"
  | "stockCommited"
  | "priceInCents";

export type ListProductsParams = GetListParams<
  ListProductsSortBy,
  ListProductsQuery
>;

export type RetrieveProductParams =
  | {
      seoHandle: string;
    }
  | {
      id: string;
    };
