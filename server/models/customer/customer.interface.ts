export interface CustomerInterface {
  id: string;
  company: string;
  service?: string;
  email: string;
  phone?: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}
