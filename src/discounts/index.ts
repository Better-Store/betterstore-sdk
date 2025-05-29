import { createApiClient } from "../utils/axios";
import { Discount, ListDiscountsParams, RetrieveDiscountParams } from "./types";

class Discounts {
  private apiClient: ReturnType<typeof createApiClient>;

  constructor(apiKey: string, proxy?: string) {
    this.apiClient = createApiClient(apiKey, proxy);
  }

  async list(params?: ListDiscountsParams): Promise<Discount[]> {
    const queryParams = new URLSearchParams();

    if (params) {
      queryParams.set("params", JSON.stringify(params));
    }

    const data: Discount[] = await this.apiClient.get(
      `/discounts?${queryParams.toString()}`
    );

    return data;
  }

  async retrieve(params: RetrieveDiscountParams): Promise<Discount | null> {
    if ("code" in params) {
      const data: Discount = await this.apiClient.get(
        `/discounts/code/${params.code}`
      );

      if (!data) {
        console.error(`Discount with code ${params.code} not found`);
        return null;
      }

      return data;
    }

    const data: Discount = await this.apiClient.get(
      `/discounts/id/${params.id}`
    );

    if (!data) {
      console.error(`Discount with id ${params.id} not found`);
      return null;
    }

    return data;
  }
}

export default Discounts;
