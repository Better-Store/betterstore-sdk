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
   * Update a checkout session
   */
  async applyDiscountCode(
    clientSecret: string,
    checkoutId: string,
    discountCode: string
  ): Promise<CheckoutSession> {
    const apiClient = createApiClient(clientSecret, this.proxy);
    const data: CheckoutSession = await apiClient.post(
      `/checkout/${checkoutId}/discount`,
      { code: discountCode }
    );
    return data;
  }

  /**
   * Update a checkout session
   */
  async revalidateDiscounts(
    clientSecret: string,
    checkoutId: string
  ): Promise<CheckoutSession> {
    const apiClient = createApiClient(clientSecret, this.proxy);
    const data: CheckoutSession = await apiClient.get(
      `/checkout/${checkoutId}/revalidate-discounts`
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
  async generateCheckoutsPaymentSecret(
    clientSecret: string,
    checkoutId: string
  ): Promise<{
    paymentSecret: string;
    publicKey: string;
  }> {
    const apiClient = createApiClient(clientSecret, this.proxy);
    const data: {
      paymentSecret: string;
      publicKey: string;
    } = await apiClient.post(`/checkout/payment/${checkoutId}`);
    return {
      paymentSecret: data.paymentSecret,
      publicKey: data.publicKey,
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
