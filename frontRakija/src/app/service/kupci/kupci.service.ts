import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Kupac, KupacPage } from '../../model/kupac';
import { LoginService } from '../auth/login.service';

@Injectable({
  providedIn: 'root'
})
export class KupciService {
  private baseUrl = environment.baseUrl //Dobavljanje url adrese da ne kucamo rucno

  constructor(private client : HttpClient, private loginService : LoginService) { } //Login

  
  getAll(){
    return this.client.get<KupacPage<Kupac>>(`${this.baseUrl}/kupci`)
  }

  getOne(id : number): Observable<Kupac[]>{
    return this.client.get<Kupac[]>(`${this.baseUrl}/kupci/${id}`)
  }

  create(student : Kupac):Observable<string>{
    return this.client.post<string>(`${this.baseUrl}/kupci`, student)
  }

  update(id:number, student : Kupac){
    return this.client.put<Kupac[]>(`${this.baseUrl}/kupci/${id}`, student)
  }

  delete(kupac:Kupac){
    return this.client.delete<string>(this.baseUrl + "?id=" + kupac.id)
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
