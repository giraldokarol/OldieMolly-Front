import { Component, OnInit, DoCheck, Input } from '@angular/core';
import { AppComponent } from '../app.component';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.scss']
})
export class AuthentificationComponent implements OnInit, DoCheck {

  param:string;
  finalParam:string;
  
  constructor(private route : ActivatedRoute) { 
    this.param=this.route.snapshot.params['id'];
    }

  ngOnInit() {
  }

  ngDoCheck() {
    this.param=this.route.snapshot.params['id'];
  } 


}
