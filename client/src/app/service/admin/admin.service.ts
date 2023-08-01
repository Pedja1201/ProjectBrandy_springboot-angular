import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin, AdminPage } from 'src/app/model/admin';

const ADMIN_URL = 'http://localhost:8080/api/admins/';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getAll(pageNumber?:number, pageSize?:number){
    let params = new HttpParams();

    if (pageNumber !== undefined) {
      params = params.set('pageNumber', pageNumber.toString());
    }
  
    if (pageSize !== undefined) {
      params = params.set('pageSize', pageSize.toString());
    }
    
    return this.http.get<AdminPage<Admin>>(ADMIN_URL, { params })
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
