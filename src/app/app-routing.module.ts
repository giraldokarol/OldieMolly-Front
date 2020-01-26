import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { ProfilComponent } from './profil/profil.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  {
    path : '',
    component : HomeComponent
  },
  {
    path: 'authorization/:id',
    component : AuthentificationComponent
  },
  {
    path: 'profile/:id',
    component : ProfilComponent,
  },
  {
    path : 'product/:id',
    component : ProductComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
