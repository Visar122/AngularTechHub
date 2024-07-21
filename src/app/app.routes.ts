import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { BackgroundDirective } from './Directive/background.directive';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { OrderComponent } from './order/order.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'seller-auth', component: SellerAuthComponent },
    { path: 'seller-home', component: SellerHomeComponent },
    { path: 'addproduct', component: AddproductComponent },
    { path: 'update-product/:id', component: UpdateProductComponent },
    { path: 'search', component: SearchComponent },
    { path: 'product-details/:id', component: ProductDetailsComponent },
    { path: 'background', component: BackgroundDirective },
    { path: 'user-auth', component: UserAuthComponent },
    { path: 'WishList', component: WishListComponent },
    { path: 'cart-page', component: CartPageComponent },
    {  path: 'PaymentDetail',   component: PaymentDetailsComponent},
    {  path: 'Order',   component: OrderComponent},
    { path: '', redirectTo: '/home', pathMatch: 'full' } // Redirect to home for empty path

];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
