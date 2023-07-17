import { Component, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Customer } from 'src/app/model/customer';
import { Order } from 'src/app/model/order';
import { CustomerService } from 'src/app/service/customer/customer.service';
import { OrderService } from 'src/app/service/order/order.service';
import { TokenStorageService } from 'src/app/service/token-storage/token-storage.service';

@Component({
  selector: 'app-users-admin',
  templateUrl: './users-admin.component.html',
  styleUrls: ['./users-admin.component.css']
})
export class UsersAdminComponent implements OnInit{
  customers:Customer[]=[]
  process = false
  password = false
  custId!:number;
  confirmNote = true
  deleteNote = false
  no = false
  username!:string
  create = false
  mess=''
  messageForNoteTitle=''
  messageBody=''
  poruka = false;
  message=''

  form : FormGroup = new FormGroup({
    "id" : new FormControl(null),
    "firstName" : new FormControl(null, [Validators.required]),
    "lastName" : new FormControl(null, [Validators.required]),
    "active" : new FormControl(null, Validators.nullValidator),
    "username" : new FormControl(null, [Validators.required]),
    "email" : new FormControl(null, [Validators.required, Validators.email]),
    "password" : new FormControl(null, Validators.nullValidator)
  });

  constructor(private orderService:OrderService, private customerService:CustomerService, private tokenStorageService: TokenStorageService){ }
   
  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.customerService.getAll().subscribe(x=>{
      this.customers = x
      if(this.customers.length == 0){
        this.no = true
      }
    })
  }

  createUserNote(){
    this.form.reset()
    this.mess='Create user'
    this.create = true
    this.no = false
  }

  moreDetails(username:any){
    this.username = username
    this.form.reset()
    this.customerService.getOne(String(username)).subscribe((x:Customer)=>{
      this.form.patchValue(x)
    })
    this.process = true
  }

  noteDelete(id:number){
    this.deleteNote = true
    this.custId=id
    
  }

  noteDeleteCloseDialog(){
    this.deleteNote = false
  }

  deleteUser(id:number){
    this.customerService.delete(id).subscribe(x=>{
      this.deleteNote = false;
      this.getAll()
    })
  }

  updateCustomer(){
    if(this.form.valid){
          this.customerService.update(this.form.value.id, this.form.value).subscribe(x=>{
            this.getAll()
            if(this.form.value.active = true){
              this.orderService.getOrderByUserId(this.form.value.id).subscribe((o:Order[])=>{
                for(let r of o){
                  if(r.brandy.quantity == false){
                  r.confirm = false
                  this.orderService.update(r.id, r).subscribe(x=>{
                      console.log("Users orders updated on false!")
                  })
                  }else{
                    r.confirm = true
                  this.orderService.update(r.id, r).subscribe(x=>{
                      console.log("Users orders updated on true!")
                  })
                  }
                }
              })
            }
            this.process = false
            this.custId = Number(this.form.value.id)
            this.confirmNote=false
            this.messageForNoteTitle = 'Update successful!'
            this.messageBody = 'You have successfuly updated user with ID: ' + this.custId
            this.note()
            this.password=false
          })
    }
  }

  createCustomer(){
    if(this.form.valid){
      this.customerService.create(this.form.value).subscribe(x=>{
       this.messageForNoteTitle = 'User created successfuly!'
       this.messageBody = 'You have successfully created user.'
       this.note();
       this.confirmNote=false;
        this.create = false;
        this.getAll();
      })
    }
  }

  logicalDelete(user:Customer){
    if(user.active = true){
      user.active = false
      this.customerService.update(user.id, user).subscribe(x=>{
        this.getAll()
        this.orderService.getOrderByUserId(user.id).subscribe((o:Order[])=>{
          for(let r of o){
            // if(r.brandy.quantity == false){
            r.confirm = false
            this.orderService.update(r.id, r).subscribe(x=>{
                console.log("Users orders updated!")
            })
            // }
          }
        })
      })
    }
  }

  checkUsernameCustomer(){
    this.customerService.checkUsername(this.form.value.username, this.form.value.id).subscribe(data =>{
      this.poruka = false
    }, err => {
      this.poruka = false
      this.message = err.error.message;
      this.poruka = true;
    })
}

checkEmailCustomer(){
    this.customerService.checkEmail(this.form.value.email, this.form.value.id).subscribe(data => {
      this.poruka = false;
    }, err => {
      this.poruka = false
      this.message = err.error.message;
      this.poruka = true;
    });

}

  closeDialogCreate(){
    this.poruka =false
    this.create=false
  }

  note(){
    const obavestenje = document.getElementById('obavestenje');
    setTimeout(() => {
      obavestenje!.classList.add('prikazi');
      
      // setTimeout(() => {
      //   obavestenje!.classList.remove('prikazi');
      // }, 3000);
    }, 500);
  }

  closeNote(){
    const obavestenje = document.getElementById('obavestenje');
    setTimeout(() => {
         obavestenje!.classList.remove('prikazi');
       }, 10);
    this.confirmNote = true
  }

  closeDialog(){
    this.poruka=false
    this.process=false
    this.password = false
  }

  closeNoUsers(){
    this.no=false
  }

  changePass(){
    this.password = true
    this.form.controls['password'].setValue('')
  }

}
