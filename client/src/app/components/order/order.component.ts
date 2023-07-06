import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/model/order';
import { User } from 'src/app/model/user';
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

  constructor(private tokenStorageService: TokenStorageService, private us: UserServiceService, private order: OrderService,){ }

  ngOnInit(){
    const user1 = this.tokenStorageService.getUser();
    this.username = user1.sub

    this.us.getOne(this.username).subscribe((user:User) => {
      this.user = user
      this.order.getOrderByUserId(user.id).subscribe((orders:Order) => {
        console.log("Orders of user: ", orders)
      })
     })
  }
}
