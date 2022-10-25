import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Admin } from '../../model/admin';
import { Customer } from '../../model/customer';
import { Token } from '../../model/token';
import { User } from '../../model/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = environment.baseUrl //Dobavljanje url adrese da ne kucamo rucno

  token : Token = new Token()
  user : User = new User()
  rolesSubject: BehaviorSubject<Set<string>> = new BehaviorSubject<Set<string>>(new Set([]));


  constructor(private client : HttpClient, public snackBar : MatSnackBar) { }

  isLoggedIn(){
    if (localStorage.getItem('Token')) {
      return true;
    } else {
      return false;
    }
  }

  login(user:User){
    return this.client.post<Token>(`${this.baseUrl}/login`, user).pipe(
      map(user => {
        localStorage.setItem('Token', JSON.stringify(user));
      })
    );
  }

  registerKupac(customer:Customer){
    return this.client.post<Token>(`${this.baseUrl}/registerCustomer`, customer).pipe(
      tap(token => {
        this.token = token;
        this.user = JSON.parse(atob(token.token.split(".")[1]));
      })
    );
  }


  registerAdmin(admin:Admin){
    return this.client.post<Token>(`${this.baseUrl}/registerAdmin`, admin).pipe(
      tap(token => {
        this.token = token;
        this.user = JSON.parse(atob(token.token.split(".")[1]));
      })
    );
  }

  logout(): void {
    localStorage.removeItem("Token");
    let snackBarRef = this.snackBar.open('Successfully logged out!', 'Confrim', {duration: 3000 });
  }

  //Za proveru prava pristupa rutiranja
  validateRoles(roles: any): boolean {  //roles:string[] je bio
    if (this.user) {
      // @ts-ignore
      const userRoles = new Set(this.user.roles);
      for (const r of roles) {
        if (userRoles.has(r)) {
          return true;
        }
      }
    }
    return false;
  }
}
