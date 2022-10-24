import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Kupac, KupacPage } from 'src/app/model/kupac';
import { LoginService } from 'src/app/service/auth/login.service';

@Component({
  selector: 'app-table-kupci',
  templateUrl: './table-kupci.component.html',
  styleUrls: ['./table-kupci.component.css']
})
export class TableKupciComponent implements OnInit {

  displayedColumns: string[] = ['id', 'korisnickoIme', 'ime','prezime', 'email',"akcije"];
  dataSource : KupacPage<Kupac> |undefined;
  title="Tabela Kupca";

  @Input()
  elementi: any[] = [];

  @Output()
  uklanjanje : EventEmitter<any> = new EventEmitter<any>();

  @Output()
  izmena: EventEmitter<any> = new EventEmitter<any>();

  constructor(private router : Router, public loginService : LoginService) { }

  ngOnInit(): void {
  }

  ukloni(id:number) {
    this.uklanjanje.emit(id);
  }

  izmeni(id:number) {
    this.izmena.emit(id);
  }

  prikaziDetalje(kupac: Kupac) {
    this.router.navigate(["/kupci", kupac.id]);
  }

}

