import { Customer } from "./customer";
import { Brandy } from "./brandy";

export class OrderPage<Order> {
    content: Order[];
    constructor(){
      this.content=[]
    }
  }

export class Order {
    id:number;
    dateOfPurchase:Date;
    quantity:String;
    brandy:Brandy[];
    customer:Customer[];

    constructor(){
      this.id=0;
      this.dateOfPurchase=new Date();
      this.quantity='',
      this.brandy=[],
      this.customer=[]

    }
}
