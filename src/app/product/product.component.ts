import { Component, OnInit, Input } from '@angular/core';
import { ServiceProductService } from '../services/service-product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../entities/product.model';
import { ServiceGetCategoryService } from '../services/service-get-category.service';
import { Category } from '../entities/category.model';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  
  param:string;
  nameCategory:string;
  nameProfile:string;

  pro: Product;
  category :Category[];

  constructor(private product : ServiceProductService, private route : ActivatedRoute,
              private categories : ServiceGetCategoryService, private cookie : CookieService,
              private router: Router) {
              this.param=route.snapshot.params['id'];
   }

  ngOnInit() {
    //Get Details Product
    let id = parseInt(this.param, 10); // Convert param id String to Number
    this.product.getProduct(id).subscribe(pro =>{
      this.pro=pro;
    });

    //Get Category Name
    this.categories.getAllCategories().subscribe( category => {
      this.category=category;
    }); 
    
    //Get cookie name
    this.nameProfile=this.cookie.get('name');

}

clickBack(){
  this.router.navigate(['/profile/'+this.nameProfile]);
}

}  
