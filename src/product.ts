import { createApiClient } from "./utils/axios";

interface VariantOption {
  name: string;
  value: string;
}

interface ProductVariant {
  sku: string;
  images: string[];
  stockAvailable: number;
  stockCommited: number;
  stockUnavailable: number;
  priceInCents: number;
  productId: string;
  variantOptions: VariantOption[];
}

interface ProductOption {
  name: string;
  values: string[];
}

enum ProductStatus {
  DRAFT = "DRAFT",
  ACTIVE = "ACTIVE",
  ARCHIVED = "ARCHIVED",
}

interface Product {
  id: string;
  title: string;
  description?: string;
  images: string[];
  category: string;
  tags: string[];

  isPhysical: boolean;
  weightInGrams?: number;
  heightInCm?: number;
  widthInCm?: number;
  lengthInCm?: number;

  priceInCents: number;

  stockAvailable: number;
  stockCommited: number;
  stockUnavailable: number;

  status: ProductStatus;

  options: ProductOption[];
  productVariants: ProductVariant[];
}

class Product {
  private apiClient: ReturnType<typeof createApiClient>;

  constructor(apiKey: string) {
    this.apiClient = createApiClient(apiKey);
  }

  async list(): Promise<Omit<Product, "productVariants">[]> {
    const data: Omit<Product, "productVariants">[] =
      await this.apiClient.get("/products");

    return data;
  }

  async retrieve(productId: string): Promise<Product> {
    const data: Product = await this.apiClient.get(`/products/${productId}`);

    if (!data) {
      throw new Error("Product not found");
    }

    return data;
  }
}

export default Product;
