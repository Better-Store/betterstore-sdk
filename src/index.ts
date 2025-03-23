import Checkout from "./checkout";
import Client from "./client";
import Customer from "./customer";
import Products from "./products";

export default function betterStore(config: { apiKey: string }) {
  if (!config.apiKey) {
    throw new Error("API key is required.");
  }

  return {
    checkout: new Checkout(config.apiKey),
    products: new Products(config.apiKey),
    customer: new Customer(config.apiKey),
  };
}

export function createStoreClient() {
  return new Client();
}

export * from "./types";
