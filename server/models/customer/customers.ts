import { User } from '../user/users';
import { CustomerInterface } from './customer.interface';

export class Customer {
    public name: string;
    public company: {
        type: string,
        ref: User
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
        return `Customer: ${this.name} ${this.company} ${this.service} ${this.email} ${this.phone} ${this.status} ${this.createdAt} ${this.updatedAt}`;
    }

    public toJson(): CustomerInterface {
        return {
            name: this.name,
            company: this.company,
            service: this.service,
            email: this.email,
            phone: this.phone,
            status: this.status,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
    
}