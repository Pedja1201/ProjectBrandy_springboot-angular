import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Kupac, KupacPage } from '../model/kupac';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class KupciService {
  private baseUrl = environment.baseUrl //Dobavljanje url adrese da ne kucamo rucno

  constructor(private client : HttpClient, private loginService : LoginService) { } //Login

  
  getAll(){
    return this.client.get<KupacPage<Kupac>>(`${this.baseUrl}/kupci`)
  }

  getOne(id : number){
    return this.client.get<Kupac[]>(`${this.baseUrl}/kupci/${id}`)
  }

  create(student : Kupac){
    return this.client.post(`${this.baseUrl}/kupci`, student)
  }

  update(id:number, student : Kupac){
    return this.client.put<Kupac[]>(`${this.baseUrl}/kupci/${id}`, student)
  }

  delete(id:number){
    return this.client.delete<Kupac[]>(`${this.baseUrl}/kupci/${id}`)
  }
  pretrazi(parametri: any = undefined) {
    if (parametri == undefined) {
      return this.client.get<Kupac[]>(`${this.baseUrl}/kupci`);
    }
    return this.client.get<KupacPage<Kupac>>(`${this.baseUrl}/kupci`).pipe(
      map(kupci => {
        return kupci.content.filter(student => {
          let rezultat = true;
          if (student["ime"] && parametri["ime"]) {
            rezultat &&= student["ime"] == parametri["ime"];
          }
          if (student["email"] && parametri["email"]) {
            rezultat &&= student["email"] == parametri["email"];
          }
          return rezultat;
        });
      })
    );
  }

  exportPdf(){
    return this.client.get(`${this.baseUrl}/kupci/export`, {responseType:'blob'})
  }
}
