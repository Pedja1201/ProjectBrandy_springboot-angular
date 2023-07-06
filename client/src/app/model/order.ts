import { Brandy } from "./brandy";
import { Customer } from "./customer";

export interface Order{
    id:number;
    quantity:String;
    dateOfPurchase:Date;
    customer:Customer;
    brandy:Brandy;
}