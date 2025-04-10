import Checkout from "./checkout";
import Client from "./client";
import Customer from "./customer";
import Helpers from "./helpers";
import Products from "./products";

export default function betterStore(config: {
  apiKey: string;
  proxy?: string;
}) {
  if (!config.apiKey) {
    throw new Error("API key is required.");
  }

  return {
    checkout: new Checkout(config.apiKey, config.proxy),
    products: new Products(config.apiKey, config.proxy),
    customer: new Customer(config.apiKey, config.proxy),
    helpers: new Helpers(config.apiKey, config.proxy),
  };
}

export function createStoreClient(config: { proxy?: string }) {
  return new Client(config.proxy);
}

export * from "./types";
