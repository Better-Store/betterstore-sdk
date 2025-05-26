import { createApiClient } from "../utils/axios";
import {
  Collection,
  CollectionWithProducts,
  RetrieveCollectionParams,
} from "./types";

class Collections {
  private apiClient: ReturnType<typeof createApiClient>;

  constructor(apiKey: string, proxy?: string) {
    this.apiClient = createApiClient(apiKey, proxy);
  }

  async list(): Promise<Collection[]> {
    const data: Collection[] = await this.apiClient.get("/collections");

    return data;
  }

  async retrieve(
    params: RetrieveCollectionParams
  ): Promise<CollectionWithProducts | null> {
    if ("seoHandle" in params) {
      const data: CollectionWithProducts = await this.apiClient.get(
        `/collections/${params.seoHandle}`
      );

      if (!data) {
        console.error(
          `Collection with seoHandle ${params.seoHandle} not found`
        );
        return null;
      }

      return data;
    }

    const data: CollectionWithProducts = await this.apiClient.get(
      `/collections/id/${params.id}`
    );

    if (!data) {
      console.error(`Collection with id ${params.id} not found`);
      return null;
    }

    return data;
  }
}

export default Collections;
