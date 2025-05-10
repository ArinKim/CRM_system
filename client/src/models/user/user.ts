import { UserInterface } from "./user.interface";

export class User {
  public username: string;
  public uid: string; //mandatory property
  public email: string; //mandatory property
  public role: string = "staff"; //optional parameter with default value
  public country: string = "Australia"; //optional parameter with default value
  public lastLogin: Date = new Date("1900-01-01");

  constructor(initializer?: any) {
    if (!initializer) return;
    if (initializer.username) this.username = initializer.username;
    if (initializer.uid) this.uid = initializer.uid;
    if (initializer.email) this.email = initializer.email;
    if (initializer.role) this.role = initializer.role;
    if (initializer.country) this.country = initializer.country;
    if (initializer.lastLogin) this.lastLogin = new Date(initializer.lastLogin);
  }

  public toString(): string {
    return `User: ${this.username} ${this.email} ${this.role} ${this.country}`;
  }

  public toJson(): UserInterface {
    return {
      uid: this.uid,
      username: this.username,
      role: this.role,
      email: this.email,
      country: this.country,
      lastLogin: this.lastLogin,
    };
  }
}
