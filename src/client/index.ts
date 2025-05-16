import {
  CheckoutSession,
  CheckoutUpdateParams,
  ShippingRate,
} from "../checkout/types";
import {
  CustomerCreateParams,
  Customer as CustomerType,
  CustomerUpdateParams,
} from "../customer/types";
import { createApiClient } from "../utils/axios";

class Client {
  public proxy?: string;

  constructor(proxy?: string) {
    this.proxy = proxy;
  }

  /**
   * Retrieve a checkout session by ID
   */
  async retrieveCheckout(
    clientSecret: string,
    checkoutId: string
  ): Promise<CheckoutSession> {
    const apiClient = createApiClient(clientSecret, this.proxy);
    const data: CheckoutSession = await apiClient.get(
      `/checkout/${checkoutId}`
    );
    return data;
  }

  /**
   * Update a checkout session
   */
  async updateCheckout(
    clientSecret: string,
    checkoutId: string,
    params: CheckoutUpdateParams
  ): Promise<CheckoutSession> {
    const apiClient = createApiClient(clientSecret, this.proxy);
    const data: CheckoutSession = await apiClient.put(
      `/checkout/${checkoutId}`,
      params
    );
    return data;
  }

  /**
   * Apply a discount code to a checkout session
   */
  async applyDiscountCode(
    clientSecret: string,
    checkoutId: string,
    discountCode: string
  ): Promise<CheckoutSession> {
    const apiClient = createApiClient(clientSecret, this.proxy);
    const data: CheckoutSession = await apiClient.post(
      `/checkout/${checkoutId}/discounts/apply`,
      { code: discountCode }
    );
    return data;
  }

  /**
   * Remove a discount code from a checkout session
   */
  async removeDiscount(
    clientSecret: string,
    checkoutId: string,
    discountId: string
  ): Promise<CheckoutSession> {
    const apiClient = createApiClient(clientSecret, this.proxy);
    const data: CheckoutSession = await apiClient.delete(
      `/checkout/${checkoutId}/discounts/${discountId}`
    );
    return data;
  }

  /**
   * Revalidate a checkout session
   */
  async revalidateDiscounts(
    clientSecret: string,
    checkoutId: string
  ): Promise<CheckoutSession> {
    const apiClient = createApiClient(clientSecret, this.proxy);
    const data: CheckoutSession = await apiClient.get(
      `/checkout/${checkoutId}/discounts/revalidate`
    );
    return data;
  }

  /**
   * Get shipping rates for a checkout session
   */
  async getCheckoutShippingRates(
    clientSecret: string,
    checkoutId: string
  ): Promise<ShippingRate[]> {
    const apiClient = createApiClient(clientSecret, this.proxy);
    const data: ShippingRate[] = await apiClient.get(
      `/checkout/shipping/${checkoutId}`
    );
    return data;
  }

  /**
   * Generate payment secret for a checkout session
   */
  async generateCheckoutPaymentSecret(
    clientSecret: string,
    checkoutId: string
  ): Promise<{
    paymentSecret: string;
    publicKey: string;
    checkoutSession: CheckoutSession;
  }> {
    const apiClient = createApiClient(clientSecret, this.proxy);
    const data: {
      paymentSecret: string;
      publicKey: string;
      checkoutSession: CheckoutSession;
    } = await apiClient.post(`/checkout/payment/${checkoutId}`);
    return {
      paymentSecret: data.paymentSecret,
      publicKey: data.publicKey,
      checkoutSession: data.checkoutSession,
    };
  }

  /**
   * Create a new customer
   */
  async createCustomer(
    clientSecret: string,
    params: CustomerCreateParams
  ): Promise<CustomerType> {
    const apiClient = createApiClient(clientSecret, this.proxy);
    const data: CustomerType = await apiClient.post("/customer", params);
    return data;
  }

  /**
   * Retrieve a customer by ID or email
   */
  async retrieveCustomer(
    clientSecret: string,
    idOrEmail: string
  ): Promise<CustomerType> {
    const apiClient = createApiClient(clientSecret, this.proxy);
    const data: CustomerType = await apiClient.get(`/customer/${idOrEmail}`);

    if (!data) {
      throw new Error("Customer not found");
    }

    return data;
  }

  /**
   * Update a customer
   */
  async updateCustomer(
    clientSecret: string,
    customerId: string,
    params: CustomerUpdateParams
  ): Promise<CustomerType> {
    const apiClient = createApiClient(clientSecret, this.proxy);
    const data: CustomerType = await apiClient.put(
      `/customer/${customerId}`,
      params
    );
    return data;
  }
}

export default Client;
