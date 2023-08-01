import { Component, HostListener, OnInit } from '@angular/core';
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
  admin = false;
  message='Login succesfull'

  constructor(private readonly ngxNotificationMsgService: NgxNotificationMsgService, private router : Router, private order: OrderService , private tokenStorageService: TokenStorageService, private us: UserServiceService) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user1 = this.tokenStorageService.getUser();

      let roles = [];
      this.username = user1.sub
      roles.push(...user1.roles)
      console.log(roles)
      if(roles.includes('ROLE_ADMIN')){
        this.admin = true
      }
      this.us.getOne(this.username).subscribe((user:User) => {
        this.order.getOrderByUserId(user.id).subscribe(orders => {
          if(orders.content.length > 0){
            this.cart = true
          }
        })
      })
    }

  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.username = '';
    this.isLoggedIn=false;
    this.cart = false;
    this.admin=false
    this.router.navigate(['/home']);
  }
}
