import { User } from "./user";

export interface Customer extends User{
    firstName: number,
    lastName: string,
    email: string
}