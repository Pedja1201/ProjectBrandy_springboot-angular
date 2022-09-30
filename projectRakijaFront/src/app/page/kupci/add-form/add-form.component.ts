import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroupDirective, Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Kupac } from 'src/app/model/kupac';
import { KupciService } from 'src/app/service/kupci/kupci.service';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent {
  kupac : Kupac = new Kupac();
  errorMessage : string = '';

  isLinear = false;
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  
  ngOnInit(): void {
  }

  constructor(private service : KupciService,private _formBuilder: FormBuilder,
    public snackBar:MatSnackBar, private router: Router,) { }


  create(kupac: Kupac) {
    this.service.create(kupac).subscribe((value) => {
      this.service.getAll();
      let snackBarRef = this.snackBar.open('Created', 'OK!',  {duration: 3000 });
    }, (error) => {
      console.log(error);
    })
  }

  goBack(){
    this.router.navigate(['/users']);  
  }

}
