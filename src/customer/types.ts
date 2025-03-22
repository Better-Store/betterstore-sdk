export interface CustomerAddress {
  name: string;
  company?: string;
  address: string;
  city: string;
  state: string;
  country: string;
  apartment?: string;
  postalCode: string;
  phone: string;
}

export interface CustomerCreateParams {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: CustomerAddress;
  isSubscribedEmail?: boolean;
  isSubscribedSMS?: boolean;
}

export interface CustomerUpdateParams {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: CustomerAddress;
  isSubscribedEmail?: boolean;
  isSubscribedSMS?: boolean;
}

export interface Customer extends CustomerCreateParams {
  id: string;
  createdAt: string;
  updatedAt: string;
}
