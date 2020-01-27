import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { ProfilComponent } from './profil/profil.component';
import { ProductComponent } from './product/product.component';
import { OrderComponent } from './order/order.component';
import { ShoppingBagComponent } from './shopping-bag/shopping-bag.component';

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
    path: 'myorders',
    component : OrderComponent
  },
  {
    path: 'myshoppingbag',
    component: ShoppingBagComponent
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
