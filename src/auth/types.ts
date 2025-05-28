import { Address } from "../types";

export interface CustomerSession {
  customerId: string;
  expiresAt: Date;
  testmode: boolean;

  customer: {
    createdAt: Date;
    updatedAt: Date;

    firstName: string;
    lastName: string;
    email: string;
    phone?: string;

    password?: string;
    image?: string;
    metadata?: string;

    stripeCustomerId: string;
    isSubscribedEmail: boolean;
    isSubscribedSMS: boolean;

    address: Address;
  };
}

export interface MagicLinkLoginParams {
  email: string;
  callbackUrl: string;
  customValidationUrl: string;
}

export interface MagicLinkSignupParams extends MagicLinkLoginParams {
  firstName: string;
  lastName: string;
}
