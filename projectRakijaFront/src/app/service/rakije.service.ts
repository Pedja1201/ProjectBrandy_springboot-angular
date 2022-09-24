import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Rakija, RakijaPage } from '../model/rakija';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class RakijeService {

  private baseUrl = environment.baseUrl //Dobavljanje url adrese da ne kucamo rucno

  constructor(private client : HttpClient, private loginService : LoginService) { }


  getAll(){
    return this.client.get<RakijaPage<Rakija>>(`${this.baseUrl}/rakije`)
  }

  getOne(id : number){
    return this.client.get<Rakija[]>(`${this.baseUrl}/rakije/${id}`)
  }

  create(rakija : Rakija){
    return this.client.post(`${this.baseUrl}/rakije`, rakija)
  }

  update(id:number, rakija : Rakija){
    return this.client.put<Rakija[]>(`${this.baseUrl}/rakije/${id}`, rakija)
  }

  delete(id:number){
    return this.client.delete<Rakija[]>(`${this.baseUrl}/rakije/${id}`)
  }

  pretrazi(parametri: any = undefined) {
    if (parametri == undefined) {
      return this.client.get<Rakija[]>(`${this.baseUrl}/rakije`);
    }
    return this.client.get<RakijaPage<Rakija>>(`${this.baseUrl}/rakije`).pipe(
      map(rakije => {
        return rakije.content.filter(rakija => {
          let rezultat = true;
          if (rakija["naziv"] && parametri["naziv"]) {
            rezultat &&= rakija["naziv"] == parametri["naziv"];
          }
          if (rakija["cena"] && parametri["cenaOd"]) {
            rezultat &&= rakija["cena"] >= parametri["cenaOd"]
          }
          if (rakija["cena"] && parametri["cenaDo"]) {
            rezultat &&= rakija["cena"] <= parametri["cenaDo"]
          }
          if (rakija["godina"] && parametri["godinaOd"]) {
            rezultat &&= rakija["godina"] >= parametri["godinaOd"]
          }
          if (rakija["godina"] && parametri["godinaDo"]) {
            rezultat &&= rakija["godina"] <= parametri["godinaDo"]
          }
          return rezultat;
        });
      })
    );
  }

}
