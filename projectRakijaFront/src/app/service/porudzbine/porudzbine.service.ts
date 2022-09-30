import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Porudzbina, PorudzbinaPage } from '../../model/porudzbina';
import { LoginService } from '../auth/login.service';

@Injectable({
  providedIn: 'root'
})
export class PorudzbineService {

  private baseUrl = environment.baseUrl //Dobavljanje url adrese da ne kucamo rucno

  constructor(private client : HttpClient,  private loginService : LoginService) { }
  
  
  getAll(){
    return this.client.get<PorudzbinaPage<Porudzbina>>(`${this.baseUrl}/porudzbine`)
  }

  getOne(id : number){
    return this.client.get<Porudzbina[]>(`${this.baseUrl}/porudzbine/${id}`)
  }

  create(porudzbina : Porudzbina){
    return this.client.post(`${this.baseUrl}/porudzbine`, porudzbina)
  }

  update(id:number, porudzbina : Porudzbina){
    return this.client.put<Porudzbina[]>(`${this.baseUrl}/porudzbine/${id}`, porudzbina)
  }

  delete(id:number){
    return this.client.delete<Porudzbina[]>(`${this.baseUrl}/porudzbine/${id}`)
  }
}
