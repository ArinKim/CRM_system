import { User } from "../user/users";
import { CustomerInterface } from "./customer.interface";

export class Customer {
  public id: string; //mandatory property
  public name: string; //mandatory property
  public company: {
    //mandatory property
    type: string;
    ref: User;
  };
  public service: string;
  public email: string;
  public phone: string;
  public status: boolean;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(value: CustomerInterface) {
    for (const prop in value) {
      this[prop] = value[prop];
    }
  }

  public toString(): string {
    return `Customer: ${this.id} ${this.name} ${this.company} ${this.service} ${this.email} ${this.phone} ${this.status} ${this.createdAt} ${this.updatedAt}`;
  }

  public toJson(): CustomerInterface {
    return {
      id: this.id,
      name: this.name,
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
