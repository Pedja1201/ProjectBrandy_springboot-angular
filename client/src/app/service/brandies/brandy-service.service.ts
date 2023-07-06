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
}
