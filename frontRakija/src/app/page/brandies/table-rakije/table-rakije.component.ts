import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Brandy, BrandyPage } from 'src/app/model/brandy';
import { LoginService } from 'src/app/service/auth/login.service';

@Component({
  selector: 'app-table-rakije',
  templateUrl: './table-rakije.component.html',
  styleUrls: ['./table-rakije.component.css']
})
export class TableRakijeComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'type','price', 'year', 'strength',"action"];
  dataSource : BrandyPage<Brandy> |undefined;
  title="Table Brandies";

  @Input()
  elements: any[] = [];

  @Output()
  uklanjanje : EventEmitter<any> = new EventEmitter<any>();

  @Output()
  izmena: EventEmitter<any> = new EventEmitter<any>();

  constructor(private router : Router, public loginService : LoginService) { }

  ngOnInit(): void {
  }

  deleting(id:number) {
    this.uklanjanje.emit(id);
  }

  updating(id:number) {
    this.izmena.emit(id);
  }

  details(brandy: Brandy) {
    this.router.navigate(["/brandies", brandy.id]);
  }

}


