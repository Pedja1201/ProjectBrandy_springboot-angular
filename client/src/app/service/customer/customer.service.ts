import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer, CustomerPage } from 'src/app/model/customer';

const CUSTOMER_URL = 'http://localhost:8080/api/customers/';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getAll(pageNumber?:number, pageSize?:number){
    let params = new HttpParams();

    if (pageNumber !== undefined) {
      params = params.set('pageNumber', pageNumber.toString());
    }
  
    if (pageSize !== undefined) {
      params = params.set('pageSize', pageSize.toString());
    }

    return this.http.get<CustomerPage<Customer>>(CUSTOMER_URL, { params })
  }

  getOne(username : string) {
    return this.http.get<Customer>(CUSTOMER_URL + username);
  }

  create(user: Customer) {
    return this.http.post(CUSTOMER_URL, user);
  }

  update(id : number, user : Customer) {
    return this.http.put(CUSTOMER_URL + id, user);
  }

  delete(id: number) {
    return this.http.delete(CUSTOMER_URL + id);
  }
  
  checkEmail(mail: string, id : string) {
    return this.http.get(CUSTOMER_URL + "checkEmail/" + id + "/" + mail);
  }

  checkUsername(username: string, id : string) {
    return this.http.get(CUSTOMER_URL + "checkUsername/" + id + "/" + username);
  }
}
