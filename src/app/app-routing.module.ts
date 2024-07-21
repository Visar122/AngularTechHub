import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { AuthGuard } from './auth.guard';
import { AddproductComponent } from './addproduct/addproduct.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"home",component:HomeComponent},
  {path:"seller-auth",component:SellerAuthComponent},
  {path:'seller-home',canActivate:[AuthGuard],component:SellerHomeComponent,},
   {path:'seller-add-product',canActivate:[AuthGuard],component:AddproductComponent},//auth guard is so they can't just put the url link of the component and get acess to it without logging in
   {path:"update-product/:id",component:UpdateProductComponent},
   {path:"search/:query",component:SearchComponent}, //need to add this query so i can search stuff fx:  http://localhost:4200/search/mobile
   {path:"details/:ProductId",component:ProductDetailsComponent,children: [{ path: 'wishlist', component: WishListComponent } ]}, 
   {path:"user-login",component:UserAuthComponent },
   {path:'cart-page',component:CartPageComponent},
   { path: 'WishList', component: WishListComponent },
  {  path: 'PaymentDetail',   component: PaymentDetailsComponent},
  {  path: 'Order',   component: OrderComponent},
 
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

