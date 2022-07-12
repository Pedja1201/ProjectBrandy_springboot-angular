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

  title='Registrovanje Administratora'
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
    "email": new FormControl(null, [Validators.required]),
    "jmbg": new FormControl(null, [Validators.required])
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
    this.forma.get("korisnickoIme")?.setValue(this.admin?.korisnickoIme);
    this.forma.get("lozinka")?.setValue(this.admin?.lozinka);
    this.forma.get("ime")?.setValue(this.admin?.ime);
    this.forma.get("prezime")?.setValue(this.admin?.prezime);
    this.forma.get("email")?.setValue(this.admin?.email);
    this.forma.get("jmbg")?.setValue(this.admin?.jmbg);

  }

  ngOnInit(): void {
    this.forma.get("id")?.setValue(this.admin?.id);
    this.forma.get("korisnickoIme")?.setValue(this.admin?.id);
    this.forma.get("lozinka")?.setValue(this.admin?.id);
    this.forma.get("ime")?.setValue(this.admin?.id);
    this.forma.get("prezime")?.setValue(this.admin?.id);
    this.forma.get("email")?.setValue(this.admin?.id);
    this.forma.get("jmbg")?.setValue(this.admin?.id);
  }

  create() {
    if(this.forma.valid) {
      this.createEvent.emit(this.forma.value);
      let snackBarRef = this.snackBar.open('Registered as a Admin', 'OK!',  {duration: 3000 });
      this.router.navigate(["login"]);
  }
}

}
