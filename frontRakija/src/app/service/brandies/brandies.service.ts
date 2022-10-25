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

  private baseUrl = "/api/brandies"

  constructor(private client : HttpClient, private loginService : LoginService) { }


  getAll(){
    return this.client.get<BrandyPage<Brandy>>(this.baseUrl)
  }

  getOne(id : number){
    return this.client.get<Brandy[]>(`${this.baseUrl}/${id}`)
  }

  create(brandy : Brandy){
    return this.client.post(this.baseUrl, brandy)
  }

  update(id:number, brandy : Brandy){
    return this.client.put<Brandy[]>(`${this.baseUrl}/${id}`, brandy)
  }

  delete(id:number){
    return this.client.delete<Brandy[]>(`${this.baseUrl}/${id}`)
  }

  pretrazi(parameters: any = undefined) {
    if (parameters == undefined) {
      return this.client.get<Brandy[]>(this.baseUrl);
    }
    return this.client.get<BrandyPage<Brandy>>(this.baseUrl).pipe(
      map(brandies => {
        return brandies.content.filter(brandy => {
          let rezultat = true;
          if (brandy["name"] && parameters["name"]) {
            rezultat &&= brandy["name"] == parameters["name"];
          }
          if (brandy["price"] && parameters["priceFor"]) {
            rezultat &&= brandy["price"] >= parameters["priceFor"]
          }
          if (brandy["price"] && parameters["priceTo"]) {
            rezultat &&= brandy["price"] <= parameters["priceTo"]
          }
          if (brandy["year"] && parameters["yearFor"]) {
            rezultat &&= brandy["year"] >= parameters["yearFor"]
          }
          if (brandy["year"] && parameters["yearTo"]) {
            rezultat &&= brandy["year"] <= parameters["yearTo"]
          }
          return rezultat;
        });
      })
    );
  }

}
