export interface CustomerInterface {
  id: string;
  name: string;
  service?: string;
  email: string;
  phone?: string;
  status: "active" | "inactive";
  type: "individual" | "business";
  createdAt?: Date;
  updatedAt?: Date;
  lastContact?: Date;
}
