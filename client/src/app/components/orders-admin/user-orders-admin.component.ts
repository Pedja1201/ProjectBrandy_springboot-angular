import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/service/order/order.service';

@Component({
  selector: 'app-user-orders-admin',
  templateUrl: './user-orders-admin.component.html',
  styleUrls: ['./user-orders-admin.component.css']
})
export class UserOrdersAdminComponent implements OnInit{

  orders:Order[]=[];
  order = true
  process = false

  constructor(private o:OrderService) {}

  ngOnInit(): void {
   this.getAll()
  }

  getAll(){
    this.o.getAll().subscribe(x=>{
      this.total(x)
    })
  }

  total(or: Order[]){
    if(or.length < 1){
      this.order=false
      this.process = true
    }
      for(let o of or){
        o.total = Number(o.quantity) * o.brandy.price
      }
      this.orders = or
    }
  
  delete(id: number){
    this.o.delete(id).subscribe(x=>{
      this.getAll()
      console.log("Order obrisan")
    })
  }

  closeOrderNotification(){
    this.process = false
  }
}
