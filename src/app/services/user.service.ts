import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../entities/user.model';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  proxyurl = "https://cors-anywhere.herokuapp.com/";
  baseUrl:string="https://oldie-molly.herokuapp.com/user";

  constructor(private http: HttpClient) { }

  createUser(user: User):Observable<User>{
      return this.http.post<User>(this.proxyurl + this.baseUrl+'/create_user.php', user);
  }

  loginUser(user: User):Observable<User>{
    return this.http.post<User>(this.proxyurl+this.baseUrl+'/login.php', user); 
  }



}
