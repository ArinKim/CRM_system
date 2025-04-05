import { Customer } from "../customer/customers";
import { SalesInterface } from "./sales.interface";

export class Sales {
  public id: string;
  public customer: Customer;
  public value: {
    amount: number;
    currency: string;
    date: Date;
  } = {
    amount: 0,
    currency: "AUD",
    date: new Date(),
  };

  constructor(value: SalesInterface) {
    for (const prop in value) {
      this[prop] = value[prop];
    }
  }
  public static fromJson(value: SalesInterface): Sales {
    return new Sales(value);
  }

  public static fromJsonArray(value: SalesInterface[]): Sales[] {
    return value.map((item) => new Sales(item));
  }

  public toString(): string {
    return `Sales: ${this.id} ${this.customer} ${this.value.amount} ${this.value.currency} ${this.value.date}`;
  }

  public toJson(): SalesInterface {
    return {
      id: this.id,
      customer: this.customer,
      value: this.value,
    };
  }
}
