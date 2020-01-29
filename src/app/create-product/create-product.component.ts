import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../services/user.service';
import { User } from '../entities/user.model';
import { ServiceProductService } from '../services/service-product.service';
import { Product } from '../entities/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})

export class CreateProductComponent implements OnInit {

  //Form
  createForm : FormGroup;
  errorMessage:string='';


  //User Class
  user :User;
  product: Product;
  idUser :number;
  categoryId : number;

  constructor(private formBuilder : FormBuilder, private cookie: CookieService, 
              private users: UserService, private products: ServiceProductService,
              private router: Router) { }

  ngOnInit() {
    //Create Product Form!
    this.createForm = this.formBuilder.group({
      name : ['', Validators.required],
      description : ['', Validators.required],
      price : ['', Validators.required],
      type : ['', Validators.required],
      category : ['', Validators.required],
      quantity : ['', Validators.required],
      image1: ['', Validators.required],
      image2: ['', Validators.required],
      image3: ['', Validators.required]
    });
    
    //Get cookie email
    let tmpEmail = this.cookie.get('email');
    //Get id By email.
    this.users.getUserByEmail(tmpEmail).subscribe(user =>{
      this.user=user;
      this.idUser = this.user.idUser;
      console.log(this.idUser);
    });
  }
  
  validateCategoryId(){
    if(this.createForm.value.category==='Clothes'){
      return this.categoryId=2;
    }else if(this.createForm.value.category==='Bedding'){
      return this.categoryId=3;
    } else if(this.createForm.value.category==='Others'){
      return this.categoryId=1;
    }else{
      return this.categoryId=4
    }
  } //Close Validate


  createProduct(){
    if(this.createForm.touched && this.createForm.value.name!=='' && this.createForm.value.description!=='' &&
        this.createForm.value.price!=='' && this.createForm.value.type!=='' && this.createForm.value.category!=='' &&
        this.createForm.value.category!=='--' && this.createForm.value.quantity!=='' && this.createForm.value.quantity!==0 &&
        this.createForm.value.image1!=='' && this.createForm.value.image2!=='' && this.createForm.value.image3!==''){

          if(this.createForm.valid){
            
            this.product = {
              "prodName" : this.createForm.value.name,
              "price" : this.createForm.value.price,
              "quantity" : this.createForm.value.quantity,
              "type" : this.createForm.value.type,
              "description" : this.createForm.value.description,
              "image" : this.createForm.value.image1,
              "image2" : this.createForm.value.image2,
              "image3" : this.createForm.value.image3,
              "Category_idCategory" : this.validateCategoryId(),
              "User_idUser" : this.user.idUser
            };
            console.log(this.product);
            this.products.createProduct(this.product).subscribe().add(()=>{
              alert("Your product was created");
              this.errorMessage = '';
              this.router.navigate(['profile/'+this.cookie.get('name')]);
            });
          } else if(this.createForm.value.name=='' || this.createForm.value.price==''|| this.createForm.value.quantity==''||
          this.createForm.value.type=='' || this.createForm.value.description=='' || this.createForm.value.image1==''||
          this.createForm.value.image2==''|| this.createForm.value.image3=='' || this.createForm.value.category==''){
            this.errorMessage="Your have to fill all the fields."
          } 
        }else{
          this.errorMessage="Fill all the fields."
          alert("You can't create a product");
        }
  } //Close Create

}
