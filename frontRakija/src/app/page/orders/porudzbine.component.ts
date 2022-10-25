import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Order, OrderPage } from 'src/app/model/order';
import { LoginService } from 'src/app/service/auth/login.service';
import { OrdersService } from 'src/app/service/orders/orders.service';

@Component({
  selector: 'app-porudzbine',
  templateUrl: './porudzbine.component.html',
  styleUrls: ['./porudzbine.component.css']
})
export class PorudzbineComponent implements OnInit {
  title="Porudzbine"
  prikaz = false;
  

  orders : Order[] = [];
  orderUpdate: Order | null = null;

  constructor(private service : OrdersService,  public snackBar:MatSnackBar,public loginService : LoginService) {
    service.getAll().subscribe((orders : OrderPage<Order>)=> {
      this.orders = orders.content;
    })
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.service.getAll().subscribe((value) => {
      this.orders = value.content;
    }, (error) => {
      console.log(error);
    });
  }

  delete(id: any) {
    this.service.delete(id).subscribe((value) => {
      this.getAll();
      let snackBarRef = this.snackBar.open('Deleted...', 'OK!',  {duration: 3000 });
    }, (error) => {
      console.log(error);
    })
  }

  create(order: Order) {
    this.service.create(order).subscribe((value) => {
      this.getAll();
      let snackBarRef = this.snackBar.open('Created', 'OK!',  {duration: 3000 });
    }, (error) => {
      console.log(error);
    })
  }

  update(order: Order) {
    if(this.orderUpdate && this.orderUpdate.id) {
      this.service.update(this.orderUpdate.id, order).subscribe((value) => {
        this.getAll();
        let snackBarRef = this.snackBar.open('Updated', 'OK!',  {duration: 2000 });
      }, (error) => {
        console.log(error);
      })
    }

  }

  setUpdate(order: any) {
    this.orderUpdate = { ...order };
    this.prikaz = true;
  }

}
