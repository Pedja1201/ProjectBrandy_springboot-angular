import { Component, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/service/customer/customer.service';
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

  form : FormGroup = new FormGroup({
    "id" : new FormControl(null),
    "firstName" : new FormControl(null, [Validators.required]),
    "lastName" : new FormControl(null, [Validators.required]),
    "username" : new FormControl(null, [Validators.required]),
    "email" : new FormControl(null, [Validators.required, Validators.email]),
    "password" : new FormControl(null, Validators.nullValidator)
  });

  constructor(private customerService:CustomerService, private tokenStorageService: TokenStorageService){ }
  
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

  moreDetails(username:any){
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

  deleteUser(){
    this.customerService.delete(this.custId).subscribe(x=>{
      this.deleteNote = false;
      this.getAll()
    })
  }

  updateCustomer(){
    if(this.form.valid){
          this.customerService.update(this.form.value.id, this.form.value).subscribe(x=>{
            this.getAll()
            this.process = false
            this.custId = Number(this.form.value.id)
            this.confirmNote=false
            this.note()
          })
    }
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
    this.process=false
    this.password = false
  }

  changePass(){
    this.password = true
    this.form.controls['password'].setValue('')
  }

}
