import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Porudzbina, PorudzbinaPage } from 'src/app/model/porudzbina';
import { LoginService } from 'src/app/service/auth/login.service';
import { PorudzbineService } from 'src/app/service/porudzbine/porudzbine.service';

@Component({
  selector: 'app-porudzbine',
  templateUrl: './porudzbine.component.html',
  styleUrls: ['./porudzbine.component.css']
})
export class PorudzbineComponent implements OnInit {
  title="Porudzbine"
  prikaz = false;
  

  porudzbine : Porudzbina[] = [];
  porudzbinaUpdate: Porudzbina | null = null;

  constructor(private service : PorudzbineService,  public snackBar:MatSnackBar,public loginService : LoginService) {
    service.getAll().subscribe((porudzbine : PorudzbinaPage<Porudzbina>)=> {
      this.porudzbine = porudzbine.content;
    })
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.service.getAll().subscribe((value) => {
      this.porudzbine = value.content;
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

  create(porudzbina: Porudzbina) {
    this.service.create(porudzbina).subscribe((value) => {
      this.getAll();
      let snackBarRef = this.snackBar.open('Created', 'OK!',  {duration: 3000 });
    }, (error) => {
      console.log(error);
    })
  }

  update(porudzbina: Porudzbina) {
    if(this.porudzbinaUpdate && this.porudzbinaUpdate.id) {
      this.service.update(this.porudzbinaUpdate.id, porudzbina).subscribe((value) => {
        this.getAll();
        let snackBarRef = this.snackBar.open('Updated', 'OK!',  {duration: 2000 });
      }, (error) => {
        console.log(error);
      })
    }

  }

  setUpdate(porudzbina: any) {
    this.porudzbinaUpdate = { ...porudzbina };
    this.prikaz = true;
  }

}
