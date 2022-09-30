import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User, UserPage } from 'src/app/model/user';
import { UsersService } from 'src/app/service/users/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  title="Users";
  prikaz = false;
  
  //Users
  users : User[] = [];
  userUpdate: User | null = null;

  constructor(private service : UsersService, public snackBar:MatSnackBar) {
    service.getAll().subscribe((users : UserPage<User>) => {
      this.users = users.content;
    })
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.service.getAll().subscribe((value) => {
      this.users = value.content;
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

  create(user: User) {
    this.service.create(user).subscribe((value) => {
      this.getAll();
      let snackBarRef = this.snackBar.open('Created', 'OK!',  {duration: 3000 });
    }, (error) => {
      console.log(error);
    })
  }

  update(user: User) {
    if(this.userUpdate && this.userUpdate.id) {
      this.service.update(this.userUpdate.id, user).subscribe((value) => {
        this.getAll();
        let snackBarRef = this.snackBar.open('Updated', 'OK!',  {duration: 2000 });
      }, (error) => {
        console.log(error);
      })
    }

  }

  setUpdate(user: any) {
    this.userUpdate = { ...user };
    this.prikaz = true;
  }

}
