import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../entities/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  proxyurl = "https://cors-anywhere.herokuapp.com/";
  baseUrl:string="https://oldie-molly.herokuapp.com/order";

  constructor(private http :HttpClient) { }

  createOrder(order: Order) :Observable<Order>{
    return this.http.post<Order>(this.proxyurl + this.baseUrl+'/create.php', order);
  }
  
}
