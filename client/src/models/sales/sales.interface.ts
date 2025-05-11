import { Customer } from "../customer/customer";

export interface SalesInterface {
  id: string;
  customer?: Customer;
  value: {
    amount: number;
    currency: string;
    date: Date;
  };
}
