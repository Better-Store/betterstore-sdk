import BetterStore from "../index";

export function getCheckoutEmbedProps(betterStore: BetterStore) {
  return {
    retrieveCheckout: betterStore.checkout.retrieve,
    updateCheckout: betterStore.checkout.update,
    getShippingRates: betterStore.checkout.getShippingRates,
  };
}
