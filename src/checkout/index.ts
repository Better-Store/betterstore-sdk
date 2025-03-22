import { createApiClient } from "../utils/axios";
import {
  CheckoutCreateParams,
  CheckoutSession,
  CheckoutUpdateParams,
  ShippingRate,
} from "./types";

class Checkout {
  private apiClient: ReturnType<typeof createApiClient>;

  constructor(apiKey: string) {
    this.apiClient = createApiClient(apiKey);
  }

  /**
   * Create a new checkout session
   */
  async create(params: CheckoutCreateParams): Promise<CheckoutSession> {
    const data: CheckoutSession = await this.apiClient.post(
      "/checkout",
      params
    );
    return data;
  }

  /**
   * Retrieve a checkout session by ID
   */
  async retrieve(checkoutId: string): Promise<CheckoutSession> {
    const data: CheckoutSession = await this.apiClient.get(
      `/checkout/${checkoutId}`
    );
    return data;
  }

  /**
   * Update a checkout session
   */
  async update(
    checkoutId: string,
    params: CheckoutUpdateParams
  ): Promise<CheckoutSession> {
    const data: CheckoutSession = await this.apiClient.put(
      `/checkout/${checkoutId}`,
      params
    );
    return data;
  }

  /**
   * Get shipping rates for a checkout session
   */
  async getShippingRates(checkoutId: string): Promise<ShippingRate[]> {
    const data: ShippingRate[] = await this.apiClient.get(
      `/checkout/shipping/${checkoutId}`
    );
    return data;
  }

  /**
   * Generate payment secret for a checkout session
   */
  async generatePaymentSecret(checkoutId: string): Promise<string> {
    const data: string = await this.apiClient.post(
      `/checkout/payment/${checkoutId}`
    );
    return data;
  }
}

export default Checkout;
