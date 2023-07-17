import { Brandy } from "./brandy";
import { Customer } from "./customer";

export interface Order{
    id:number;
    quantity:string;
    dateOfPurchase:Date;
    customer:Customer;
    brandy:Brandy;
    total?:number;
    confirm:boolean;
}