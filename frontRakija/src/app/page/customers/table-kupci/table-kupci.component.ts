import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Customer, CustomerPage } from 'src/app/model/customer';
import { LoginService } from 'src/app/service/auth/login.service';

@Component({
  selector: 'app-table-kupci',
  templateUrl: './table-kupci.component.html',
  styleUrls: ['./table-kupci.component.css']
})
export class TableKupciComponent implements OnInit {

  displayedColumns: string[] = ['id', 'username', 'firstName','lastName', 'email',"action"];
  dataSource : CustomerPage<Customer> |undefined;
  title="Table Customers";

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

  details(customer: Customer) {
    this.router.navigate(["/customers", customer.id]);
  }

}

