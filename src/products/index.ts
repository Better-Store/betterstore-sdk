import { createApiClient } from "../utils/axios";
import { Product } from "./types";

class Products {
  private apiClient: ReturnType<typeof createApiClient>;

  constructor(apiKey: string) {
    this.apiClient = createApiClient(apiKey);
  }

  async list(): Promise<Omit<Product, "productVariants">[]> {
    const data: Omit<Product, "productVariants">[] =
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
