import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../services/user.service';
import { User } from '../entities/user.model';
import { Order } from '../entities/order.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  orders:Order[];
  us :User;

  //Variables
  notFound:string='';
  constructor(private cookie : CookieService, private user: UserService) { }

  ngOnInit() {
   let tmpEmail = this.cookie.get('email');
   this.user.getUserByEmail(tmpEmail).subscribe(us=>{
     this.us=us;
   });

   this.user.getOrderUser(tmpEmail).subscribe( orders=>{
     this.orders=orders;
    },
    (err: HttpErrorResponse) => {
      if(err.status==404){
        this.notFound='not';
      }
    });
  }

}
