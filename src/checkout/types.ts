import { Address, Product, ProductVariant } from "../types";

type ProductData = Pick<
  Product,
  | "title"
  | "description"
  | "images"
  | "category"
  | "tags"
  | "isPhysical"
  | "weightInGrams"
  | "heightInCm"
  | "widthInCm"
  | "lengthInCm"
  | "priceInCents"
> & {
  selectedVariant: Pick<
    ProductVariant,
    | "sku"
    | "images"
    | "isPhysical"
    | "weightInGrams"
    | "heightInCm"
    | "widthInCm"
    | "lengthInCm"
    | "priceInCents"
    | "variantOptions"
  >;
};

export interface LineItem {
  quantity: number;
  variantOptions: { name: string; value: string }[];
  discountId?: string;
  product: ProductData;
  metadata?: string;
}

export interface LineItemCreate extends Omit<LineItem, "product" | "metadata"> {
  product?: Pick<Product, "title" | "priceInCents" | "images">;
  metadata?: RecursiveRecord;
}

export type Currency = string;

export interface CheckoutCreateParams {
  type: "hosted" | "embed";
  customerId?: string;
  lineItems: LineItemCreate[];
  currency?: Currency;
}

export interface CheckoutUpdateParams {
  customerId?: string;

  shipmentData?: {
    provider: string;
    name?: string;
    pickupPointId?: string;
    trackingNumber?: string;
    trackingUrl?: string;
  };
}

export { ShippingRate } from "./shipping.types";

export interface CheckoutSession {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  clientSecret: string;
  lineItems: LineItem[];
  total?: number;
  subtotal?: number;
  tax?: number;
  shipping?: number;
  currency: string;
  exchangeRate: number;
  status:
    | "IN_PROGRESS"
    | "PAYMENT_PENDING"
    | "ABANDONED"
    | "CANCELED"
    | "FAILED";
  customer?: {
    id: string;
    address?: Address;
    email?: string;
  };
}

type RecursiveRecord = {
  [key: string]: any;
};
