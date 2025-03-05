interface BaseCheckoutParams {
  line_items: {
    productId: string;
    variantOptions?: { name: string; value: string }[];
    quantity: number;
  }[];
  discount: string;
}

interface HostedCheckoutParams extends BaseCheckoutParams {
  type: "hosted";
  successUrl: string;
  cancelUrl: string;
}
interface EmbedCheckoutParams extends BaseCheckoutParams {
  type: "embed";
}

class Checkout {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async create(params: HostedCheckoutParams | EmbedCheckoutParams) {
    const lineItems = params.line_items.map((item) => {
      return {
        ...item,
        variant_options: item.variantOptions ?? [],
      };
    });

    const response = await fetch("https://betterstore.io/api/checkout", {
      method: "POST",
      body: JSON.stringify({
        type: params.type,
        line_items: lineItems,
        discount: params.discount,
        ...(params.type === "hosted" && {
          success_url: params.successUrl,
          cancel_url: params.cancelUrl,
        }),
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
    });
    const data = await response.json();

    if (params.type === "hosted") {
      const checkoutId = data.checkoutId;

      if (!checkoutId) {
        throw new Error("Failed to create checkout");
      }

      const searchParams = new URLSearchParams({
        successUrl: params.successUrl,
        cancelUrl: params.cancelUrl,
      });

      return `https://checkout.betterstore.io/${checkoutId}?${searchParams.toString()}`;
    }

    const clientSecret = data.clientSecret;

    if (!clientSecret) {
      throw new Error("Failed to create checkout");
    }

    return { client_secret: clientSecret };
  }
}

export default Checkout;
