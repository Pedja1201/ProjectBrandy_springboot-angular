import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroupDirective, Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Brandy } from 'src/app/model/brandy';

@Component({
  selector: 'app-form-rakije',
  templateUrl: './form-rakije.component.html',
  styleUrls: ['./form-rakije.component.css']
})
export class FormRakijeComponent implements OnInit {

  title='Form Brandy'

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective | undefined;

  isLinear = false;
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });


  forma : FormGroup = new FormGroup({
    "name": new FormControl(null, [Validators.required]),
    "type": new FormControl(null, [Validators.required]),
    "price": new FormControl(null, [Validators.required]),
    "year": new FormControl(null, [Validators.required]),
    "strength": new FormControl(null, [Validators.required]),
  })
  
  @Input()
  brandy: Brandy|null = null;

  @Output()
  public createEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _formBuilder: FormBuilder) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    console.log(this.brandy);
    this.forma.get("id")?.setValue(this.brandy?.id);
    this.forma.get("name")?.setValue(this.brandy?.name);
    this.forma.get("type")?.setValue(this.brandy?.type);
    this.forma.get("price")?.setValue(this.brandy?.price) ; 
    this.forma.get("year")?.setValue(this.brandy?.year);    
    this.forma.get("strength")?.setValue(this.brandy?.strength);    
  }

  ngOnInit(): void {
    this.forma.get("id")?.setValue(this.brandy?.id);
    this.forma.get("name")?.setValue(this.brandy?.id);
    this.forma.get("type")?.setValue(this.brandy?.id);
    this.forma.get("price")?.setValue(this.brandy?.id);
    this.forma.get("year")?.setValue(this.brandy?.id);
    this.forma.get("strength")?.setValue(this.brandy?.id);
  }

  create() {
    if(this.forma.valid) {
      this.createEvent.emit(this.forma.value);

      setTimeout(() => 
      this.formGroupDirective?.resetForm(), 0)
    }
  }

}
