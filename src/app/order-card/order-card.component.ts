import { Component, OnInit, Input } from '@angular/core';
import { Order } from '../entities/order.model';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent implements OnInit {

  @Input() order : Order;
  
  category:string='';
  showbutton:string='';
  constructor(private cookie: CookieService) { }

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

    if(this.order.buyer===this.cookie.get('email')){
      this.showbutton='show';
    }
  }

}
