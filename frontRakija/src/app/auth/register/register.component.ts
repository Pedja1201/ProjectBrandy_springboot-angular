import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Admin } from '../../model/admin';
import { Customer } from '../../model/customer';
import { LoginService } from '../../service/auth/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  title="Sign up";

  constructor(public loginService : LoginService,  public snackBar:MatSnackBar) {

  }

  ngOnInit(): void {
  }

  createKupac(customer: Customer) {
    this.loginService.registerKupac(customer).subscribe((value) => {
      console.log(customer)
    }, (error) => {
      console.log(error);
    })
  }

  createAdmin(admin: Admin) {
    this.loginService.registerAdmin(admin).subscribe((value) => {
      console.log(admin)
    }, (error) => {
      console.log(error);
    })
  }

}

