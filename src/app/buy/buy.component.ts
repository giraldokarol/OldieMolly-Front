import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss']
})
export class BuyComponent implements OnInit {

  constructor(private router: Router, private cookie : CookieService) { }

  ngOnInit() {
  }

  goHome(){
    this.router.navigate(['/profile/'+this.cookie.get('name')]);
  }

}
