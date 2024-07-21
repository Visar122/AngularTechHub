import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { BackgroundDirective } from './Directive/background.directive';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ToastrModule } from 'ngx-toastr';
import { CartPageComponent } from './cart-page/cart-page.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { OrderComponent } from './order/order.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SellerAuthComponent,
    SellerHomeComponent,
    AddproductComponent,
    UpdateProductComponent,
    SearchComponent,
    ProductDetailsComponent,
    BackgroundDirective,
    UserAuthComponent,
    CartPageComponent,
    WishListComponent,
   PaymentDetailsComponent,
    OrderComponent,

  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    CommonModule,    /* slick carousel */
    SlickCarouselModule,
    ToastrModule.forRoot(), // ToastrModule added
    
  ],
  providers: [
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
