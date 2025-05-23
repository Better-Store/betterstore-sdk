import { createApiClient } from "../utils/axios";
import {
  CustomerCreateParams,
  CustomerSubscription,
  CustomerSubscriptionUpdateParams,
  Customer as CustomerType,
  CustomerUpdateParams,
} from "./types";

class Customer {
  private apiClient: ReturnType<typeof createApiClient>;

  constructor(apiKey: string, proxy?: string) {
    this.apiClient = createApiClient(apiKey, proxy);
  }

  /**
   * Create a new customer
   */
  async create(params: CustomerCreateParams): Promise<CustomerType> {
    const data: CustomerType = await this.apiClient.post("/customer", params);
    return data;
  }

  /**
   * Retrieve a customer by ID or email
   */
  async retrieve(idOrEmail: string): Promise<CustomerType> {
    const data: CustomerType = await this.apiClient.get(
      `/customer/${idOrEmail}`
    );

    if (!data) {
      throw new Error("Customer not found");
    }

    return data;
  }

  /**
   * Update a customer
   */
  async update(
    customerId: string,
    params: CustomerUpdateParams
  ): Promise<CustomerType> {
    const data: CustomerType = await this.apiClient.put(
      `/customer/${customerId}`,
      params
    );
    return data;
  }

  /**
   * Delete a customer
   */
  async delete(customerId: string): Promise<void> {
    await this.apiClient.delete(`/customer/${customerId}`);
  }

  /**
   * Delete a customer
   */
  async updateCustomerSubscription(
    stripeSubscriptionId: string,
    params: CustomerSubscriptionUpdateParams
  ): Promise<CustomerSubscription> {
    const data: CustomerSubscription = await this.apiClient.put(
      `/customer/subscription/${stripeSubscriptionId}`,
      params
    );

    return data;
  }
}

export default Customer;
