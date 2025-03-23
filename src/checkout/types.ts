import { Address } from "../types";

export interface LineItem {
  quantity: number;
  productId?: string;
  variantOptions: { name: string; value: string }[];
  discountId?: string;
}

export interface CheckoutCreateParams {
  type: "hosted" | "embed";
  customerId?: string;
  lineItems: LineItem[];
}

export interface CheckoutUpdateParams {
  lineItems?: LineItem[];
  customerId?: string;
}

export interface ShippingRate {
  id: string;
  rate: number;
  provider: string;
  service: string;
  estimatedDays: number;
}

export interface CheckoutSession {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  clientSecret: string;
  lineItems: {
    quantity: number;
    discount?: any; // Match the Discount type if needed
    variantOptions: { name: string; value: string }[];
    product?: {
      id: string;
      title: string;
      description?: string;
      images: string[];
      category: string;
      tags: string[];
      priceInCents: number;
    };
  }[];
  total?: number;
  subtotal?: number;
  tax?: number;
  shipping?: number;
  currency: string;
  status:
    | "IN_PROGRESS"
    | "PAYMENT_PENDING"
    | "ABANDONED"
    | "CANCELED"
    | "FAILED";
  customer?: {
    address?: Address;
    email?: string;
  };
}
