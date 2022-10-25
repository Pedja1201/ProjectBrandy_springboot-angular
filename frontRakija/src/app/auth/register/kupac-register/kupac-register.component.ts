import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Customer } from 'src/app/model/customer';

@Component({
  selector: 'app-kupac-register',
  templateUrl: './kupac-register.component.html',
  styleUrls: ['./kupac-register.component.css']
})
export class KupacRegisterComponent implements OnInit {

  title='Register Customer'
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
    "email": new FormControl(null, [Validators.required])

  })
  
  @Output()
  public createEvent: EventEmitter<any> = new EventEmitter<any>();
  
  @Input()
  customer: Customer|null = null;

  constructor( public snackBar:MatSnackBar, private _formBuilder: FormBuilder,private router: Router) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    console.log(this.customer);
    this.forma.get("id")?.setValue(this.customer?.id);
    this.forma.get("username")?.setValue(this.customer?.username);
    this.forma.get("password")?.setValue(this.customer?.password);
    this.forma.get("firstName")?.setValue(this.customer?.firstName);
    this.forma.get("lastName")?.setValue(this.customer?.lastName);
    this.forma.get("email")?.setValue(this.customer?.email);

  }

  ngOnInit(): void {
    this.forma.get("id")?.setValue(this.customer?.id);
    this.forma.get("username")?.setValue(this.customer?.id);
    this.forma.get("password")?.setValue(this.customer?.id);
    this.forma.get("firstName")?.setValue(this.customer?.id);
    this.forma.get("lastName")?.setValue(this.customer?.id);
    this.forma.get("email")?.setValue(this.customer?.id);

  }

  create() {
    if(this.forma.valid) {
      this.createEvent.emit(this.forma.value);
      let snackBarRef = this.snackBar.open('Registered as a Kupac', 'OK!',  {duration: 3000 });
      this.router.navigate(["login"]);
  }
}

}
