import Checkout from "./checkout";
import Customer from "./customer";
import Products from "./products";

class BetterStore {
  public checkout: Checkout;
  public products: Products;
  public customer: Customer;
  // private apiKey: string;

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error("API key is required.");
    }

    // this.apiKey = apiKey;
    this.checkout = new Checkout(apiKey);
    this.products = new Products(apiKey);
    this.customer = new Customer(apiKey);
  }
}

export default BetterStore;
export * from "./proxies";
