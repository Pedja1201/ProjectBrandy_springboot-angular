import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from 'src/app/model/admin';

const ADMIN_URL = 'http://localhost:8080/api/admins/';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<Admin[]>(ADMIN_URL + "allAdmins")
  }

  getOne(username : string) {
    return this.http.get<Admin>(ADMIN_URL + username);
  }

  create(user: Admin) {
    return this.http.post(ADMIN_URL, user);
  }

  update(id : number, user : Admin) {
    return this.http.put(ADMIN_URL + id, user);
  }

  delete(id: number) {
    return this.http.delete(ADMIN_URL + id);
  }

  checkEmail(mail: string, id : string) {
    return this.http.get(ADMIN_URL + "checkEmail/" + id + "/" + mail);
  }

  checkUsername(username: string, id : string) {
    return this.http.get(ADMIN_URL + "checkUsername/" + id + "/" + username);
  }

  checkUpin(upin: string, id : string) {
    return this.http.get(ADMIN_URL + "checkupin/" + id + "/" + upin);
  }
}
