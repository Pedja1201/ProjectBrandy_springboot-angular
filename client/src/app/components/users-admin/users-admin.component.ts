import { Component, OnChanges, OnInit } from '@angular/core';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/service/customer/customer.service';

@Component({
  selector: 'app-users-admin',
  templateUrl: './users-admin.component.html',
  styleUrls: ['./users-admin.component.css']
})
export class UsersAdminComponent implements OnInit{

  customers:Customer[]=[]
  process = false
  password = false

  constructor(private customerService:CustomerService){ }
  
  ngOnInit(): void {
    this.customerService.getAll().subscribe(x=>{
      console.log(x)
      this.customers = x
    })
  }

  moreDetails(){
    this.process = true
  }

  deleteUser(){
    
  }

  closeDialog(){
    this.process=false
  }

  changePass(){
    this.password = true
  }
}
