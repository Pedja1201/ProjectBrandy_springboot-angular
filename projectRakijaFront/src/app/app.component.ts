import { Component, OnInit } from '@angular/core';
import { LoginService } from './service/auth/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'project';

  constructor(public loginService : LoginService){}

  ngOnInit(){
    this.loginService.isLoggedIn()
  }
}
