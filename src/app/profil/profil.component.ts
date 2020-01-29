import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../entities/category.model';
import { ServiceGetCategoryService } from '../services/service-get-category.service';
import { ServiceProductService } from '../services/service-product.service';
import { Product } from '../entities/product.model';
import { UserService } from '../services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../entities/user.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit, DoCheck{
 
  
  paramRoute:string;
  message:string='';

  notFound:string='';

  //Cookie
  cookieValue= 'UNKNOW';
  
  //Service Category and Model
  categories: Category[];
  nameCategory : string='';
  idCategory :number;
 
  //Service Product and Model
  products: Product[];
  u: User;

  constructor(private route : ActivatedRoute, private category : ServiceGetCategoryService,
                private product :ServiceProductService, private router : Router, 
                private user :UserService, private cookie: CookieService) { 

                this.paramRoute=route.snapshot.params['id'];
                //Get Actual Link
                this.message= this.router.url;

  }

  ngOnInit() {
    console.log(this.paramRoute);
    //Get all Categories
    this.category.getAllCategories().subscribe(categories =>{
      this.categories = categories;
      
    });

    //Get All Products
    this.product.getAllProducts().subscribe( products =>{
      this.products = products;
    });
    
    //Cokie get value.
    this.cookieValue = this.cookie.get('email');

    //Get id user By email logged.
    this.user.getUserByEmail(this.cookieValue).subscribe( u =>{
      this.u=u;
    });
    
    
  }

  ngDoCheck(){
    //Get Actual Link
  }



  clickCategory(cat: string){
    this.nameCategory=cat;
    if(cat == this.categories[0].nameCategory){
        this.idCategory = this.categories[0].idCategory;
        //this.router.navigate([this.message+'/'+this.categories[0].nameCategory]);
    } else if(cat == this.categories[1].nameCategory){
        this.idCategory = this.categories[1].idCategory;
        //this.router.navigate([this.message+'/'+this.categories[1].nameCategory]);
    } else if(cat== this.categories[2].nameCategory){
        this.idCategory = this.categories[2].idCategory;
        //this.router.navigate([this.message+'/'+this.categories[2].nameCategory]);
    } else if(cat== this.categories[3].nameCategory){
        this.idCategory = this.categories[3].idCategory;
        //this.router.navigate([this.message+'/'+this.categories[3].nameCategory]);
    }
   this.showProductsCategory(this.idCategory);
   console.log(this.idCategory);
  }

  showProductsCategory(id: number){
    this.category.getProductCategory(id).subscribe(products =>{
      this.products = products;
    });
  }
  
  //Show Products By User ID.
  clickMyProd(){
    this.nameCategory='My Products';
    console.log(this.u.idUser);
    this.showProductsUser(this.u.idUser);
  }

  showProductsUser(id: number){
    this.user.getProductUser(id).subscribe( products => {
      this.products=products;
    },
    (err:HttpErrorResponse)=>{
      if(err.status===404){
        this.notFound='Not';
      }
    });
  }

  //Link for show Details Product - Product component
  details(index){
    this.router.navigate(['/product/'+this.products[index].idProduct]);
  }

  //Link for create new Product - createProduct Component
  create(){
    this.router.navigate(['/createproduct']);
  }



}
