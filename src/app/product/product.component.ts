import { Component, OnInit, Input } from '@angular/core';
import { ServiceProductService } from '../services/service-product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../entities/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  
  param:string;

  pro: Product;

  constructor(private product : ServiceProductService, private route : ActivatedRoute) {
    this.param=route.snapshot.params['id'];
   }

  ngOnInit() {
    //Get Details Product
    let id = parseInt(this.param, 10); // Convert param id String to Number
    this.product.getProduct(id).subscribe(pro =>{
      this.pro=pro;
    });
  }

}
