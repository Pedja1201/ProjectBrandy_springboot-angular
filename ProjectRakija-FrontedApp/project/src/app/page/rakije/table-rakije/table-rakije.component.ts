import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { KupacPage, Kupac } from 'src/app/model/kupac';
import { Rakija } from 'src/app/model/rakija';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-table-rakije',
  templateUrl: './table-rakije.component.html',
  styleUrls: ['./table-rakije.component.css']
})
export class TableRakijeComponent implements OnInit {

  displayedColumns: string[] = ['id', 'naziv', 'sorta','cena', 'godina',"akcije"];
  dataSource : KupacPage<Kupac> |undefined;
  title="Tabela Rakije";

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

  prikaziDetalje(rakija: Rakija) {
    this.router.navigate(["/rakije", rakija.id]);
  }

}


