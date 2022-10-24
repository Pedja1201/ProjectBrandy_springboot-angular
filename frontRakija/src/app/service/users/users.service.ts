import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserPage, User } from '../../model/user';
import { LoginService } from '../auth/login.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl = environment.baseUrl //Dobavljanje url adrese da ne kucamo rucno

  constructor(private client : HttpClient, private loginService : LoginService) { }


  getAll(){
    return this.client.get<UserPage<User>>(`${this.baseUrl}/users`)
  }

  getOne(id : number){
    return this.client.get<User[]>(`${this.baseUrl}/users/${id}`)
  }

  create(user : User){
    return this.client.post(`${this.baseUrl}/users`, user)
  }

  update(id:number, user : User){
    return this.client.put<User[]>(`${this.baseUrl}/users/${id}`, user)
  }

  delete(id:number){
    return this.client.delete<User[]>(`${this.baseUrl}/users/${id}`)
  }

}
