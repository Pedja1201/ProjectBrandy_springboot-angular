import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Porudzbina, PorudzbinaPage } from 'src/app/model/porudzbina';
import { LoginService } from 'src/app/service/auth/login.service';

@Component({
  selector: 'app-table-porudzbine',
  templateUrl: './table-porudzbine.component.html',
  styleUrls: ['./table-porudzbine.component.css']
})
export class TablePorudzbineComponent implements OnInit {
  displayedColumns: string[] = ['id', 'datumKupovine', 'kolicina','rakija', 'kupac',"akcije"];
  dataSource : PorudzbinaPage<Porudzbina> |undefined;
  title="Tabela Porudzbine";

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

  prikaziDetalje(porudzbina: Porudzbina) {
    this.router.navigate(["/porudzbine", porudzbina.id]);
  }

}
