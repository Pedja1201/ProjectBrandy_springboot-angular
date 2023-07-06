import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from 'src/app/model/order';

const ORDER_URL = 'http://localhost:8080/api/orders';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  create(order: Order) {
    return this.http.post(ORDER_URL, order);
  }

  getOrderByUserId(id : number) {
    return this.http.get<Order>(ORDER_URL + "/" + id + "/orders");
  }

  getOne(id : number) {
    return this.http.get<Order>(ORDER_URL + "/" + id + "/getOne");
  }

  update(id : number, order : Order) {
    return this.http.put(ORDER_URL + "/" + id, order + "/update");
  }
}
