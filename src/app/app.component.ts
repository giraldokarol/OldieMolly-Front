import { Component, OnInit, Input, Output, DoCheck } from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, DoCheck {
  title = 'OldieMolly';
  
  username:string='';
  message:string='';
  
  constructor(private router : Router, private location : Location){
    //console.log("HOLA MUNDO");
    if(this.router.url.includes('profile/')){
      this.message='login';
    }
  }

  ngOnInit() {}

  ngDoCheck() {
    //console.log("HOLA MUNDO");   
    this.router.events.subscribe(val => {
        this.username=this.location.path().toString(); 
        let tmp= this.username.split('/');
        this.username=tmp[2];
        if(this.location.path().includes('profile')){
          this.message="login";
        }else{
          this.message='';
        }
    });

  }
  


}
