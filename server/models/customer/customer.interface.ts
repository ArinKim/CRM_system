import { User } from "../user/users";

export interface CustomerInterface {
    name: string;
    company: {
        type: string,
        ref: User
    };
    service?: string;
    email: string;
    phone?: string;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
}