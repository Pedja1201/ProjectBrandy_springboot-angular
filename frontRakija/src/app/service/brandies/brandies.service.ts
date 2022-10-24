import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Brandy, BrandyPage } from '../../model/brandy';
import { LoginService } from '../auth/login.service';

@Injectable({
  providedIn: 'root'
})
export class BrandiesService {

  private baseUrl = environment.baseUrl //Dobavljanje url adrese da ne kucamo rucno

  constructor(private client : HttpClient, private loginService : LoginService) { }


  getAll(){
    return this.client.get<BrandyPage<Brandy>>(`${this.baseUrl}/brandies`)
  }

  getOne(id : number){
    return this.client.get<Brandy[]>(`${this.baseUrl}/brandies/${id}`)
  }

  create(brandy : Brandy){
    return this.client.post(`${this.baseUrl}/brandies`, brandy)
  }

  update(id:number, brandy : Brandy){
    return this.client.put<Brandy[]>(`${this.baseUrl}/brandies/${id}`, brandy)
  }

  delete(id:number){
    return this.client.delete<Brandy[]>(`${this.baseUrl}/rakije/${id}`)
  }

  pretrazi(parameters: any = undefined) {
    if (parameters == undefined) {
      return this.client.get<Brandy[]>(`${this.baseUrl}/brandies`);
    }
    return this.client.get<BrandyPage<Brandy>>(`${this.baseUrl}/brandies`).pipe(
      map(brandies => {
        return brandies.content.filter(brandy => {
          let rezultat = true;
          if (brandy["name"] && parameters["name"]) {
            rezultat &&= brandy["name"] == parameters["name"];
          }
          if (brandy["price"] && parameters["cenaOd"]) {
            rezultat &&= brandy["price"] >= parameters["cenaOd"]
          }
          if (brandy["price"] && parameters["cenaDo"]) {
            rezultat &&= brandy["price"] <= parameters["cenaDo"]
          }
          if (brandy["year"] && parameters["godinaOd"]) {
            rezultat &&= brandy["year"] >= parameters["godinaOd"]
          }
          if (brandy["year"] && parameters["godinaDo"]) {
            rezultat &&= brandy["year"] <= parameters["godinaDo"]
          }
          return rezultat;
        });
      })
    );
  }

}
