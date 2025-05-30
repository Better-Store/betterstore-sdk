import {
  Address,
  Discount,
  Product,
  ProductVariant,
  ProductWithoutVariants,
} from "../types";

type ProductData = Pick<
  Product,
  | "title"
  | "description"
  | "images"
  | "category"
  | "tags"
  | "sku"
  | "barcode"
  | "vendor"
  | "isPhysical"
  | "weightInGrams"
  | "heightInCm"
  | "widthInCm"
  | "lengthInCm"
  | "priceInCents"
  | "billingType"
  | "billingInterval"
  | "billingIntervalCount"
> & {
  productId: string;
  selectedVariant: Pick<
    ProductVariant,
    | "title"
    | "sku"
    | "barcode"
    | "images"
    | "isPhysical"
    | "weightInGrams"
    | "heightInCm"
    | "widthInCm"
    | "lengthInCm"
    | "priceInCents"
    | "billingType"
    | "billingInterval"
    | "billingIntervalCount"
    | "variantOptions"
    | "metadata"
  >;
};

export interface LineItem {
  quantity: number;
  variantOptions: { name: string; value: string }[];
  productData: ProductData;
  metadata?: string;
}

export interface LineItemCreate
  extends Omit<
    LineItem,
    "productData" | "product" | "metadata" | "variantOptions"
  > {
  variantOptions?: { name: string; value: string }[];
  productId: string;
  product?: ProductWithoutVariants;
  metadata?: RecursiveRecord;
}

export type Currency = string;

export interface CheckoutCreateParams {
  type: "hosted" | "embed";
  customerId?: string;
  lineItems: LineItemCreate[];
  currency?: Currency;
  discountCodes?: string[];
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

type ShipmentData = {
  provider: string;
  name?: string;
  service?: string;
  pickupPointId?: string;
  trackingId?: string;
  trackingUrl?: string;
};

export interface CheckoutSession {
  id: string;
  testmode: boolean;
  clientSecret: string;
  customer?: {
    id: string;
    address?: Address;
    email?: string;
  };

  lineItems: LineItem[];

  tax: number | null;
  shipping: number | null;
  discountAmount: number | null;
  appliedDiscounts: {
    id: string;
    amount: number;
    allowedLineItems: { productId: string; quantity: number }[];
    discount: Discount;
  }[];
  currency: string;
  exchangeRate: number | null;
  shipmentData: ShipmentData | null;

  status:
    | "IN_PROGRESS"
    | "PAYMENT_PENDING"
    | "ABANDONED"
    | "CANCELED"
    | "FAILED";
}

type RecursiveRecord = {
  [key: string]: any;
};
