import { Brandy } from "./brandy";
import { Customer } from "./customer";

export class OrderPage<Order> {
    content: Order[];
    totalPages: number;

    constructor(){
        this.content=[];
        this.totalPages = 0
      }
}

export interface Order{
    id:number;
    quantity:string;
    dateOfPurchase:Date;
    customer:Customer;
    brandy:Brandy;
    total?:number;
    confirm:boolean;
}