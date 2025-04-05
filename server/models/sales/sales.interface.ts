import { Customer } from "../customer/customers";

export interface SalesInterface {
  id: string;
  customer: Customer;
  value: {
    amount: number;
    currency: string;
    date: Date;
  };
}
