import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { OrderService } from '../services/order.service';
import { Order } from '../entities/order.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-shopping-bag',
  templateUrl: './shopping-bag.component.html',
  styleUrls: ['./shopping-bag.component.scss']
})
export class ShoppingBagComponent implements OnInit {

  orders :Order[];
  notFound:string='';
  constructor(private cookie: CookieService, private order : OrderService) { }

  ngOnInit() {
    let tmpEmail=this.cookie.get('email');
    this.order.readBuyer(tmpEmail).subscribe(orders =>{
      this.orders=orders;
    },
    (err:HttpErrorResponse)=>{
      if(err.status==404){
        this.notFound='not';
      }
    });
  }

}
