import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { ProfilComponent } from './profil/profil.component';

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
    component : ProfilComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
