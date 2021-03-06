import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { ProfilComponent } from './profil/profil.component';
import { ProductComponent } from './product/product.component';
import { OrderComponent } from './order/order.component';
import { ShoppingBagComponent } from './shopping-bag/shopping-bag.component';
import { BuyComponent } from './buy/buy.component';
import { CreateProductComponent } from './create-product/create-product.component';

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
    path: 'mysales',
    component : OrderComponent
  },
  {
    path: 'myshoppingbag',
    component: ShoppingBagComponent
  },
  {
    path: 'buy',
    component: BuyComponent
  },
  {
    path : 'createproduct',
    component: CreateProductComponent
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
