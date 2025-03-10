import { createApiClient } from "./utils/axios";

export interface LineItem {
  quantity: number;
  productId?: string;
  variantOptions: { name: string; value: string }[];
  discountId?: string;
}

export interface CheckoutCreateParams {
  type: "hosted" | "embed";
  customerId?: string;
  lineItems: LineItem[];
}

export interface CheckoutUpdateParams {
  email?: string;
  phone?: string;
  lineItems?: LineItem[];
  customerId?: string;
}

export interface ShippingRate {
  id: string;
  rate: number;
  provider: string;
  service: string;
  estimatedDays: number;
}

export interface Address {
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

export interface CheckoutSession {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email?: string;
  phone?: string;
  clientSecret: string;
  lineItems: {
    quantity: number;
    discount?: any; // Match the Discount type if needed
    variantOptions: { name: string; value: string }[];
    product?: {
      id: string;
      title: string;
      description?: string;
      images: string[];
      category: string;
      tags: string[];
      priceInCents: number;
    };
  }[];
  total?: number;
  subtotal?: number;
  tax?: number;
  shipping?: number;
  currency: string;
  status:
    | "IN_PROGRESS"
    | "PAYMENT_PENDING"
    | "ABANDONED"
    | "CANCELED"
    | "FAILED";
  customer?: {
    address?: Address;
    email?: string;
  };
}

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
   * Retrieve a checkout session by ID or client secret
   */
  async retrieve(idOrSecret: string): Promise<CheckoutSession> {
    const data: CheckoutSession = await this.apiClient.get(
      `/checkout/${idOrSecret}`
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
