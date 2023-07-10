import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Brandy, BrandyPage } from 'src/app/model/brandy';


@Injectable({
  providedIn: 'root'
})
export class BrandyServiceService {
  private API_URL = 'http://localhost:8080/api/brandies';

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<BrandyPage<Brandy>>(this.API_URL)
  }

  getOne(id : number) {
    return this.http.get<Brandy>(this.API_URL + "/" + id);
  }

  getBrandyByName(name : string) {
    return this.http.get<Brandy>(this.API_URL + "/" + name + "/brandy");
  }

  create(brandy: Brandy) {
    return this.http.post(this.API_URL, brandy);
  }

  update(id : number, brandy : Brandy) {
    return this.http.put(this.API_URL + "/" +  id, brandy);
  }

  delete(id: number) {
    return this.http.delete(this.API_URL + "/" + id);
  }
}
