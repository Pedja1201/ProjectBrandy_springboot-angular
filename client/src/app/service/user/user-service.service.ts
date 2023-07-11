import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from 'src/app/model/customer';
import { User } from 'src/app/model/user';

const USER_URL = 'http://localhost:8080/api/users/';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient) { }

  getAll(pageNo: number, pageSize: number, sortBy: string, name: string, surname: string, roleId: string) {
    const params = new HttpParams().set('pageNo', pageNo.toString()).set('pageSize', pageSize.toString()).set('sortBy', sortBy).set('name', name).set('surname', surname).set('roleId', roleId);
    return this.http.get<User[]>(USER_URL, {params});
  }

  getOne(username : string) {
    return this.http.get<User>(USER_URL + username + "/details");
  }
  
  create(user: User) {
    return this.http.post(USER_URL, user);
  }

  update(id : number, user : User) {
    return this.http.put(USER_URL + id, user);
  }

  delete(id: number) {
    return this.http.delete(USER_URL + id);
  }

  checkEmail(mail: string, id : string) {
    return this.http.get(USER_URL + "checkEmail/" + id + "/" + mail);
  }

  checkUsername(username: string, id : string) {
    return this.http.get(USER_URL + "checkUsername/" + id + "/" + username);
  }

}
