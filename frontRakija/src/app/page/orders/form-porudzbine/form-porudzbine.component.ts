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

  brandies: Brandy[] = [];
  customers: Customer[] = [];
  
  forma : FormGroup = new FormGroup({
    "dateOfPurchase": new FormControl(null, [Validators.required]),
    "quantity": new FormControl(null, [Validators.required]),
    "brandy": new FormControl(null, [Validators.required]),
    "customer": new FormControl(null, [Validators.required]),
  })
  
  @Output()
  public createEvent: EventEmitter<any> = new EventEmitter<any>();
  
  @Input()
  order: Order |null = null;

  constructor(private rakijeService : BrandiesService, private kupciService : CustomersService,private _formBuilder: FormBuilder) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    console.log(this.order);
    this.forma.get("id")?.setValue(this.order?.id);
    this.forma.get("dateOfPurchase")?.setValue(this.order?.dateOfPurchase);
    this.forma.get("quantity")?.setValue(this.order?.quantity);
    this.forma.get("brandy")?.setValue(this.order?.brandy);
    this.forma.get("customer")?.setValue(this.order?.customer);
  }

  ngOnInit(): void {
    // this.rakijeService.getAll().subscribe((rakije : RakijaPage<Rakija>)=>{
    //   this.rakije = rakije.content;
    // });
    // this.kupciService.getAll().subscribe((kupci : KupacPage<Kupac>)=>{
    //   this.kupci = kupci.content;
    // });
    this.forma.get("id")?.setValue(this.order?.id);
    this.forma.get("dateOfPurchase")?.setValue(this.order?.id);
    this.forma.get("quantity")?.setValue(this.order?.id);
    this.forma.get("brandy")?.setValue(this.order?.id);
    this.forma.get("customer")?.setValue(this.order?.id);
  }

  create() {
    if(this.forma.valid) {
      this.createEvent.emit(this.forma.value);

      setTimeout(() => 
      this.formGroupDirective?.resetForm(), 0)
    }
  }


  //Metoda koja proverava 
  comparator1(brandy1: any, brandy2:any) {
    return brandy1 && brandy2
    ? brandy1.id === brandy2.id
    : brandy1 === brandy2;
  }
  comparator2(customer1: any, customer2:any) {
    return customer1 && customer2
    ? customer1.id === customer2.id
    : customer1 === customer2;
  }

}

