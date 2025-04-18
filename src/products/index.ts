import { createApiClient } from "../utils/axios";
import { Product, ProductWithoutVariants } from "./types";

class Products {
  private apiClient: ReturnType<typeof createApiClient>;

  constructor(apiKey: string, proxy?: string) {
    this.apiClient = createApiClient(apiKey, proxy);
  }

  async list(): Promise<ProductWithoutVariants[]> {
    const data: ProductWithoutVariants[] =
      await this.apiClient.get("/products");

    return data;
  }

  async retrieve(productId: string): Promise<Product> {
    const data: Product = await this.apiClient.get(`/products/${productId}`);

    if (!data) {
      throw new Error("Product not found");
    }

    return data;
  }
}

export default Products;
