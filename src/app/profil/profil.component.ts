import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../entities/category.model';
import { ServiceGetCategoryService } from '../services/service-get-category.service';
import { ServiceProductService } from '../services/service-product.service';
import { Product } from '../entities/product.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit{
  
  paramRoute:string;
  message:string='';
  
  //Service Category and Model
  categories: Category[];
  nameCategory : string='';
  idCategory :number;
 
  //Service Product and Model
  products: Product[];

  constructor(private route : ActivatedRoute, private category : ServiceGetCategoryService,
                private product :ServiceProductService, private router : Router, 
                private user :UserService) { 

                this.paramRoute=route.snapshot.params['id'];
                this.message= this.router.url;

  }

  ngOnInit() {
    //Get all Categories
    this.category.getAllCategories().subscribe(categories =>{
      this.categories = categories;
      
    });

    //Get All Products
    this.product.getAllProducts().subscribe( products =>{
      this.products = products;
    });  
  }


  clickCategory(cat: string){
    this.nameCategory=cat;
    if(cat == this.categories[0].nameCategory){
        this.idCategory = this.categories[0].idCategory;
        console.log(this.message);
        this.router.navigate([this.message+'/'+this.categories[0].nameCategory]);
    } else if(cat == this.categories[1].nameCategory){
        this.idCategory = this.categories[1].idCategory;
        this.router.navigate([this.message+'/'+this.categories[1].nameCategory]);
    } else if(cat== this.categories[2].nameCategory){
        this.idCategory = this.categories[2].idCategory;
        this.router.navigate([this.message+'/'+this.categories[2].nameCategory]);
    } else if(cat== this.categories[3].nameCategory){
        this.idCategory = this.categories[3].idCategory;
        this.router.navigate([this.message+'/'+this.categories[3].nameCategory]);
    }
   this.showProductsCategory(this.idCategory);
   console.log(this.idCategory);
  }

  showProductsCategory(id: number){
    this.category.getProductCategory(id).subscribe(products =>{
      this.products = products;
    });
  }

  showProductsUser(id: number){
    this.user.getProductUser(id).subscribe( products => {
      this.products=products;
      console.log(products);
    });
  }



}
