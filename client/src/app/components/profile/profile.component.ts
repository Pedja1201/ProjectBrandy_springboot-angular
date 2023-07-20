import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from 'src/app/model/admin';
import { Customer } from 'src/app/model/customer';
import { User } from 'src/app/model/user';
import { AdminService } from 'src/app/service/admin/admin.service';
import { CustomerService } from 'src/app/service/customer/customer.service';
import { TokenStorageService } from 'src/app/service/token-storage/token-storage.service';
import { UserServiceService } from 'src/app/service/user/user-service.service';
import { NgxNotificationMsgService, NgxNotificationStatusMsg } from 'ngx-notification-msg';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, AfterViewInit{

  poruka = false;
  message=''
  username!: string;
  upin = false;
  cust = false;
  admin = false;
  roles:String[]=[]
  password=false;
  c!:Customer;
  a!:Admin;

  form : FormGroup = new FormGroup({
    "id" : new FormControl(null),
    "firstName" : new FormControl(null, [Validators.required]),
    "lastName" : new FormControl(null, [Validators.required]),
    "username" : new FormControl(null, [Validators.required]),
    "email" : new FormControl(null, [Validators.required, Validators.email]),
    "password" : new FormControl(null, Validators.nullValidator),
    "upin" : new FormControl(null, Validators.nullValidator)
  });

  constructor(private readonly ngxNotificationMsgService: NgxNotificationMsgService, private router: Router, private adminservice:AdminService,private tokenStorageService: TokenStorageService, private us: UserServiceService, private customer: CustomerService) {}
  ngAfterViewInit(): void {
    this.checkUsernameCustomer()
  }

  ngOnInit(): void {
    const user1 = this.tokenStorageService.getUser();
    this.username = user1.sub
    //let roles = [];
    this.roles.push(...user1.roles)

    if(this.roles.includes('ROLE_CUSTOMER')){
      this.cust =true
      this.form.reset()
      this.upin = false
      this.customer.getOne(this.username).subscribe((customer:Customer)=>{
        this.form.patchValue(customer)
        this.c=customer;
      })
    }

    if(this.roles.includes('ROLE_ADMIN')){
      this.admin = true
      this.form.reset()
      this.upin = true
      this.adminservice.getOne(this.username).subscribe((admin:Admin)=>{
        this.form.patchValue(admin)
        this.a=admin;
      })
      
    }

  }  

  updateAdmin(){
    if(this.form.valid){
      if(this.form.value["username"] != this.username || this.form.value["password"] != this.a.password){
        if(this.roles.includes('ROLE_ADMIN')){
          this.adminservice.update(this.form.value.id, this.form.value).subscribe(x=>{
            console.log("UPDATE uspesan")
            this.tokenStorageService.signOut();
            window.location.href="/login"
          })
          
        }
      }else{
        this.adminservice.update(this.form.value.id, this.form.value).subscribe(x=>{
          this.adminservice.getOne(this.username).subscribe((admin:Admin)=>{
            this.form.reset()
            this.form.patchValue(admin)
            this.ngxNotificationMsgService.open({
              status: NgxNotificationStatusMsg.SUCCESS,
              header: 'Edit profile',
              messages: ['You have successfully edited profile.']
            });
          })
        })
      }
    }
    }
    
  updateCustomer(){
    if(this.form.valid){
      if(this.form.value["username"] != this.username || this.form.value["password"] != this.c.password){
        if(this.roles.includes('ROLE_CUSTOMER')){
          this.customer.update(this.form.value.id, this.form.value).subscribe(x=>{
            this.tokenStorageService.signOut()
            window.location.href="/login"
          })
        }
      }else{
        this.customer.update(this.form.value.id, this.form.value).subscribe(x=>{
          this.customer.getOne(this.username).subscribe((customer:Customer)=>{
            this.form.reset();
            this.form.patchValue(customer);
            this.ngxNotificationMsgService.open({
              status: NgxNotificationStatusMsg.SUCCESS,
              header: 'Edit profile',
              messages: ['You have successfully edited profile.']
            });
          })
          })
      }
    }
  }

  checkUsernameCustomer(){
      this.customer.checkUsername(this.form.value.username, this.form.value.id).subscribe(data =>{
        this.poruka = false
      }, err => {
        this.poruka = false
        this.message = err.error.message;
        this.poruka = true;
      })
  }

  checkEmailCustomer(){
      this.customer.checkEmail(this.form.value.email, this.form.value.id).subscribe(data => {
        this.poruka = false;
      }, err => {
        this.poruka = false
        this.message = err.error.message;
        this.poruka = true;
      });

  }

  checkUsernameAdmin(){
      if(this.form.get("username")?.valid == true){
        this.adminservice.checkUsername(this.form.value.username, this.form.value.id).subscribe(data =>{
          this.poruka = false
         this.form.controls['username'].setErrors(null);
        }, err => {
          this.form.controls['username'].setErrors({'incorrect': true});
          this.message = err.error.message;
          this.poruka = true
        })
      }
    
  }

  checkEmailAdmin(){
    if(this.form.get("email")?.valid == true){
      this.adminservice.checkEmail(this.form.value.email, this.form.value.id).subscribe(data => {
        this.poruka = false;
        this.form.controls["email"].setErrors(null);
      }, err => {
        this.form.controls["email"].setErrors({'incorrect': true});
        this.message = err.error.message;
        this.poruka = true;
      });
    }
  }

  checkUpin(){
    this.adminservice.checkUpin(this.form.value.upin, this.form.value.id).subscribe(data => {
      this.poruka = false;
    }, err => {
      this.poruka = false
      this.message = err.error.message;
      this.poruka = true;
    });

  }

  changePassword(){
    this.password = true
    this.form.controls['password'].setValue('')
  }
}
