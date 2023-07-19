import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxNotificationMsgService, NgxNotificationStatusMsg} from 'ngx-notification-msg'
import { AuthService } from 'src/app/service/auth/auth.service';
import { Location } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomerService } from 'src/app/service/customer/customer.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  isSignUpFailed = false;
  errorMessage = '';
  hidePassword = true;
  poruka = false;
  message=''

  formRegistrationUser : FormGroup = new FormGroup({
    "id" : new FormControl(null),
    "firstName" : new FormControl(null, [Validators.required]),
    "lastName" : new FormControl(null, [Validators.required]),
    "username" : new FormControl(null, [Validators.required]),
    "email" : new FormControl(null, [Validators.required, Validators.email]),
    "password" : new FormControl(null, [Validators.required])
  });

  constructor(private customerService:CustomerService ,private authService: AuthService, private location: Location, private router: Router, private readonly ngxNotificationMsgService: NgxNotificationMsgService) { }

  ngOnInit(): void {
  }

  saveUser(): void {
    if(this.formRegistrationUser.valid) {
      this.authService.register(this.formRegistrationUser.value).subscribe(
        data => {
          console.log(data);
          this.isSignUpFailed = false;
          this.formRegistrationUser.reset();
          this.router.navigate(['login']);

          this.ngxNotificationMsgService.open({
            status: NgxNotificationStatusMsg.SUCCESS,
            header: 'Registration',
            messages: ['You have successfully registered.']
          });

        },
        err => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      );
    }
  }

  checkUsernameCustomer(){
    this.customerService.checkUsername(this.formRegistrationUser.value.username, this.formRegistrationUser.value.id).subscribe(data =>{
      this.poruka = false
    }, err => {
      this.poruka = false
      this.message = err.error.message;
      this.poruka = true;
    })
}

checkEmailCustomer(){
    this.customerService.checkEmail(this.formRegistrationUser.value.email, this.formRegistrationUser.value.id).subscribe(data => {
      this.poruka = false;
    }, err => {
      this.poruka = false
      this.message = err.error.message;
      this.poruka = true;
    });

}

  cancel(){
    this.formRegistrationUser.reset();
    this.location.back();
  }

}
