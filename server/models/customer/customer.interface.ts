import { User } from "../user/users";

export interface CustomerInterface {
  id: string;
  name: string;
  company: {
    type: string;
    ref: User;
  };
  service?: string;
  email: string;
  phone?: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}
