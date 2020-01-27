import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../services/user.service';
import { User } from '../entities/user.model';
import { Order } from '../entities/order.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  orders:Order[];
  us :User;
  constructor(private cookie : CookieService, private user: UserService) { }

  ngOnInit() {
   let tmpEmail = this.cookie.get('email');
     
  }

}
