import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { ProfilComponent } from './profil/profil.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductCardComponent } from './product-card/product-card.component';
import { CookieService } from 'ngx-cookie-service';
import { ProductComponent } from './product/product.component';
import { OrderComponent } from './order/order.component';
import { OrderCardComponent } from './order-card/order-card.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthentificationComponent,
    ProfilComponent,
    ProductCardComponent,
    ProductComponent,
    OrderComponent,
    OrderCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
    
  ],
  providers: [ 
    CookieService
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
