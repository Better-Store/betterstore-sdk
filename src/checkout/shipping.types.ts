export type ShippingRate = ZasilkovnaRate;

export interface BaseRate {
  provider: string;
  price: number;
}

export interface ZasilkovnaRate extends BaseRate {
  provider: "zasilkovna";
  clientSecret: string;
}
