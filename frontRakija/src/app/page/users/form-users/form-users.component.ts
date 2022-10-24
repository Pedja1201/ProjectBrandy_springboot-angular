import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-form-users',
  templateUrl: './form-users.component.html',
  styleUrls: ['./form-users.component.css']
})
export class FormUsersComponent implements OnInit {
  title='Form Users'

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
  })
  
  @Input()
  user: User|null = null;

  @Output()
  public createEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _formBuilder: FormBuilder) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    console.log(this.user);
    this.forma.get("id")?.setValue(this.user?.id);
    this.forma.get("korisnickoIme")?.setValue(this.user?.korisnickoIme);
    this.forma.get("lozinka")?.setValue(this.user?.lozinka)  
  }

  ngOnInit(): void {
    this.forma.get("id")?.setValue(this.user?.id);
    this.forma.get("korisnickoIme")?.setValue(this.user?.id);
    this.forma.get("lozinka")?.setValue(this.user?.id);
  }

  create() {
    if(this.forma.valid) {
      this.createEvent.emit(this.forma.value);
    }
  }

}
