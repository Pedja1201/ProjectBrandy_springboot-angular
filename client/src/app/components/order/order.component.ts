import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Brandy } from 'src/app/model/brandy';
import { Order } from 'src/app/model/order';
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
  orders: Order []=[]
  count!: number;
  totalPriceAll!: number;
  showProceed = false;

  constructor(private b:BrandyServiceService,private tokenStorageService: TokenStorageService, private router: Router, private us: UserServiceService, private order: OrderService,){ }

  ngOnInit(){
    const user1 = this.tokenStorageService.getUser();
    this.username = user1.sub

    this.us.getOne(this.username).subscribe((user:User) => {
      this.user = user
      this.allOrders(user.id)
     })
  }

  allOrders(id: number) {
    this.order.getOrderByUserId(id).subscribe((orders: Order[]) => {
      if (orders && orders.length > 0) {
        this.count = orders.length;
        this.total(orders);
      } else {
        this.count = 0;
        this.orders = []
      }
    });
  }
  
  total(or: Order[]){
    let temp = 0;
    if(this.count > 0){
      this.showProceed = true
      for(let o of or){
        o.total = Number(o.quantity) * o.brandy.price
        this.totalPriceAll = o.total
        temp +=this.totalPriceAll
        this.totalPriceAll = 0
        this.totalPriceAll = temp
      }
      this.orders = or
    }
  }

  cancelOrder(id: number){
    this.order.delete(id).subscribe(x => {
      this.allOrders(this.user.id);
      window.location.reload()
    })
  }

  about(name: any){
    let n = String(name)
    this.b.getBrandyByName(n).subscribe(x=>{
      console.log(x)
      this.router.navigate(['/aboutBrandy', {objDetails: JSON.stringify(x)}], { queryParams:  x , skipLocationChange: true});
    })

  }
}
