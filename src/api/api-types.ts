// Add types for api functions (Request & Response) here...
export type Country = {
  name: string;
  code: string;
  flag: string;
};
export interface AddNewCardRequest {
  paymentMethodId: string;
  lastDigits: string;
  brand: string;
  billingAddress: {
    region: string;
    stateOrProvince: string;
    city: string;
    address: string;
    postalCode: string;
  };
}
