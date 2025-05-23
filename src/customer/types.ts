export type Address = {
  name: string;
  company?: string;
  line1: string;
  line2?: string;
  city: string;
  state?: string;
  country: string;
  countryCode: string;
  zipCode: string;
  phone: string;
};

export interface CustomerCreateParams {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: Address;
  isSubscribedEmail?: boolean;
  isSubscribedSMS?: boolean;
}

export interface CustomerUpdateParams {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: Address;
  isSubscribedEmail?: boolean;
  isSubscribedSMS?: boolean;
}

export interface Customer extends CustomerCreateParams {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerSubscription {
  cancelAtPeriodEnd: boolean;
}

export type CustomerSubscriptionUpdateParams = Partial<
  Pick<CustomerSubscription, "cancelAtPeriodEnd">
>;
