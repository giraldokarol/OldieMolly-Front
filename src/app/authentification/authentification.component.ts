import { Component, OnInit, DoCheck, Input } from '@angular/core';
import { AppComponent } from '../app.component';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../entities/user.model';
import { UserService } from '../services/user.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';




@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.scss']
})
export class AuthentificationComponent implements OnInit, DoCheck {

  param:string;
  
  //Variables Form
  name:string;
  incomplete:boolean=false;
  message:string;

  //Form Validator
  registerForm : FormGroup;

  //Object User
  user: User;
  
  constructor(private router : Router, private route : ActivatedRoute, private u : UserService,
                private formBuilder :FormBuilder, private cookie: CookieService ) { 
    this.param=this.route.snapshot.params['id'];
    }

  ngOnInit() {
    //Register Form!
    this.registerForm = this.formBuilder.group({
          name : ['', Validators.required],
          lastname : ['', Validators.required],
          email : ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(5)]],
          address: ['', Validators.required]
    });
  }

  ngDoCheck() {
    this.param=this.route.snapshot.params['id'];
  } 

  

  createUser(){
    if(this.registerForm.touched && this.registerForm.value.name!==''&& this.registerForm.value.lastname!==''
                  && this.registerForm.value.email!=='' && this.registerForm.value.password!=='' &&
                  this.registerForm.value.address!==''){
              if(this.registerForm.valid){
                 this.user = {
                   "userName" : this.registerForm.value.name,
                   "userLastname":this.registerForm.value.lastname,
                   "email":this.registerForm.value.email,
                   "password":this.registerForm.value.password,
                  "address":this.registerForm.value.address
                 };
                console.log(this.user);
                this.name = this.registerForm.controls['name'].value;
                console.log(this.name);
                this.u.createUser(this.user).subscribe().add(() => {
                  this.router.navigate(['/profile/'+this.name]);
                  // Add a cookie Saving email and Name
                  this.cookie.set("email", this.registerForm.controls['email'].value);
                  this.cookie.set("name", this.registerForm.controls['name'].value);
                });
                this.incomplete=false;
                this.message = "Your account was created."
              } else if(this.registerForm.value.password.length < 5){
                  this.incomplete =true;
                  this.message = "Password must be at least 5 characters long"
              } else {
                this.incomplete=true;
                this.message="Your email is invalid";
                this.registerForm.value.email='';
              }
    }else{
      this.incomplete=true;
       this.message="You have to fill in all the fields."     
    }
  }


}
