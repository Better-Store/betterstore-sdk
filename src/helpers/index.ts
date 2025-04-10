import { createApiClient } from "../utils/axios";

class Helpers {
  private apiClient: ReturnType<typeof createApiClient>;

  constructor(apiKey: string, proxy?: string) {
    this.apiClient = createApiClient(apiKey, proxy);
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
    const data: number | undefined = await this.apiClient.get(
      `/helpers/exchange-rate?baseCurrency=${baseCurrency}&targetCurrency=${targetCurrency}`
    );

    if (!data) {
      throw new Error("Could not get exchange rate");
    }

    return data;
  }
}

export default Helpers;
