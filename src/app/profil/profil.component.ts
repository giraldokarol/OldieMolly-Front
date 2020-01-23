import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  
  paramRoute:string;
  constructor(private route : ActivatedRoute) { 
    this.paramRoute=route.snapshot.params['id'];
  }

  ngOnInit() {
  }

}
