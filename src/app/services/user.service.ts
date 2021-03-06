import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../entities/user.model';
import { Observable} from 'rxjs';
import { Product } from '../entities/product.model';
import { Order } from '../entities/order.model';

@Injectable({
  providedIn: 'root'
})
export class UserService  {
  proxyurl = "https://cors-anywhere.herokuapp.com/";
  baseUrl:string="https://oldie-molly.herokuapp.com/user";

  constructor(private http: HttpClient) { }

  createUser(user: User):Observable<User>{
      return this.http.post<User>(this.proxyurl + this.baseUrl+'/create_user.php', user);
  }

  loginUser(user: User):Observable<User>{
    return this.http.post<User>(this.proxyurl+this.baseUrl+'/login.php', user); 
  }

  getAllUsers():Observable<User[]>{
    return this.http.get<User[]>(this.proxyurl+this.baseUrl+'/read_all.php');
  }

  getUserByEmail(email:string):Observable<User>{
    return this.http.get<User>(this.proxyurl+this.baseUrl+'/read_user.php?email='+email);
  }

  getProductUser(id: number):Observable<Product[]>{
    return this.http.get<Product[]>(this.proxyurl+this.baseUrl+'/read_one.php?idUser='+id);
  }

  getOrderUser(email: string):Observable<Order[]>{
    return this.http.get<Order[]>(this.proxyurl + this.baseUrl + '/read_order.php?email='+email);
  }

}
