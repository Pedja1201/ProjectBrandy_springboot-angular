import { User } from "./user";

export interface Admin extends User{
    firstName: number,
    lastName: string,
    email: string,
    upin: string;
}