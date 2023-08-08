import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Admin } from 'src/app/model/admin';
import { AdminService } from 'src/app/service/admin/admin.service';
import { TokenStorageService } from 'src/app/service/token-storage/token-storage.service';

@Component({
  selector: 'app-admin-administators',
  templateUrl: './admin-administators.component.html',
  styleUrls: ['./admin-administators.component.css']
})
export class AdminAdministatorsComponent implements OnInit{
  administators:Admin[]=[];
  process = false;
  password = false;
  custId!:number;
  confirmNote = true;
  deleteNote = false;
  no = false;
  username!:string;
  create = false;
  mess='';
  messageForNoteTitle='';
  messageBody='';
  poruka = false;
  message='';
  totalPagesAll = 0;
  page = 0;

  form : FormGroup = new FormGroup({
    "id" : new FormControl(null),
    "firstName" : new FormControl(null, [Validators.required]),
    "lastName" : new FormControl(null, [Validators.required]),
    "active" : new FormControl(null, Validators.nullValidator),
    "username" : new FormControl(null, [Validators.required]),
    "email" : new FormControl(null, [Validators.required, Validators.email]),
    "password" : new FormControl(null, Validators.nullValidator),
    "upin" : new FormControl(null)
  });

  constructor(private adminService: AdminService, private tokenStorageService: TokenStorageService) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.adminService.getAll(this.page, 6).subscribe(x=>{
      //this.administators = x.content;
      this.totalPagesAll = x.totalPages;
      const user1 = this.tokenStorageService.getUser();
      let username = user1.sub;

      this.administators = x.content.filter(a => a.username != username);
    })
  }

  nextPage(){
    if(this.totalPagesAll - 1 != this.page){
      this.page++
      this.getAll();
    }
  }

  previousPage(){
    if(this.page != 0){
        this.page--;
        this.getAll()
    }else if(this.page == 0){
        console.log("No more previous pages")
    }
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
    this.adminService.getOne(String(username)).subscribe((x:Admin)=>{
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
    this.adminService.delete(id).subscribe(x=>{
      this.deleteNote = false;
      this.page = 0
      this.getAll()
    })
  }

  updateCustomer(){
    if(this.form.valid){
          this.adminService.update(this.form.value.id, this.form.value).subscribe(x=>{
            this.getAll()
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
      this.adminService.create(this.form.value).subscribe(x=>{
       this.messageForNoteTitle = 'User created successfuly!'
       this.messageBody = 'You have successfully created user.'
       this.note();
       this.confirmNote=false;
        this.create = false;
        this.getAll();
      })
    }
  }

  logicalDelete(user:Admin){
    if(user.active = true){
      user.active = false
      this.adminService.update(user.id, user).subscribe(x=>{
        this.getAll()
      })
    }
  }

  checkUsernameCustomer(){
    this.adminService.checkUsername(this.form.value.username, this.form.value.id).subscribe(data =>{
      this.poruka = false
    }, err => {
      this.poruka = false
      this.message = err.error.message;
      this.poruka = true;
    })
  }

  checkEmailCustomer(){
    this.adminService.checkEmail(this.form.value.email, this.form.value.id).subscribe(data => {
      this.poruka = false;
    }, err => {
      this.poruka = false
      this.message = err.error.message;
      this.poruka = true;
    });

  }

  checkUpin(){
    this.adminService.checkUpin(this.form.value.upin, this.form.value.id).subscribe(data => {
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
