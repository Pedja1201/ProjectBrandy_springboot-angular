import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Order, OrderPage } from '../../model/order';
import { LoginService } from '../auth/login.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private baseUrl = environment.baseUrl //Dobavljanje url adrese da ne kucamo rucno

  constructor(private client : HttpClient,  private loginService : LoginService) { }
  
  
  getAll(){
    return this.client.get<OrderPage<Order>>(`${this.baseUrl}/orders`)
  }

  getOne(id : number){
    return this.client.get<Order[]>(`${this.baseUrl}/orders/${id}`)
  }

  create(order : Order){
    return this.client.post(`${this.baseUrl}/orders`, order)
  }

  update(id:number, order : Order){
    return this.client.put<Order[]>(`${this.baseUrl}/orders/${id}`, order)
  }

  delete(id:number){
    return this.client.delete<Order[]>(`${this.baseUrl}/orders/${id}`)
  }
}
