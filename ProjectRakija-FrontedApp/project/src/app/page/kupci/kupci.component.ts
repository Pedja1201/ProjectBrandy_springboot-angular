import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Kupac, KupacPage } from 'src/app/model/kupac';
import { KupciService } from 'src/app/service/kupci.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-kupci',
  templateUrl: './kupci.component.html',
  styleUrls: ['./kupci.component.css']
})
export class KupciComponent implements OnInit {

  title="Kupci";
  prikaz = false;
  
  kupci : Kupac[] = [];
  kupacUpdate: Kupac | null = null;

  constructor(private service : KupciService, public snackBar:MatSnackBar, public loginService : LoginService) {
    service.getAll().subscribe((kupci : KupacPage<Kupac>) => {
      this.kupci = kupci.content;
    })
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.service.getAll().subscribe((value) => {
      this.kupci = value.content;
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

  create(kupac: Kupac) {
    this.service.create(kupac).subscribe((value) => {
      this.getAll();
      let snackBarRef = this.snackBar.open('Created', 'OK!',  {duration: 3000 });
    }, (error) => {
      console.log(error);
    })
  }

  update(kupac: Kupac) {
    if(this.kupacUpdate && this.kupacUpdate.id) {
      this.service.update(this.kupacUpdate.id, kupac).subscribe((value) => {
        this.getAll();
        let snackBarRef = this.snackBar.open('Updated', 'OK!',  {duration: 2000 });
      }, (error) => {
        console.log(error);
      })
    }

  }

  setUpdate(kupac: any) {
    this.kupacUpdate = { ...kupac };
    this.prikaz = true;
  }

}

