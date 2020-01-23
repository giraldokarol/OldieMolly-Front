import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../entities/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl:string="https://oldie-molly.herokuapp.com/user";

  constructor(private http: HttpClient) { }

  createUser(user: User):Observable<User>{
      return this.http.post<User>(this.baseUrl+'/create_user.php', user);
  }
}
