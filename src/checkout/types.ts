import { Address, Product } from "../types";

export interface LineItem {
  quantity: number;
  productId: string;
  variantOptions: { name: string; value: string }[];
  discountId?: string;
  product?: Pick<Product, "title" | "priceInCents" | "images">;
  metadata?: string;
}

export type Currency = {
  code: string;
  exchangeRate: number;
};

export interface CheckoutCreateParams {
  type: "hosted" | "embed";
  customerId?: string;
  lineItems: LineItem[];
  currency?: Currency;
}

export interface CheckoutUpdateParams {
  lineItems?: LineItem[];
  customerId?: string;
  tax?: number;
  shipping?: number;
  currency?: Currency;

  shippingInfo?: {
    rateId: string;
    provider?: string;
    name?: string;
    trackingNumber?: string;
    trackingUrl?: string;
  };
}

export { Rate as ShippingRate } from "shippo";

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
