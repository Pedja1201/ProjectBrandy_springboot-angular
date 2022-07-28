import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroupDirective, Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Rakija } from 'src/app/model/rakija';

@Component({
  selector: 'app-form-rakije',
  templateUrl: './form-rakije.component.html',
  styleUrls: ['./form-rakije.component.css']
})
export class FormRakijeComponent implements OnInit {

  title='Forma Rakije'

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective | undefined;

  isLinear = false;
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });


  forma : FormGroup = new FormGroup({
    "naziv": new FormControl(null, [Validators.required]),
    "sorta": new FormControl(null, [Validators.required]),
    "cena": new FormControl(null, [Validators.required]),
    "godina": new FormControl(null, [Validators.required]),
    "jacina": new FormControl(null, [Validators.required]),
  })
  
  @Input()
  rakija: Rakija|null = null;

  @Output()
  public createEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _formBuilder: FormBuilder) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    console.log(this.rakija);
    this.forma.get("id")?.setValue(this.rakija?.id);
    this.forma.get("naziv")?.setValue(this.rakija?.naziv);
    this.forma.get("sorta")?.setValue(this.rakija?.sorta);
    this.forma.get("cena")?.setValue(this.rakija?.cena) ; 
    this.forma.get("godina")?.setValue(this.rakija?.godina);    
    this.forma.get("jacina")?.setValue(this.rakija?.jacina);    
  }

  ngOnInit(): void {
    this.forma.get("id")?.setValue(this.rakija?.id);
    this.forma.get("naziv")?.setValue(this.rakija?.id);
    this.forma.get("sorta")?.setValue(this.rakija?.id);
    this.forma.get("cena")?.setValue(this.rakija?.id);
    this.forma.get("godina")?.setValue(this.rakija?.id);
    this.forma.get("jacina")?.setValue(this.rakija?.id);
  }

  create() {
    if(this.forma.valid) {
      this.createEvent.emit(this.forma.value);

      setTimeout(() => 
      this.formGroupDirective?.resetForm(), 0)
    }
  }

}
