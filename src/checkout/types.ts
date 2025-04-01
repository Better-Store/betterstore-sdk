import { Address } from "../types";

export interface LineItem {
  quantity: number;
  productId: string;
  variantOptions: { name: string; value: string }[];
  discountId?: string;
  metadata?: string;
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
