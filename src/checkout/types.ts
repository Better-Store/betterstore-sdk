import { Address, Product, ProductVariant } from "../types";

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
  | "stripeProductId"
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
    | "stripeProductId"
    | "variantOptions"
  >;
};

export interface LineItem {
  quantity: number;
  variantOptions: { name: string; value: string }[];
  discountId?: string;
  productData: ProductData;
  metadata?: string;
}

export interface LineItemCreate
  extends Omit<LineItem, "productData" | "product" | "metadata"> {
  productId: string;
  product?: Pick<Product, "title" | "priceInCents" | "images">;
  metadata?: RecursiveRecord;
}

export type Currency = string;

export interface CheckoutCreateParams {
  type: "hosted" | "embed";
  customerId?: string;
  lineItems: LineItemCreate[];
  currency?: Currency;
  discountCode?: string;
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

type Discount = {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  type:
    | "AMOUNT_OFF_PRODUCTS"
    | "BUY_X_GET_Y"
    | "AMOUNT_OFF_ORDER"
    | "FREE_SHIPPING";
  method: "CODE" | "AUTOMATIC";
  code?: string | null;
  title?: string | null;

  value: number;
  valueType: "PERCENTAGE" | "FIXED_AMOUNT" | "FREE";
  discountScope: "PRODUCTS" | "COLLECTIONS";
  allowedProductIDs: string[];
  allowedCollectionIDs: string[];

  allowedCombinations: ("ORDER" | "PRODUCT" | "SHIPPING")[];

  minimumRequirementsType:
    | "NONE"
    | "MINIMUM_ORDER_AMOUNT"
    | "MINIMUM_PRODUCT_QUANTITY";
  minimumRequirementsValue?: number | null;
  requiredProductIDs: string[];
  requiredCollectionIDs: string[];
  minimumRequirementsScope: "PRODUCTS" | "COLLECTIONS";

  maxUses?: number | null;
  maxUsesPerCustomer?: number | null;
  maxAllowedProductQuantity?: number | null;
  uses: number;

  startsAt: Date;
  expiresAt?: Date | null;

  status: "ACTIVE" | "EXPIRED" | "SCHEDULED";

  organizationId: string;
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
    allowedProductIDs: string[];
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
