import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order, OrderPage } from 'src/app/model/order';
import { Total } from 'src/app/model/total';

const ORDER_URL = 'http://localhost:8080/api/orders';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getAll(pageNumber?:number, pageSize?:number){
    let params = new HttpParams();

    if (pageNumber !== undefined) {
      params = params.set('pageNumber', pageNumber.toString());
    }
  
    if (pageSize !== undefined) {
      params = params.set('pageSize', pageSize.toString());
    }

    return this.http.get<OrderPage<Order>>(ORDER_URL, { params })
  }

  create(order: Order) {
    return this.http.post(ORDER_URL, order);
  }

  getOrderByUserId(id: number, pageNumber?: number, pageSize?: number) {
    let params = new HttpParams();
  
    if (id !== undefined) {
      params = params.set('id', id.toString());
    }

    if (pageNumber !== undefined) {
      params = params.set('pageNumber', pageNumber.toString());
    }
  
    if (pageSize !== undefined) {
      params = params.set('pageSize', pageSize.toString());
    }

    return this.http.get<OrderPage<Order>>(ORDER_URL + "/ordersOfUser", { params });
  }

  getOrderByBrandyId(id: number): Observable<Order[]> {
    return this.http.get<Order[]>(ORDER_URL + "/" + id + "/orders/brandyId");
  }

  getTotalPriceByUserId(id: number) {
    return this.http.get<Total>(ORDER_URL + "/" + id + "/AllpricesByUserId");
  }

  getOne(id : number) {
    return this.http.get<Order>(ORDER_URL + "/" + id + "/getOne");
  }

  update(id : number, order : Order) {
    return this.http.put(ORDER_URL + "/" + id, order);
  }

  delete(id: number) {
    return this.http.delete(ORDER_URL + "/" + id);
  }
}
