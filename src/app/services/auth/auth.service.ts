import { Injectable } from '@angular/core';
import { UserService } from '../user.service';
import { User } from 'src/app/entities/user.model';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user :User;
  constructor(private u : UserService) { }

  isLoggedIn(){
     return true;
  }
}
