import Checkout from "./checkout";
import Customer from "./customer";
import Product from "./product";

class BetterStore {
  public checkout: Checkout;
  public product: Product;
  public customer: Customer;
  // private apiKey: string;

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error("API key is required.");
    }

    // this.apiKey = apiKey;
    this.checkout = new Checkout(apiKey);
    this.product = new Product(apiKey);
    this.customer = new Customer(apiKey);
  }
}

export default BetterStore;
