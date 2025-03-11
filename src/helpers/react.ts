import type BetterStore from "../index";

export function getCheckoutEmbedProps(betterStore: BetterStore): {
  retrieveCheckout: InstanceType<typeof BetterStore>["checkout"]["retrieve"];
  updateCheckout: InstanceType<typeof BetterStore>["checkout"]["update"];
  getShippingRates: InstanceType<
    typeof BetterStore
  >["checkout"]["getShippingRates"];
} {
  return {
    retrieveCheckout: betterStore.checkout.retrieve,
    updateCheckout: betterStore.checkout.update,
    getShippingRates: betterStore.checkout.getShippingRates,
  };
}
