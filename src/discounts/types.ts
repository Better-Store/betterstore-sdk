export interface Discount {
  id: string;

  title: string;
  description?: string;
  images: string[];

  seoPageTitle?: string;
  seoDescription?: string;
  seoHandle?: string;
}

export type RetrieveDiscountParams =
  | {
      id: string;
    }
  | {
      code: string;
    };
