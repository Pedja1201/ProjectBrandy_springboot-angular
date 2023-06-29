import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from './service/token-storage/token-storage.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Online store';
  
  isLoggedIn = false;
  username!: string;
  private roles!: string[];

  constructor(private router : Router, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      // const token = this.tokenStorageService.getUserToken();
      // const user = this.getDecodedAccessToken(token)
      //console.log(user)
      const user1 = this.tokenStorageService.getUser();

      let roles = [];
      this.username = user1.sub
      // for(let r in user.roles){
      //   roles.push(user.roles[r])
      // }
      roles.push(...user1.roles)

      console.log("Roles: ", roles)
      console.log("Username: ", this.username)
    }   
       
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
