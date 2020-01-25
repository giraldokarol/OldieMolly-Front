import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { AuthentificationComponent } from '../authentification/authentification.component';



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  
  constructor(private auth : AuthService, private router : Router){
    //console.log(this.r.activeRoute);
  }
  
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.auth.isLoggedIn()) {
      console.log("BIEN");
      return true;
    } else {
      this.router.navigate(['/']);
      console.log("MALO")
      return false;
    }
  }
}
