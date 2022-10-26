import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Brandy, BrandyPage } from 'src/app/model/brandy';
import { LoginService } from 'src/app/service/auth/login.service';
import { BrandiesService } from 'src/app/service/brandies/brandies.service';

@Component({
  selector: 'app-brandies',
  templateUrl: './brandies.component.html',
  styleUrls: ['./brandies.component.css']
})
export class BrandiesComponent implements OnInit {

  title="Available Brandies";
  prikaz = false;
  prikazPretrage = false;
  
  //Rakije
  brandies : Brandy[]=[];
  brandyUpdate : Brandy | null = null;
  parameters : any = {}; //Za pretragu


  constructor(private service : BrandiesService, public snackBar:MatSnackBar, public loginService : LoginService) {
    // service.getAll().subscribe((rakije : RakijaPage<Rakija>) => {
    //   this.rakije = rakije.content;
    // })
  }

  open(){
    this.prikazPretrage = true
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.service.getAll().subscribe((value) => {
      this.brandies = value.content;
    }, (error) => {
      console.log(error);
    });
  }

  delete(id: any) {
    this.service.delete(id).subscribe((value) => {
      this.getAll();
      let snackBarRef = this.snackBar.open('Deleted...', 'OK!',  {duration: 3000 });
    }, (error) => {
      console.log(error);
    })
  }

  create(brandy: Brandy) {
    this.service.create(brandy).subscribe((value) => {
      this.getAll();
      let snackBarRef = this.snackBar.open('Created', 'OK!',  {duration: 3000 });
    }, (error) => {
      console.log(error);
    })
  }

  update(brandy: Brandy) {
    if(this.brandyUpdate && this.brandyUpdate.id) {
      this.service.update(this.brandyUpdate.id, brandy).subscribe((value) => {
        this.getAll();
        let snackBarRef = this.snackBar.open('Updated', 'OK!',  {duration: 2000 });
      }, (error) => {
        console.log(error);
      })
    }

  }

  setUpdate(rakija: any) {
    this.brandyUpdate = { ...rakija };
    this.prikaz = true;
  }

  // Pretraga
  search(parameters : any) {
    if(parameters === undefined) {
      parameters = this.parameters;
    } else {
      this.parameters = parameters;
    }
    this.service.pretrazi(parameters).subscribe((rakije : Brandy[]) => {
      this.brandies = rakije;
    });
  }

}

