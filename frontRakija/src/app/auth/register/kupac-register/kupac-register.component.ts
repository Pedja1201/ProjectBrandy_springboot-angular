import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Kupac } from 'src/app/model/customer';

@Component({
  selector: 'app-kupac-register',
  templateUrl: './kupac-register.component.html',
  styleUrls: ['./kupac-register.component.css']
})
export class KupacRegisterComponent implements OnInit {

  title='Registrovanje Kupca'
  hide = true;
  
  isLinear = false;
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  
  forma : FormGroup = new FormGroup({
    "korisnickoIme": new FormControl(null, [Validators.required]),
    "lozinka": new FormControl(null, [Validators.required]),
    "ime": new FormControl(null, [Validators.required]),
    "prezime": new FormControl(null, [Validators.required]),
    "email": new FormControl(null, [Validators.required])

  })
  
  @Output()
  public createEvent: EventEmitter<any> = new EventEmitter<any>();
  
  @Input()
  kupac: Kupac|null = null;

  constructor( public snackBar:MatSnackBar, private _formBuilder: FormBuilder,private router: Router) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    console.log(this.kupac);
    this.forma.get("id")?.setValue(this.kupac?.id);
    this.forma.get("korisnickoIme")?.setValue(this.kupac?.korisnickoIme);
    this.forma.get("lozinka")?.setValue(this.kupac?.lozinka);
    this.forma.get("ime")?.setValue(this.kupac?.ime);
    this.forma.get("prezime")?.setValue(this.kupac?.prezime);
    this.forma.get("email")?.setValue(this.kupac?.email);

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
      let snackBarRef = this.snackBar.open('Registered as a Kupac', 'OK!',  {duration: 3000 });
      this.router.navigate(["login"]);
  }
}

}
