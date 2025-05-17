import { createApiClient } from "../utils/axios";
import {
  CheckoutCreateParams,
  CheckoutSession,
  CheckoutUpdateParams,
  ShippingRate,
} from "./types";

class Checkout {
  private apiClient: ReturnType<typeof createApiClient>;

  constructor(apiKey: string, proxy?: string) {
    this.apiClient = createApiClient(apiKey, proxy);
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
   * Apply a discount code to a checkout session
   */
  async applyDiscountCode(
    checkoutId: string,
    discountCode: string
  ): Promise<CheckoutSession> {
    const data: CheckoutSession = await this.apiClient.post(
      `/checkout/${checkoutId}/discounts/apply`,
      { code: discountCode }
    );
    return data;
  }

  /**
   * Remove a discount  from a checkout session
   */
  async removeDiscount(
    checkoutId: string,
    discountId: string
  ): Promise<CheckoutSession> {
    const data: CheckoutSession = await this.apiClient.delete(
      `/checkout/${checkoutId}/discounts/${discountId}`
    );
    return data;
  }

  /**
   * Revalidate a checkout session
   */
  async revalidateDiscounts(checkoutId: string): Promise<CheckoutSession> {
    const data: CheckoutSession = await this.apiClient.get(
      `/checkout/${checkoutId}/discounts/revalidate`
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
  async generatePaymentSecret(checkoutId: string): Promise<{
    paymentSecret: string;
    publicKey: string;
    checkoutSession: CheckoutSession;
  }> {
    const data: {
      paymentSecret: string;
      publicKey: string;
      checkoutSession: CheckoutSession;
    } = await this.apiClient.post(`
      /checkout/payment/${checkoutId}`);
    return {
      paymentSecret: data.paymentSecret,
      publicKey: data.publicKey,
      checkoutSession: data.checkoutSession,
    };
  }
}

export default Checkout;
