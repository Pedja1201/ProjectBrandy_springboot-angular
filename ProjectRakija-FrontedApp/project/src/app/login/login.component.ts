import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = "Login page"

  loginForma : FormGroup = new FormGroup({
    "korisnickoIme": new FormControl(null, Validators.required),
    "lozinka": new FormControl(null, Validators.required),
  });
  loginFailed = false;

  //Mora public da bi pokupio logout!!!
  constructor(public loginService : LoginService, private router : Router,  public snackBar : MatSnackBar) { }

  ngOnInit(): void {
  }

   //Login
  login(){
    if(this.loginForma.valid){
      this.loginService.login(this.loginForma.value).subscribe(r => {
        let snackBarRef = this.snackBar.open('Successfully logged in!', 'OK!',  {duration: 3000 }); 
        console.log(r);
        this.router.navigate([""]);//Prebacivanje nakon logina na page
      }, (err) => {
        this.loginFailed = true;
        let snackBarRef = this.snackBar.open('Login Failed', 'Confrim',  {duration: 3000 });
      });
    }
  }

}
