import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Brandy, BrandyPage } from 'src/app/model/brandy';
import { User } from 'src/app/model/user';
import { OrderService } from 'src/app/service/order/order.service';
import { TokenStorageService } from 'src/app/service/token-storage/token-storage.service';
import { UserServiceService } from 'src/app/service/user/user-service.service';
import { NgxNotificationMsgService, NgxNotificationStatusMsg } from 'ngx-notification-msg';
import { BrandyServiceService } from 'src/app/service/brandies/brandy-service.service';
import { Order } from 'src/app/model/order';
import { Location } from '@angular/common';
import { EventEmitter } from '@angular/core';
import { single } from 'rxjs';
import { sign } from 'jsonwebtoken';

@Component({
  selector: 'app-about-brandy',
  templateUrl: './about-brandy.component.html',
  styleUrls: ['./about-brandy.component.css']
})
export class AboutBrandyComponent implements OnInit{
  brandy! : Brandy;
  username!: string;
  user!: User;
  cart = false;
  blink = false;
  logged = false;
  signal = false;
  process = false;
  message = '';
  roles:String[]=[]
  admin = false

  createOrder : FormGroup = new FormGroup({
    "id" : new FormControl(null),
    "quantity" : new FormControl(1, [Validators.required, Validators.pattern("^[0-9]+$")]),
    "dateOfPurchase" : new FormControl(new Date()),
    "confirm" : new FormControl(new Date()),
    "customer" : new FormControl(null),
    "brandy" : new FormControl(null)
  });

  constructor(private route: ActivatedRoute, private router : Router, private location: Location, private os: OrderService, private b : BrandyServiceService, private readonly ngxNotificationMsgService: NgxNotificationMsgService, private us: UserServiceService, private order: OrderService, private tokenStorageService: TokenStorageService){}

  ngOnInit(): void{
    this.brandy = JSON.parse(this.route.snapshot.paramMap.get('objDetails')!);
    //console.log(this.brandy)

    const user1 = this.tokenStorageService.getUser();
    this.username = user1.sub
    this.roles = [...user1.roles]

      if(user1 && this.brandy.quantity == true && this.roles.includes('ROLE_CUSTOMER')){
        this.cart = true
      }else if(this.brandy.quantity == false){
        this.blink = true
        this.cart = false
      }
    

    this.us.getOne(this.username).subscribe((user:User) => {
      this.user = user
      this.order.getOrderByUserId(user.id).subscribe((orders:Order[]) => {
        console.log("Orders of user: ", orders)
      })
     })
    
  }

  orderBrandy(): void {
    if(this.createOrder.valid){
      this.createOrder.value.customer = this.user;
      this.createOrder.value.brandy = this.brandy;
      this.createOrder.value.confirm = true;
      this.order.create(this.createOrder.value).subscribe(
        data => {
          console.log(data)
          console.log("Order uspesan")
          this.signal = true
          // this.ngxNotificationMsgService.open({
          //   status: NgxNotificationStatusMsg.SUCCESS,
          //   header: 'Please wait, your order is in processing.',
          //   messages: ['You have succesfully ordered item.']
          // });
          this.process = true
          setTimeout(()=>{
            window.location.reload()
            this.signal = true
          },3500)
          setTimeout(()=>{
            this.message = 'You have succesfully ordered item.'
          },1500)
        },
        err => {
          console.log("Neuspesan order")
        }
      )
    }
   
  }

  goBack(){
    if(this.signal){
      window.location.reload()
      //this.router.navigate(['home']);
    }else{
      this.router.navigate(['home']);
    }
  }

}
