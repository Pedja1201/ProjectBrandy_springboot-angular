import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from '../../service/auth/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage : string = '';
  constructor(public loginService : LoginService,private snackBar : MatSnackBar, private router : Router) { }

  loginForma : FormGroup = new FormGroup({
    "username": new FormControl(null, Validators.required),
    "password": new FormControl(null, Validators.required),
  });


  ngOnInit(): void {
  }

   //Login
  login(){
    if(this.loginForma.valid){
      this.loginService.login(this.loginForma.value).subscribe( {next: () => {
        let snackBarRef = this.snackBar.open('Successfully logged in!', 'OK!',  {duration: 3000 }); 
        this.router.navigate([""])//Prebacivanje nakon logina na page
      }, error: (error) => {
        let snackBarRef = this.snackBar.open('Login Failed', 'Confrim',  {duration: 3000 });
        this.errorMessage = error.error}
      });
    }
  }

}
