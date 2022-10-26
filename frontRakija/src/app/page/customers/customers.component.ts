import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Customer, CustomerPage } from 'src/app/model/customer';
import { CustomersService } from 'src/app/service/customers/customers.service';
import { LoginService } from 'src/app/service/auth/login.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  title="Customers";
  prikaz = false;
  
  customers : Customer[] = [];
  customerUpdate: Customer | null = null;

  constructor(private service : CustomersService, public snackBar:MatSnackBar, public loginService : LoginService) {
    // service.getAll().subscribe((kupci : KupacPage<Kupac>) => {
    //   this.kupci = kupci.content;
    // })
  }

  export(){
    this.service.exportPdf().subscribe((data) => {
      let downloadURL = window.URL.createObjectURL(data);
      let link = document.createElement('a');
      link.href=downloadURL;
      link.download = 'customersList.pdf';
      link.click()
    })
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.service.getAll().subscribe((value) => {
      this.customers = value.content;
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

  create(customer: Customer) {
    this.service.create(customer).subscribe((value) => {
      this.getAll();
      let snackBarRef = this.snackBar.open('Created', 'OK!',  {duration: 3000 });
    }, (error) => {
      console.log(error);
    })
  }

  update(customer: Customer) {
    if(this.customerUpdate && this.customerUpdate.id) {
      this.service.update(this.customerUpdate.id, customer).subscribe((value) => {
        this.getAll();
        let snackBarRef = this.snackBar.open('Updated', 'OK!',  {duration: 2000 });
      }, (error) => {
        console.log(error);
      })
    }

  }

  setUpdate(kupac: any) {
    this.customerUpdate = { ...kupac };
    this.prikaz = true;
  }

}

