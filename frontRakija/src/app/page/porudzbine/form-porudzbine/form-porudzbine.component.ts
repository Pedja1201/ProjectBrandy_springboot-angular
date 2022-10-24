import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroupDirective, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Porudzbina } from 'src/app/model/porudzbina';
import { Kupac, KupacPage } from 'src/app/model/kupac';
import { Rakija, RakijaPage } from 'src/app/model/rakija';
import { KupciService } from 'src/app/service/kupci/kupci.service';
import { RakijeService } from 'src/app/service/rakije/rakije.service';

@Component({
  selector: 'app-form-porudzbine',
  templateUrl: './form-porudzbine.component.html',
  styleUrls: ['./form-porudzbine.component.css']
})
export class FormPorudzbineComponent implements OnInit {

  title='Forma Porudzbine'

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective | undefined;

  isLinear = false;
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  rakije: Rakija[] = [];
  kupci: Kupac[] = [];
  
  forma : FormGroup = new FormGroup({
    "datumKupovine": new FormControl(null, [Validators.required]),
    "kolicina": new FormControl(null, [Validators.required]),
    "rakija": new FormControl(null, [Validators.required]),
    "kupac": new FormControl(null, [Validators.required]),
  })
  
  @Output()
  public createEvent: EventEmitter<any> = new EventEmitter<any>();
  
  @Input()
  porudzbina: Porudzbina |null = null;

  constructor(private rakijeService : RakijeService, private kupciService : KupciService,private _formBuilder: FormBuilder) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    console.log(this.porudzbina);
    this.forma.get("id")?.setValue(this.porudzbina?.id);
    this.forma.get("datumKupovine")?.setValue(this.porudzbina?.datumKupovine);
    this.forma.get("kolicina")?.setValue(this.porudzbina?.kolicina);
    this.forma.get("rakija")?.setValue(this.porudzbina?.rakija);
    this.forma.get("kupac")?.setValue(this.porudzbina?.kupac);
  }

  ngOnInit(): void {
    // this.rakijeService.getAll().subscribe((rakije : RakijaPage<Rakija>)=>{
    //   this.rakije = rakije.content;
    // });
    // this.kupciService.getAll().subscribe((kupci : KupacPage<Kupac>)=>{
    //   this.kupci = kupci.content;
    // });
    this.forma.get("id")?.setValue(this.porudzbina?.id);
    this.forma.get("datumKupovine")?.setValue(this.porudzbina?.id);
    this.forma.get("kolicina")?.setValue(this.porudzbina?.id);
    this.forma.get("rakija")?.setValue(this.porudzbina?.id);
    this.forma.get("kupac")?.setValue(this.porudzbina?.id);
  }

  create() {
    if(this.forma.valid) {
      this.createEvent.emit(this.forma.value);

      setTimeout(() => 
      this.formGroupDirective?.resetForm(), 0)
    }
  }


  //Metoda koja proverava 
  comparator1(rakija1: any, rakija2:any) {
    return rakija1 && rakija2
    ? rakija1.id === rakija2.id
    : rakija1 === rakija2;
  }
  comparator2(kupac1: any, kupac2:any) {
    return kupac1 && kupac2
    ? kupac1.id === kupac2.id
    : kupac1 === kupac2;
  }

}

