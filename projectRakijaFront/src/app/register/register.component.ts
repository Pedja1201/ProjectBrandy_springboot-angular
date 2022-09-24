import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Admin } from '../model/admin';
import { Kupac } from '../model/kupac';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  title="Registruj se";

  constructor(public loginService : LoginService,  public snackBar:MatSnackBar) {

  }

  ngOnInit(): void {
  }

  createKupac(kupac: Kupac) {
    this.loginService.registerKupac(kupac).subscribe((value) => {
      console.log(kupac)
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

