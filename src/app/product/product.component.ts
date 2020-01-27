import { Component, OnInit, Input, ɵConsole, DoCheck } from '@angular/core';
import { ServiceProductService } from '../services/service-product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../entities/product.model';
import { ServiceGetCategoryService } from '../services/service-get-category.service';
import { Category } from '../entities/category.model';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../services/user.service';
import { User } from '../entities/user.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit{
  
  param:string;
  nameCategory:string;
  nameProfile:string;
  id:number;

  pro: Product;
  category :Category;
  us: User;

  constructor(private product : ServiceProductService, private route : ActivatedRoute,
              private categories : ServiceGetCategoryService, private cookie : CookieService,
              private router: Router, private user: UserService) {
              this.param=route.snapshot.params['id'];
   }

  ngOnInit() {
    //Get Details Product
    console.log(this.param);
    let id = parseInt(this.param, 10); // Convert param id String to Number
    this.product.getProduct(id).subscribe(pro =>{
      this.pro=pro;
      if(pro.Category_idCategory==1){
        this.nameCategory ='Others';
      }else if(pro.Category_idCategory==2){
        this.nameCategory='Clothes';
      }else if(pro.Category_idCategory==3){
        this.nameCategory='Bedding';
      }else{
        this.nameCategory='Mobility';
      }
    });
   
    let tmpEmail=this.cookie.get('email');
    this.nameProfile=this.cookie.get('name');

    //Get user by email
    this.user.getUserByEmail(tmpEmail).subscribe(us =>{
      this.us=us;
    });   

}

clickBack(){
  this.router.navigate(['/profile/'+this.nameProfile]);
}


}  
