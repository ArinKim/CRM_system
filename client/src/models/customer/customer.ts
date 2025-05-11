import { CustomerInterface } from "./customer.interface";

export class Customer {
  public id: string;
  public name: string;
  public service: string;
  public email: string;
  public phone: string;
  public status: "active" | "inactive" = "inactive";
  public type: "individual" | "business" = "individual";
  public createdAt: Date = new Date();
  public updatedAt: Date = new Date();
  public lastContact: Date = new Date();

  constructor(initializer?: any) {
    if (!initializer) return;
    if (initializer.id) this.id = initializer.id;
    if (initializer.name) this.name = initializer.name;
    if (initializer.service) this.service = initializer.service;
    if (initializer.email) this.email = initializer.email;
    if (initializer.phone) this.phone = initializer.phone;
    if (initializer.status !== undefined) this.status = initializer.status;
    if (initializer.createdAt) this.createdAt = new Date(initializer.createdAt);
    if (initializer.updatedAt) this.updatedAt = new Date(initializer.updatedAt);
    if (initializer.lastContact)
      this.lastContact = new Date(initializer.lastContact);
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
      "name",
      "service",
      "email",
      "phone",
      "status",
      "type",
      "createdAt",
      "updatedAt",
      "lastContact",
    ];
  }

  public toString(): string {
    return `Customer: ${this.id} ${this.name} ${this.service} ${this.email} ${this.phone} ${this.status} ${this.type} ${this.createdAt} ${this.updatedAt} ${this.lastContact}`;
  }

  public isEmpty(): boolean {
    return !this.name && !this.service && !this.email && !this.phone;
  }

  public toJson(): CustomerInterface {
    return {
      id: this.id,
      name: this.name,
      service: this.service,
      email: this.email,
      phone: this.phone,
      status: this.status,
      type: this.type,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      lastContact: this.lastContact,
    };
  }
}
