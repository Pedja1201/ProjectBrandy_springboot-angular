import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from 'src/app/model/admin';

const ADMIN_URL = 'http://localhost:8080/api/admins/';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getOne(username : string) {
    return this.http.get<Admin>(ADMIN_URL + username);
  }

  update(id : number, user : Admin) {
    return this.http.put(ADMIN_URL + id, user);
  }

  checkEmail(mail: string, id : string) {
    return this.http.get(ADMIN_URL + "checkEmail/" + id + "/" + mail);
  }

  checkUsername(username: string, id : string) {
    return this.http.get(ADMIN_URL + "checkUsername/" + id + "/" + username);
  }

}
