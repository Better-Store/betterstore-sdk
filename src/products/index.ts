import { createApiClient } from "../utils/axios";
import {
  ListProductsParams,
  Product,
  ProductWithoutVariants,
  RetrieveProductParams,
} from "./types";

class Products {
  private apiClient: ReturnType<typeof createApiClient>;

  constructor(apiKey: string, proxy?: string) {
    this.apiClient = createApiClient(apiKey, proxy);
  }

  async list(params?: ListProductsParams): Promise<ProductWithoutVariants[]> {
    const queryParams = new URLSearchParams();

    if (params) {
      queryParams.set("params", JSON.stringify(params));
    }

    const data: ProductWithoutVariants[] = await this.apiClient.get(
      `/products?${queryParams.toString()}`
    );

    return data;
  }

  async retrieve(params: RetrieveProductParams): Promise<Product | null> {
    if ("seoHandle" in params) {
      const data: Product = await this.apiClient.get(
        `/products/${params.seoHandle}`
      );

      if (!data) {
        console.error(`Product with seoHandle ${params.seoHandle} not found`);
        return null;
      }

      return data;
    }

    const data: Product = await this.apiClient.get(`/products/${params.id}`);

    if (!data) {
      console.error(`Product with id ${params.id} not found`);
      return null;
    }

    return data;
  }
}

export default Products;
