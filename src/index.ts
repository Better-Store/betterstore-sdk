import Checkout from "./checkout";

class BetterStore {
  public checkout: Checkout;
  private apiKey: string;

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error("API key is required.");
    }

    this.apiKey = apiKey;
    this.checkout = new Checkout(apiKey);
  }
}

export default BetterStore;
