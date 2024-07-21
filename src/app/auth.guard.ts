import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

import { SellerService } from "./services/seller.service";
@Injectable({
  providedIn:'root'
})

export class AuthGuard implements CanActivate {
  constructor(private sellerService:SellerService){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(localStorage.getItem('seller')){
      return true; // this is so if i just  type http://localhost:60141/seller-home  the user will get acess
    } 
    return this.sellerService.isSellerLoggedIn;  //so it will return the issellerloggedin it can be true or false
  }
}
