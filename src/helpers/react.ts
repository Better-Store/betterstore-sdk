import type {
  CheckoutSession,
  CheckoutUpdateParams,
  ShippingRate,
} from "../checkout";
import type BetterStore from "../index";

export function getCheckoutEmbedProps(betterStore: BetterStore): {
  retrieveCheckout: (idOrSecret: string) => Promise<CheckoutSession>;
  updateCheckout: (
    checkoutId: string,
    params: CheckoutUpdateParams
  ) => Promise<CheckoutSession>;
  getShippingRates: (checkoutId: string) => Promise<ShippingRate[]>;
} {
  return {
    retrieveCheckout: betterStore.checkout.retrieve,
    updateCheckout: betterStore.checkout.update,
    getShippingRates: betterStore.checkout.getShippingRates,
  };
}
