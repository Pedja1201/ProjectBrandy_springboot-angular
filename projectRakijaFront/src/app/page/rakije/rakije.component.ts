import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Rakija, RakijaPage } from 'src/app/model/rakija';
import { LoginService } from 'src/app/service/auth/login.service';
import { RakijeService } from 'src/app/service/rakije/rakije.service';

@Component({
  selector: 'app-rakije',
  templateUrl: './rakije.component.html',
  styleUrls: ['./rakije.component.css']
})
export class RakijeComponent implements OnInit {

  title="Dostupne Rakije";
  prikaz = false;
  prikazPretrage = false;
  
  //Rakije
  rakije : Rakija[]=[];
  rakijaUpdate : Rakija | null = null;
  parametri : any = {}; //Za pretragu


  constructor(private service : RakijeService, public snackBar:MatSnackBar, public loginService : LoginService) {
    service.getAll().subscribe((rakije : RakijaPage<Rakija>) => {
      this.rakije = rakije.content;
    })
  }

  open(){
    this.prikazPretrage = true
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.service.getAll().subscribe((value) => {
      this.rakije = value.content;
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

  create(rakija: Rakija) {
    this.service.create(rakija).subscribe((value) => {
      this.getAll();
      let snackBarRef = this.snackBar.open('Created', 'OK!',  {duration: 3000 });
    }, (error) => {
      console.log(error);
    })
  }

  update(rakija: Rakija) {
    if(this.rakijaUpdate && this.rakijaUpdate.id) {
      this.service.update(this.rakijaUpdate.id, rakija).subscribe((value) => {
        this.getAll();
        let snackBarRef = this.snackBar.open('Updated', 'OK!',  {duration: 2000 });
      }, (error) => {
        console.log(error);
      })
    }

  }

  setUpdate(rakija: any) {
    this.rakijaUpdate = { ...rakija };
    this.prikaz = true;
  }

  // Pretraga
  search(parametri : any) {
    if(parametri === undefined) {
      parametri = this.parametri;
    } else {
      this.parametri = parametri;
    }
    this.service.pretrazi(parametri).subscribe((rakije : Rakija[]) => {
      this.rakije = rakije;
    });
  }

}

