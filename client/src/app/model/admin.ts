import { User } from "./user";

export class AdminPage<Admin>{
    content:Admin[];
    totalPages:number;

    constructor(){
        this.content=[];
        this.totalPages = 0;
    }
}

export interface Admin extends User{
    firstName: number,
    lastName: string,
    email: string,
    upin: string;
}
