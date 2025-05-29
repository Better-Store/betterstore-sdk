export interface Discount {
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

  subscriptionDiscountDurationType: "ONE_TIME" | "RECURRING" | "FOREVER";
  subscriptionDiscountDurationValue: number;
  stripeDiscountId?: string | null;

  startsAt: Date;
  expiresAt?: Date | null;

  status: "ACTIVE" | "EXPIRED" | "SCHEDULED";

  organizationId: string;
}

export type ListDiscountsQuery = {
  type?: Discount["type"];
  valueType?: Discount["valueType"];
  method?: Discount["method"];
  status?: Discount["status"];
  minimumRequirementsType?: Discount["minimumRequirementsType"];
  minimumRequirementsScope?: Discount["minimumRequirementsScope"];
  discountScope?: Discount["discountScope"];
  allowedCombinations?: Discount["allowedCombinations"];
  allowedProductIDs?: Discount["allowedProductIDs"];
  allowedCollectionIDs?: Discount["allowedCollectionIDs"];
  requiredProductIDs?: Discount["requiredProductIDs"];
  requiredCollectionIDs?: Discount["requiredCollectionIDs"];
};

export type ListDiscountsSortBy = "createdAt" | "updatedAt";

export type ListDiscountsParams = {
  sortBy?: ListDiscountsSortBy;
  sortOrder?: "asc" | "desc";
  query?: ListDiscountsQuery;
};

export type RetrieveDiscountParams =
  | {
      id: string;
    }
  | {
      code: string;
    };
