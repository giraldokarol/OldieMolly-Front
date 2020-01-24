import { Component, OnInit, DoCheck, Input } from '@angular/core';
import { AppComponent } from '../app.component';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../entities/user.model';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.scss']
})
export class AuthentificationComponent implements OnInit, DoCheck {

  param:string;
  
  //Variables Form
  id:number;
  name:string;
  lastname:string;
  email:string;
  password:string;
  address:string;

  //Object User
  user: User;
  
  constructor(private router : Router, private route : ActivatedRoute, private u : UserService ) { 
    this.param=this.route.snapshot.params['id'];
    }

  ngOnInit() {}

  ngDoCheck() {
    this.param=this.route.snapshot.params['id'];
  } 

  createUser(){
    if(this.name!=='' && this.name && this.lastname!=='' && this.lastname &&
            this.email!=='' && this.email && this.password!=='' && this.password &&
            this.address!=='' && this.address ){
              if(this.email.includes('@')){
                 this.user = {
                   "userName" : this.name,
                   "userLastname":this.lastname,
                   "email":this.email,
                   "password":this.password,
                  "address":this.address
                 };
                console.log(this.user);
                this.u.createUser(this.user).subscribe().add(() => {
                  this.router.navigate(['/profil/'+this.name]);
                });
              }
    }else{
      console.log("no se pudo");
    }
  }


}
