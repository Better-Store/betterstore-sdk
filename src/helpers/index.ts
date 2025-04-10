import axios from "axios";

class Helpers {
  public proxy?: string;

  constructor(proxy?: string) {
    this.proxy = proxy;
  }

  formatPrice(
    priceInCents: number,
    currency: string,
    exchangeRate?: number
  ): string {
    const amount = (priceInCents / 100) * (exchangeRate ?? 1);
    const isWhole = amount % 1 === 0;
    const formattedPrice = new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
      minimumFractionDigits: isWhole ? 0 : 2,
      maximumFractionDigits: isWhole ? 0 : 2,
    }).format(amount);

    return formattedPrice;
  }

  async getExchangeRate(
    baseCurrency: string,
    targetCurrency: string
  ): Promise<number> {
    const { data } = await axios.get(
      `https://api.exchangerate-api.com/v4/latest/${baseCurrency}`
    );

    const rate = data.rates[targetCurrency];

    if (!rate) {
      throw new Error("Could not get exchange rate for target currency");
    }

    return rate;
  }
}

export default Helpers;
