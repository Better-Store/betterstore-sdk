import { createApiClient } from "./utils/axios";

interface CustomerAddress {
  name: string;
  company?: string;
  address: string;
  city: string;
  state: string;
  country: string;
  apartment?: string;
  postalCode: string;
  phone: string;
}

interface CustomerCreateParams {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: CustomerAddress;
  isSubscribedEmail?: boolean;
  isSubscribedSMS?: boolean;
}

interface CustomerUpdateParams {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: CustomerAddress;
  isSubscribedEmail?: boolean;
  isSubscribedSMS?: boolean;
}

interface Customer extends CustomerCreateParams {
  id: string;
  createdAt: string;
  updatedAt: string;
}

class Customer {
  private apiClient: ReturnType<typeof createApiClient>;

  constructor(apiKey: string) {
    this.apiClient = createApiClient(apiKey);
  }

  /**
   * Create a new customer
   */
  async create(params: CustomerCreateParams): Promise<Customer> {
    const data: Customer = await this.apiClient.post("/customers", params);
    return data;
  }

  /**
   * Retrieve a customer by ID or email
   */
  async retrieve(idOrEmail: string): Promise<Customer> {
    const data: Customer = await this.apiClient.get(`/customers/${idOrEmail}`);

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
  ): Promise<Customer> {
    const data: Customer = await this.apiClient.put(
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
