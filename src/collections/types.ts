import { ProductWithoutVariants, SortOrder } from "../products/types";

export interface Collection {
  id: string;

  title: string;
  description?: string;
  images: string[];

  seoPageTitle?: string;
  seoDescription?: string;
  seoHandle?: string;
}

export interface CollectionWithProducts extends Collection {
  products: ProductWithoutVariants[];
}

export type ListCollectionsQuery = undefined;
export type ListCollectionsSortBy = "createdAt" | "updatedAt" | "title";

export type ListCollectionsParams = {
  sortBy?: ListCollectionsSortBy;
  sortOrder?: SortOrder;
  query?: string;
};

export type RetrieveCollectionParams =
  | {
      seoHandle: string;
    }
  | {
      id: string;
    };
