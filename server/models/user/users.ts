import { UserInterface } from './user.interface';

export class User {
    public username: string;
    public uid: string;       //mandatory property
    public email: string;       //mandatory property
    public occupation: string = 'staff';    //optional parameter with default value
    public country: string = 'Australia'  //optional parameter with default value

    constructor(value: UserInterface) {
        for (const prop in value) {
            this[prop] = value[prop];
        }
    }

    public toString(): string {
        return `User: ${this.username} ${this.email} ${this.occupation} ${this.country}`;
    }

    public toJson(): UserInterface {
        return {
            uid: this.uid,
            username: this.username,
            occupation: this.occupation,
            email: this.email,
            country: this.country
        };
    }
    
}