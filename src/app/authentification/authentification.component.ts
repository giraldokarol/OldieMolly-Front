import { Component, OnInit, DoCheck, Input } from '@angular/core';
import { AppComponent } from '../app.component';
import { ActivatedRoute, Router, CanActivate } from '@angular/router';
import { User } from '../entities/user.model';
import { UserService } from '../services/user.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';





@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.scss']
})
export class AuthentificationComponent implements OnInit, DoCheck {

  param:string;
  
  //Variables Form Sign
  name:string;
  incomplete:boolean=false;
  noLogged:boolean=false;
  message:string;
  

  //Form Validator
  registerForm : FormGroup; //SignUp
  loginForm : FormGroup; //Login

  //Object User
  user: User;
  users:User[];

  //UserName display 
  nickname:string='';

  
  constructor(private router : Router, private route : ActivatedRoute, private u : UserService,
                private formBuilder :FormBuilder, private cookie: CookieService) { 
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

    //Login Form
    this.loginForm = this.formBuilder.group({
      email : ['', [Validators.required, Validators.email]],
      password : ['', [Validators.required, Validators.minLength(5)]]
    });

    //Get all users for know if email exists.
    this.u.getAllUsers().subscribe(users =>{
      this.users = users;
    });

  }

  ngDoCheck() {
    this.param=this.route.snapshot.params['id'];
  } 

 
  validateEmailExist(){
    for(let i = 0; i<this.users.length; i++){
        if(this.users[i].email!==this.registerForm.value.email){
          return false;
        }
    }
    return true;
  }
 
  createUser(){
    if(this.registerForm.touched && this.registerForm.value.name!==''&& this.registerForm.value.lastname!==''
                  && this.registerForm.value.email!=='' && this.registerForm.value.password!=='' &&
                  this.registerForm.value.address!=='' && this.validateEmailExist()){
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
    }else if(!this.validateEmailExist()){
      this.incomplete=true;
      this.message ="Email alredy exists."
    }else{
      this.incomplete=true;
       this.message="You have to fill in all the fields."     
    }
  }


  login(){
    if(this.loginForm.controls['email'].value!=='' && this.loginForm.controls['password'].value!==''){
        if(this.loginForm.valid){
          this.user = {
            "email" : this.loginForm.controls['email'].value,
            "password" : this.loginForm.controls['password'].value
          };
          this.getUserName(this.loginForm.controls['email'].value);
          this.u.loginUser(this.user).subscribe(
            data =>{
              if(data.jwt!=='' && data.message.includes('Succefull')){
                this.noLogged=true;
                this.message = data.message +"We are just verifying.";
                this.router.navigate(['/profile/'+ this.nickname]);
                //Create cookies
                this.cookie.set("email", this.loginForm.controls['email'].value);
              } 
            },
            (err:HttpErrorResponse) => {
              if(err.status===401){
                this.noLogged=true;
                this.message = 'This account does not exist.' + err.error.message;
                console.log(err.error.message);
              }              
            }
          );
        }else if(!this.loginForm.controls['email'].valid){
          this.noLogged=true;
          this.message='Verify your email.'
        }
    } else{
      this.noLogged=true;
      this.message = 'Incompleted Information';
    }
  }

  getUserName(email:string){
    this.u.getUserByEmail(email).subscribe( userName => {
      this.user = userName;
      this.nickname = userName.userName;
    });
  }




}
