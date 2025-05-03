import { createApiClient } from "../utils/axios";
import {
  Collection,
  CollectionWithProducts,
  Product,
  ProductWithoutVariants,
} from "./types";

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

  async retrieve(productId: string): Promise<Product | null> {
    const data: Product = await this.apiClient.get(`/products/${productId}`);

    if (!data) {
      console.error(`Product with id ${productId} not found`);
      return null;
    }

    return data;
  }

  async listCollections(): Promise<Collection[]> {
    const data: Collection[] = await this.apiClient.get("/collections");

    return data;
  }

  async retrieveCollectionBySeoHandle(
    collectionSeoHandle: string
  ): Promise<CollectionWithProducts> {
    const data: CollectionWithProducts = await this.apiClient.get(
      `/collections/${collectionSeoHandle}`
    );

    return data;
  }

  async retrieveCollectionById(
    collectionId: string
  ): Promise<CollectionWithProducts> {
    const data: CollectionWithProducts = await this.apiClient.get(
      `/collections/id/${collectionId}`
    );

    return data;
  }
}

export default Products;
