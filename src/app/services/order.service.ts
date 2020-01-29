import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../entities/order.model';
import { catchError } from 'rxjs/operators';


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

  readBuyer(email:string) :Observable<Order[]>{
    return this.http.get<Order[]>(this.proxyurl+this.baseUrl+'/read_buyer.php?buyer='+email);
  }

  deleteOrder(order : Order): Observable<Order>{
    return this.http.post<Order>(this.proxyurl+this.baseUrl+'/delete.php', order);
  }
  
}
