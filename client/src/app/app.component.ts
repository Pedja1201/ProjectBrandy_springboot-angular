import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from './service/token-storage/token-storage.service';
import jwt_decode from 'jwt-decode';
import { UserServiceService } from './service/user/user-service.service';
import { User } from './model/user';
import { OrderService } from './service/order/order.service';
import { Order } from './model/order';
import { NgxNotificationMsgService, NgxNotificationStatusMsg } from 'ngx-notification-msg';
import { AboutBrandyComponent } from './components/about-brandy/about-brandy.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  cart = false;
  isLoggedIn = false;
  username!: string;
  private roles!: string[];

  constructor(private readonly ngxNotificationMsgService: NgxNotificationMsgService, private router : Router, private order: OrderService , private tokenStorageService: TokenStorageService, private us: UserServiceService) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user1 = this.tokenStorageService.getUser();

      let roles = [];
      this.username = user1.sub
      roles.push(...user1.roles)

      this.us.getOne(this.username).subscribe((user:User) => {
        //console.log("ID usera: ", user.id)
        this.order.getOrderByUserId(user.id).subscribe((orders:Order) => {
          // console.log("Orders of user: ", orders)
          if(orders){
            this.cart = true
          }
        })
      })
    }

  }

  

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
