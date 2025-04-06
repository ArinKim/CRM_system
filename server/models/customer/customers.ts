import { User } from "../user/users";
import { CustomerInterface } from "./customer.interface";

export class Customer {
  public id: string;
  public company: string;
  public service: string;
  public email: string;
  public phone: string;
  public status: boolean = false;
  public createdAt: Date = new Date();
  public updatedAt: Date = new Date();

  constructor(value: CustomerInterface) {
    for (const prop in value) {
      this[prop] = value[prop];
    }
  }
  public static fromJson(value: CustomerInterface): Customer {
    return new Customer(value);
  }

  public static fromJsonArray(value: CustomerInterface[]): Customer[] {
    return value.map((item) => new Customer(item));
  }

  public toString(): string {
    return `Customer: ${this.id} ${this.company} ${this.service} ${this.email} ${this.phone} ${this.status} ${this.createdAt} ${this.updatedAt}`;
  }

  public isEmpty(): boolean {
    return !this.company && !this.service && !this.email && !this.phone;
  }

  public toJson(): CustomerInterface {
    return {
      id: this.id,
      company: this.company,
      service: this.service,
      email: this.email,
      phone: this.phone,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
