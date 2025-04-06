import { Customer } from "../customer/customers";

export interface UserInterface {
  uid: string;
  username: string;
  occupation?: string;
  email: string;
  country?: string;
  company?: {
    service: string; // Business category
    ref: Customer; // Reference to the Customer model
  };
}
