import { createApiClient } from "../utils/axios";
import {
  Collection,
  CollectionWithProducts,
  ListProductsParams,
  Product,
  ProductWithoutVariants,
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

  async retrieve(productId: string): Promise<Product | null> {
    const data: Product = await this.apiClient.get(`/products/${productId}`);

    if (!data) {
      console.error(`Product with id ${productId} not found`);
      return null;
    }

    return data;
  }

  async retrieveBySeoHandle(seoHandle: string): Promise<Product | null> {
    const data: Product = await this.apiClient.get(
      `/products/seoHandle/${seoHandle}`
    );

    if (!data) {
      console.error(`Product with seoHandle ${seoHandle} not found`);
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

  async retrieveCollection(
    collectionId: string
  ): Promise<CollectionWithProducts> {
    const data: CollectionWithProducts = await this.apiClient.get(
      `/collections/id/${collectionId}`
    );

    return data;
  }
}

export default Products;
