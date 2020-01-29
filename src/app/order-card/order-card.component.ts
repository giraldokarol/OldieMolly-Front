import { Component, OnInit, Input } from '@angular/core';
import { Order } from '../entities/order.model';
import { CookieService } from 'ngx-cookie-service';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent implements OnInit {

  @Input() order : Order;
  delete: Order;
  
  category:string='';
  showbutton:string='';
  constructor(private cookie: CookieService, private o : OrderService, private router : Router) { }

  ngOnInit() {
    if(this.order.idCategory==1){
      this.category='Others';
    } else if(this.order.idCategory==2){
      this.category='Clothes';
    }else if(this.order.idCategory==3){
      this.category='Bedding';
    }else{
      this.category='Mobility';
    }
      console.log(this.order.nameProd);
      //console.log(this.cookie.get('email'));
    if(this.order.buyer===this.cookie.get('email')){
      this.showbutton='show';
      console.log("hola!")
    }
  }

  clickDeleteSale(id){
    this.delete={
      "idOrder" : id
    };
    console.log(id);
    this.o.deleteOrder(this.delete).subscribe((data) => {
      console.log("success");
      window.location.reload();
    });
  }

  buy(){
    this.router.navigate(['/buy'])
  }

}
