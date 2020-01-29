import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../entities/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() product :Product;

  image :string;
  
  constructor() { }

  ngOnInit() {
    if(!this.product.image.includes('http')){
        this.image = 'assets/products_images/'+this.product.image;
    } else{
      this.image = this.product.image;
    }
  }

}
