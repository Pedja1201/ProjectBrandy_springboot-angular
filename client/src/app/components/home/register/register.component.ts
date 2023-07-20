import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxNotificationMsgService, NgxNotificationStatusMsg} from 'ngx-notification-msg'
import { AuthService } from 'src/app/service/auth/auth.service';
import { Location } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomerService } from 'src/app/service/customer/customer.service';
import { AdminService } from 'src/app/service/admin/admin.service';

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
  message='';
  noteForAdmins = false;
  confirmForAmin = false;
  showForm = false
  adminPass = 3030;
  passCorrect=false

  formRegistrationUser : FormGroup = new FormGroup({
    "id" : new FormControl(null),
    "firstName" : new FormControl(null, [Validators.required]),
    "lastName" : new FormControl(null, [Validators.required]),
    "username" : new FormControl(null, [Validators.required]),
    "email" : new FormControl(null, [Validators.required, Validators.email]),
    "password" : new FormControl(null, [Validators.required]),
    "upin" : new FormControl(null)
  });

  passCheck : FormGroup = new FormGroup({
    "pass": new FormControl(null, [Validators.required]),
  })

  constructor(private adminService:AdminService ,private customerService:CustomerService ,private authService: AuthService, private location: Location, private router: Router, private readonly ngxNotificationMsgService: NgxNotificationMsgService) { }

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

  checkPassword(){
    if(this.passCheck.valid){
      if(this.adminPass == this.passCheck.value.pass){
        this.showForm = true
        this.passCorrect = false
        this.noteForAdmins = false
      }else{
        this.passCorrect = true
      }
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

  checkUsernameAdmin(){
    this.adminService.checkUsername(this.formRegistrationUser.value.username, this.formRegistrationUser.value.id).subscribe(data =>{
      this.poruka = false
    }, err => {
      this.poruka = false
      this.message = err.error.message;
      this.poruka = true;
    })
  }

  checkEmailAdmin(){
    this.adminService.checkEmail(this.formRegistrationUser.value.email, this.formRegistrationUser.value.id).subscribe(data => {
      this.poruka = false;
    }, err => {
      this.poruka = false
      this.message = err.error.message;
      this.poruka = true;
    });

  }

  checkUpin(){
    this.adminService.checkUpin(this.formRegistrationUser.value.upin, this.formRegistrationUser.value.id).subscribe(data => {
      this.poruka = false;
    }, err => {
      this.poruka = false
      this.message = err.error.message;
      this.poruka = true;
    });

  }

  adminForm(){
    this.noteForAdmins = true
  }

  confirmForAdmin(){
    this.noteForAdmins = true
  }

  closeNote(){
    this.noteForAdmins = false
    this.passCorrect = false
    this.passCheck.reset()
  }

  cancel(){
    this.formRegistrationUser.reset();
    this.location.back();
  }

}

