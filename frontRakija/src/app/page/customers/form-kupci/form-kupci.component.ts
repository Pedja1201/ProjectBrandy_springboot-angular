import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroupDirective, Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Customer } from 'src/app/model/customer';

@Component({
  selector: 'app-form-kupci',
  templateUrl: './form-kupci.component.html',
  styleUrls: ['./form-kupci.component.css']
})
export class FormKupciComponent implements OnInit {
  title='Form Customer'

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective | undefined;

  isLinear = false;
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });


  forma : FormGroup = new FormGroup({
    "username": new FormControl(null, [Validators.required]),
    "password": new FormControl(null, [Validators.required]),
    "firstName": new FormControl(null, [Validators.required]),
    "lastName": new FormControl(null, [Validators.required]),
    "email": new FormControl(null, [Validators.required]),
  })
  
  @Input()
  customer: Customer|null = null;

  @Output()
  public createEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _formBuilder: FormBuilder) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    console.log(this.customer);
    this.forma.get("id")?.setValue(this.customer?.id);
    this.forma.get("username")?.setValue(this.customer?.username);
    this.forma.get("password")?.setValue(this.customer?.password);
    this.forma.get("firstName")?.setValue(this.customer?.firstName) ; 
    this.forma.get("lastName")?.setValue(this.customer?.lastName)  ;
    this.forma.get("email")?.setValue(this.customer?.email) ; 
    
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

      setTimeout(() => 
      this.formGroupDirective?.resetForm(), 0)
    }
  }

}
