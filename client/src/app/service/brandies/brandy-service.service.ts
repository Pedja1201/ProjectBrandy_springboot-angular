import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Brandy, BrandyPage } from 'src/app/model/brandy';


@Injectable({
  providedIn: 'root'
})
export class BrandyServiceService {
  private API_URL = 'http://localhost:8080/api/brandies';

  constructor(private http: HttpClient) { }

  getAll(pageNumber?: number, pageSize?: number){
    let params = new HttpParams();

    if (pageNumber !== undefined) {
      params = params.set('pageNumber', pageNumber.toString());
    }
  
    if (pageSize !== undefined) {
      params = params.set('pageSize', pageSize.toString());
    }

    return this.http.get<BrandyPage<Brandy>>(this.API_URL, { params })
  }

  getOne(id : number) {
    return this.http.get<Brandy>(this.API_URL + "/" + id);
  }

  getBrandyByName(name : String) {
    return this.http.get<Brandy>(this.API_URL + "/" + name + "/brandy");
  }

  searchBrandy(name?: string, minPrice?: number, maxPrice?: number, pageNumber?: number, pageSize?: number) {
    let params = new HttpParams();
  
    if (name !== undefined) {
      params = params.set('name', name);
    }
  
    if (minPrice !== undefined) {
      params = params.set('minPrice', minPrice.toString());
    }
  
    if (maxPrice !== undefined) {
      params = params.set('maxPrice', maxPrice.toString());
    }
  
    if (pageNumber !== undefined) {
      params = params.set('pageNumber', pageNumber.toString());
    }
  
    if (pageSize !== undefined) {
      params = params.set('pageSize', pageSize.toString());
    }
  
    return this.http.get<BrandyPage<Brandy>>(this.API_URL + "/brandySearch", { params });
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
