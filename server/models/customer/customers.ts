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

  constructor(initializer?: any) {
    if (!initializer) return;
    if (initializer.id) this.id = initializer.id;
    if (initializer.company) this.company = initializer.company;
    if (initializer.service) this.service = initializer.service;
    if (initializer.email) this.email = initializer.email;
    if (initializer.phone) this.phone = initializer.phone;
    if (initializer.status !== undefined) this.status = initializer.status;
    if (initializer.createdAt) this.createdAt = new Date(initializer.createdAt);
    if (initializer.updatedAt) this.updatedAt = new Date(initializer.updatedAt);
  }

  public static fromJson(value: CustomerInterface): Customer {
    return new Customer(value);
  }

  public static fromJsonArray(value: CustomerInterface[]): Customer[] {
    return value.map((item) => new Customer(item));
  }

  public static getKeyList(): string[] {
    return [
      "id",
      "company",
      "service",
      "email",
      "phone",
      "status",
      "createdAt",
      "updatedAt",
    ];
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
