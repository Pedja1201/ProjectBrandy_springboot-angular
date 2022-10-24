import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroupDirective, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Order } from 'src/app/model/order';
import { Customer, CustomerPage } from 'src/app/model/customer';
import { Brandy, BrandyPage } from 'src/app/model/brandy';
import { CustomersService } from 'src/app/service/customers/customers.service';
import { BrandiesService } from 'src/app/service/brandies/brandies.service';

@Component({
  selector: 'app-form-porudzbine',
  templateUrl: './form-porudzbine.component.html',
  styleUrls: ['./form-porudzbine.component.css']
})
export class FormPorudzbineComponent implements OnInit {

  title='Form Order'

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective | undefined;

  isLinear = false;
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  rakije: Brandy[] = [];
  kupci: Customer[] = [];
  
  forma : FormGroup = new FormGroup({
    "dateOfPurchase": new FormControl(null, [Validators.required]),
    "quantity": new FormControl(null, [Validators.required]),
    "brandy": new FormControl(null, [Validators.required]),
    "customer": new FormControl(null, [Validators.required]),
  })
  
  @Output()
  public createEvent: EventEmitter<any> = new EventEmitter<any>();
  
  @Input()
  porudzbina: Order |null = null;

  constructor(private rakijeService : BrandiesService, private kupciService : CustomersService,private _formBuilder: FormBuilder) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    console.log(this.porudzbina);
    this.forma.get("id")?.setValue(this.porudzbina?.id);
    this.forma.get("dateOfPurchase")?.setValue(this.porudzbina?.dateOfPurchase);
    this.forma.get("quantity")?.setValue(this.porudzbina?.quantity);
    this.forma.get("brandy")?.setValue(this.porudzbina?.brandy);
    this.forma.get("customer")?.setValue(this.porudzbina?.customer);
  }

  ngOnInit(): void {
    // this.rakijeService.getAll().subscribe((rakije : RakijaPage<Rakija>)=>{
    //   this.rakije = rakije.content;
    // });
    // this.kupciService.getAll().subscribe((kupci : KupacPage<Kupac>)=>{
    //   this.kupci = kupci.content;
    // });
    this.forma.get("id")?.setValue(this.porudzbina?.id);
    this.forma.get("dateOfPurchase")?.setValue(this.porudzbina?.id);
    this.forma.get("quantity")?.setValue(this.porudzbina?.id);
    this.forma.get("brandy")?.setValue(this.porudzbina?.id);
    this.forma.get("customer")?.setValue(this.porudzbina?.id);
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

