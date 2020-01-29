import { Component, OnInit, Input, ɵConsole, DoCheck } from '@angular/core';
import { ServiceProductService } from '../services/service-product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../entities/product.model';
import { ServiceGetCategoryService } from '../services/service-get-category.service';
import { Category } from '../entities/category.model';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../services/user.service';
import { User } from '../entities/user.model';
import { OrderService } from '../services/order.service';
import { Order } from '../entities/order.model';

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

  image1:string;
  image2:string;
  image3:string;

  pro: Product;
  category :Category;
  us: User;
  order:Order;

  constructor(private product : ServiceProductService, private route : ActivatedRoute,
              private cookie : CookieService, private router: Router, private user: UserService,
              private orders : OrderService) {
              this.param=route.snapshot.params['id'];
   }

  ngOnInit() {
    //Get Details Product
    console.log(this.param);
    this.id = parseInt(this.param, 10); // Convert param id String to Number
    this.product.getProduct(this.id).subscribe(pro =>{
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

        //Validation image
    if(!this.pro.image.includes('http') && !this.pro.image2.includes('http') && !this.pro.image3.includes('http')){
      this.image1 = '../../assets/products_images/'+this.pro.image;
      this.image2 ='../../assets/products_images/'+this.pro.image2;
      this.image3 ='../../assets/products_images/'+this.pro.image3;
    }else{
      this.image1 = this.pro.image;
      this.image2 = this.pro.image2;
      this.image3 = this.pro.image3;
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

createOrder(){
  this.order = {
    "totalPrice" : this.pro.price,
    "User_idUser" : this.pro.User_idUser,
    "Product_idProduct" : this.id,
    "buyer" : this.cookie.get('email'),
    "idCategory" : this.pro.Category_idCategory,
    "nameProd" : this.pro.prodName
  };
  this.orders.createOrder(this.order).subscribe().add(()=>{
    this.router.navigate(['/myshoppingbag']);
  });
}


}  
