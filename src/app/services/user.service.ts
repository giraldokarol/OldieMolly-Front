import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../entities/user.model';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Product } from '../entities/product.model';

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

  getProductUser(id: number):Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl+'/read_one.php?idUser='+id);
  }




}
