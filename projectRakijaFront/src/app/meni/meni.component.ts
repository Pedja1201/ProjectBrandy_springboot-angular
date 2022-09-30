import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/auth/login.service';

@Component({
  selector: 'app-meni',
  templateUrl: './meni.component.html',
  styleUrls: ['./meni.component.css']
})
export class MeniComponent implements OnInit {

  constructor(public loginService : LoginService) { }

  ngOnInit(): void {
  }

}
