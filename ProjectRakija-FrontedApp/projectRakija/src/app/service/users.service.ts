import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserPage, User } from '../model/user';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl = environment.baseUrl //Dobavljanje url adrese da ne kucamo rucno

  constructor(private client : HttpClient, private loginService : LoginService) { }


  getAll(){
    return this.client.get<UserPage<User>>(`${this.baseUrl}/korisnici`)
  }

  getOne(id : number){
    return this.client.get<User[]>(`${this.baseUrl}/korisnici/${id}`)
  }

  create(user : User){
    return this.client.post(`${this.baseUrl}/korisnici`, user)
  }

  update(id:number, user : User){
    return this.client.put<User[]>(`${this.baseUrl}/korisnici/${id}`, user)
  }

  delete(id:number){
    return this.client.delete<User[]>(`${this.baseUrl}/korisnici/${id}`)
  }

}
