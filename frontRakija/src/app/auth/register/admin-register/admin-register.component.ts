import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Admin } from 'src/app/model/admin';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css']
})
export class AdminRegisterComponent implements OnInit {

  title='Register Administrators'
  hide = true;
  
  isLinear = false;
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  
  forma : FormGroup = new FormGroup({
    "username": new FormControl(null, [Validators.required]),
    "password": new FormControl(null, [Validators.required]),
    "firstName": new FormControl(null, [Validators.required]),
    "lastName": new FormControl(null, [Validators.required]),
    "email": new FormControl(null, [Validators.required]),
    "upin": new FormControl(null, [Validators.required])
  })
  
  @Output()
  public createEvent: EventEmitter<any> = new EventEmitter<any>();
  
  @Input()
  admin: Admin|null = null;

  constructor( public snackBar:MatSnackBar, private _formBuilder: FormBuilder,private router: Router) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    console.log(this.admin);
    this.forma.get("id")?.setValue(this.admin?.id);
    this.forma.get("username")?.setValue(this.admin?.username);
    this.forma.get("password")?.setValue(this.admin?.password);
    this.forma.get("firstName")?.setValue(this.admin?.firstName);
    this.forma.get("lastName")?.setValue(this.admin?.lastName);
    this.forma.get("email")?.setValue(this.admin?.email);
    this.forma.get("upin")?.setValue(this.admin?.upin);

  }

  ngOnInit(): void {
    this.forma.get("id")?.setValue(this.admin?.id);
    this.forma.get("username")?.setValue(this.admin?.id);
    this.forma.get("password")?.setValue(this.admin?.id);
    this.forma.get("firstName")?.setValue(this.admin?.id);
    this.forma.get("lastName")?.setValue(this.admin?.id);
    this.forma.get("email")?.setValue(this.admin?.id);
    this.forma.get("upin")?.setValue(this.admin?.id);
  }

  create() {
    if(this.forma.valid) {
      this.createEvent.emit(this.forma.value);
      let snackBarRef = this.snackBar.open('Registered as a Admin', 'OK!',  {duration: 3000 });
      this.router.navigate(["login"]);
  }
}

}
