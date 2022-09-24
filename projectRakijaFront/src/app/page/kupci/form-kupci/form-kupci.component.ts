import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroupDirective, Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Kupac } from 'src/app/model/kupac';

@Component({
  selector: 'app-form-kupci',
  templateUrl: './form-kupci.component.html',
  styleUrls: ['./form-kupci.component.css']
})
export class FormKupciComponent implements OnInit {
  title='Forma Kupca'

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective | undefined;

  isLinear = false;
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });


  forma : FormGroup = new FormGroup({
    "korisnickoIme": new FormControl(null, [Validators.required]),
    "lozinka": new FormControl(null, [Validators.required]),
    "ime": new FormControl(null, [Validators.required]),
    "prezime": new FormControl(null, [Validators.required]),
    "email": new FormControl(null, [Validators.required]),
  })
  
  @Input()
  kupac: Kupac|null = null;

  @Output()
  public createEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _formBuilder: FormBuilder) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    console.log(this.kupac);
    this.forma.get("id")?.setValue(this.kupac?.id);
    this.forma.get("korisnickoIme")?.setValue(this.kupac?.korisnickoIme);
    this.forma.get("lozinka")?.setValue(this.kupac?.lozinka);
    this.forma.get("ime")?.setValue(this.kupac?.ime) ; 
    this.forma.get("prezime")?.setValue(this.kupac?.prezime)  ;
    this.forma.get("email")?.setValue(this.kupac?.email) ; 
    
  }

  ngOnInit(): void {
    this.forma.get("id")?.setValue(this.kupac?.id);
    this.forma.get("korisnickoIme")?.setValue(this.kupac?.id);
    this.forma.get("lozinka")?.setValue(this.kupac?.id);
    this.forma.get("ime")?.setValue(this.kupac?.id);
    this.forma.get("prezime")?.setValue(this.kupac?.id);
    this.forma.get("email")?.setValue(this.kupac?.id);
  }

  create() {
    if(this.forma.valid) {
      this.createEvent.emit(this.forma.value);

      setTimeout(() => 
      this.formGroupDirective?.resetForm(), 0)
    }
  }

}
