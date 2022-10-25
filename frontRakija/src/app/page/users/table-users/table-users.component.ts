import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserPage } from 'src/app/model/user';

@Component({
  selector: 'app-table-users',
  templateUrl: './table-users.component.html',
  styleUrls: ['./table-users.component.css']
})
export class TableUsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'username', 'password',  "action"];
  dataSource : UserPage<User> | undefined;
  title="Table Users";

  @Input()
  elementi: any[] = [];

  @Output()
  deleted : EventEmitter<any> = new EventEmitter<any>();

  @Output()
  updated: EventEmitter<any> = new EventEmitter<any>();

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  deleting(id:number) {
    this.deleted.emit(id);
  }

  updating(id:number) {
    this.updated.emit(id);
  }

  details(user: User) {
    this.router.navigate(["/users", user.id]);
  }

}
