import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from 'src/app/model/customer';

const CUSTOMER_URL = 'http://localhost:8080/api/customers/';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getOne(username : string) {
    return this.http.get<Customer>(CUSTOMER_URL + username);
  }

  update(id : number, user : Customer) {
    return this.http.put(CUSTOMER_URL + id, user);
  }

  checkEmail(mail: string, id : string) {
    return this.http.get(CUSTOMER_URL + "checkEmail/" + id + "/" + mail);
  }

  checkUsername(username: string, id : string) {
    return this.http.get(CUSTOMER_URL + "checkUsername/" + id + "/" + username);
  }
}
