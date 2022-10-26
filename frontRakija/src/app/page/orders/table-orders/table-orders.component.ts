import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrderPage } from 'src/app/model/order';
import { LoginService } from 'src/app/service/auth/login.service';

@Component({
  selector: 'app-table-orders',
  templateUrl: './table-orders.component.html',
  styleUrls: ['./table-orders.component.css']
})
export class TableOrdersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'quantity', 'dateOfPurchase','brandy', 'customer',"action"];
  dataSource : OrderPage<Order> |undefined;
  title="Table Orders";

  @Input()
  elements: any[] = [];

  @Output()
  deleted : EventEmitter<any> = new EventEmitter<any>();

  @Output()
  updated: EventEmitter<any> = new EventEmitter<any>();

  constructor(private router : Router, public loginService : LoginService) { }

  ngOnInit(): void {
  }

  deleting(id:number) {
    this.deleted.emit(id);
  }

  updating(id:number) {
    this.updated.emit(id);
  }

  details(order: Order) {
    this.router.navigate(["/orders", order.id]);
  }

}

