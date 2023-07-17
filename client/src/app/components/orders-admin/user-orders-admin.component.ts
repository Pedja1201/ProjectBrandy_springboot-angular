import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Brandy } from 'src/app/model/brandy';
import { Order } from 'src/app/model/order';
import { BrandyServiceService } from 'src/app/service/brandies/brandy-service.service';
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
  physicalDelete = false

  constructor(private o:OrderService, private brandyService:BrandyServiceService, private router:Router) {}

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

  deleteLogical(o:Order){
    if(o.confirm == true){
      this.physicalDelete = true;
      o.confirm = false
      this.o.update(o.id, o).subscribe(x=>{
        this.getAll()
      })
    }
  }

  closeOrderNotification(){
    this.process = false
  }

  getBrandyByName(name:String){
    this.brandyService.getBrandyByName(name).subscribe((x:Brandy)=>{
      console.log(x)
      this.router.navigate(['/aboutBrandy', {objDetails: JSON.stringify(x)}], { queryParams:  x , skipLocationChange: true});
    })
  }
}
