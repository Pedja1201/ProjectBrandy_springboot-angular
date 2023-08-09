import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Brandy } from 'src/app/model/brandy';
import { Order, OrderPage } from 'src/app/model/order';
import { User } from 'src/app/model/user';
import { BrandyServiceService } from 'src/app/service/brandies/brandy-service.service';
import { OrderService } from 'src/app/service/order/order.service';
import { TokenStorageService } from 'src/app/service/token-storage/token-storage.service';
import { UserServiceService } from 'src/app/service/user/user-service.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  username!: string;
  user!: User;
  orders: OrderPage<Order> = new OrderPage<Order>();
  count!: number;
  count1!: number;
  totalPriceAll!: number;
  showProceed = false;
  process = false;
  confirm = false
  page = 0
  totalPages = 0
  next=true
  previous=true

  constructor(private b:BrandyServiceService,private tokenStorageService: TokenStorageService, private router: Router, private us: UserServiceService, private order: OrderService)
  {
    this.totalPriceAll = 0
  }

  ngOnInit(){
    const user1 = this.tokenStorageService.getUser();
    this.username = user1.sub

    this.us.getOne(this.username).subscribe((user:User) => {
      this.user = user
      this.allOrders(user.id)
    })
  }

  allOrders(id: number) {
    this.order.getOrderByUserId(id, this.page, 3).subscribe(orders => {
      if (orders && orders.content.length > 0) {
        this.count = orders.content.length;
        this.total(orders.content);
        this.totalPages = orders.totalPages;
        this.order.getTotalPriceByUserId(id).subscribe(o=>{
          this.totalPriceAll = o.total;
          this.count1 = o.totalOrder;
        })
      } else {
        this.count = 0;
      }
    });
  }

  nextPage(){
    if(this.totalPages - 1 != this.page){
      this.page++;
      this.allOrders(this.user.id)
    }
  }

  previousPage(){
    if(this.page != 0){
      this.page--;
      this.allOrders(this.user.id)
    }else if(this.page == 0){
      console.log("No more previous pages")
    }
  }
  
  total(or: Order[]){
    this.totalPriceAll = 0
    if(this.count > 0){
      this.showProceed = true
      for(let o of or){
        if(o.confirm == true){
          this.confirm = true
          o.total = Number(o.quantity) * o.brandy.price
        }
      }
      this.orders.content = or
    }
  }

  // cancelOrder(order:Order){
  //     order.confirm = false
  //     this.order.update(order.id, order).subscribe(x=>{
  //       this.allOrders(this.user.id);
  //     })
  // }

  cancelOrder(id: number){
    this.order.delete(id).subscribe(x=>{
      this.allOrders(this.user.id);
    })
  }

  about(id: number){
    let n = Number(id)
    this.b.getOne(n).subscribe(x=>{
      this.router.navigate(['/aboutBrandy', {objDetails: JSON.stringify(x)}], { queryParams:  x , skipLocationChange: true});
    })
  }
}
