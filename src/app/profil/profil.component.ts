import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../entities/category.model';
import { ServiceGetCategoryService } from '../services/service-get-category.service';
import { ServiceProductService } from '../services/service-product.service';
import { Product } from '../entities/product.model';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  
  paramRoute:string;

  //Service Category and Model
  categories: Category[];
  firstCategory :string;
  secondCategory :string;
  thirdCategory :string;
  fourthCategory :string;

  //Service Product and Model
  products: Product[];

  constructor(private route : ActivatedRoute, private category : ServiceGetCategoryService,
                private product :ServiceProductService) { 
    this.paramRoute=route.snapshot.params['id'];
  }

  ngOnInit() {
    //Get all Categories
    this.category.getAllCategories().subscribe(categories =>{
      this.categories = categories;
      this.firstCategory= this.categories[0].nameCategory;
      this.secondCategory= this.categories[1].nameCategory;
      this.thirdCategory= this.categories[2].nameCategory;
      this.fourthCategory= this.categories[3].nameCategory;
    });

    //Get All Products
    this.product.getAllProducts().subscribe( products =>{
      this.products = products;
      console.log(this.products);
    });
    
  }

}
