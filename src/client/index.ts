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
  /**
   * Retrieve a checkout session by ID
   */
  async retrieveCheckout(
    clientSecret: string,
    checkoutId: string
  ): Promise<CheckoutSession> {
    const apiClient = createApiClient(clientSecret);
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
    const apiClient = createApiClient(clientSecret);
    const data: CheckoutSession = await apiClient.put(
      `/checkout/${checkoutId}`,
      params
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
    const apiClient = createApiClient(clientSecret);
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
  ): Promise<string> {
    const apiClient = createApiClient(clientSecret);
    const data: string = await apiClient.post(
      `/checkout/payment/${checkoutId}`
    );
    return data;
  }

  /**
   * Create a new customer
   */
  async createCustomer(
    clientSecret: string,
    params: CustomerCreateParams
  ): Promise<CustomerType> {
    const apiClient = createApiClient(clientSecret);
    const data: CustomerType = await apiClient.post("/customers", params);
    return data;
  }

  /**
   * Retrieve a customer by ID or email
   */
  async retrieveCustomer(
    clientSecret: string,
    idOrEmail: string
  ): Promise<CustomerType> {
    const apiClient = createApiClient(clientSecret);
    const data: CustomerType = await apiClient.get(`/customers/${idOrEmail}`);

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
    const apiClient = createApiClient(clientSecret);
    const data: CustomerType = await apiClient.put(
      `/customers/${customerId}`,
      params
    );
    return data;
  }
}

export default Client;
