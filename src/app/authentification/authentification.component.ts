import { Component, OnInit, Input } from '@angular/core';
import { AppComponent } from '../app.component';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.scss']
})
export class AuthentificationComponent implements OnInit {

  param:string;
  finalParam:string;
  
  constructor(private route : ActivatedRoute) { 
  
    }


  ngOnInit() {
    this.param=this.route.snapshot.params['id'];
    console.log(this.param);
  }


}
