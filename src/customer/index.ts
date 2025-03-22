import { createApiClient } from "../utils/axios";
import {
  CustomerCreateParams,
  Customer as CustomerType,
  CustomerUpdateParams,
} from "./types";

class Customer {
  private apiClient: ReturnType<typeof createApiClient>;

  constructor(apiKey: string) {
    this.apiClient = createApiClient(apiKey);
  }

  /**
   * Create a new customer
   */
  async create(params: CustomerCreateParams): Promise<CustomerType> {
    const data: CustomerType = await this.apiClient.post("/customers", params);
    return data;
  }

  /**
   * Retrieve a customer by ID or email
   */
  async retrieve(idOrEmail: string): Promise<CustomerType> {
    const data: CustomerType = await this.apiClient.get(
      `/customers/${idOrEmail}`
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
      `/customers/${customerId}`,
      params
    );
    return data;
  }

  /**
   * Delete a customer
   */
  async delete(customerId: string): Promise<void> {
    await this.apiClient.delete(`/customers/${customerId}`);
  }
}

export default Customer;
