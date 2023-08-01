import { User } from "./user";

export class CustomerPage<Customer>{
    content: Customer[];
    totalPages: number;

    constructor(){
        this.content = [];
        this.totalPages = 0
      }
}

export interface Customer extends User{
    firstName: number,
    lastName: string,
    email: string
}
