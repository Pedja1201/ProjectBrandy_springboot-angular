import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Brandy, BrandyPage } from 'src/app/model/brandy';
import { LoginService } from 'src/app/service/auth/login.service';

@Component({
  selector: 'app-table-brandies',
  templateUrl: './table-brandies.component.html',
  styleUrls: ['./table-brandies.component.css']
})
export class TableBrandiesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'type','price', 'year', 'strength',"action"];
  dataSource : BrandyPage<Brandy> |undefined;
  title="Table Brandies";

  @Input()
  elements: any[] = [];

  @Output()
  deleted : EventEmitter<any> = new EventEmitter<any>();

  @Output()
  updated: EventEmitter<any> = new EventEmitter<any>();

  constructor(private router : Router, public loginService : LoginService) { }

  ngOnInit(): void {
  }

  deleting(id:number) {
    this.deleted.emit(id);
  }

  updating(id:number) {
    this.updated.emit(id);
  }

  details(brandy: Brandy) {
    this.router.navigate(["/brandies", brandy.id]);
  }

}


