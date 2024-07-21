import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { WishList } from '@app/Interfaces';
import { CartService } from '@app/services/cart.service';
import { WishlistService } from '@app/services/wishlist.service';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent {
  cartItem: WishList[] = [];

  constructor(private wishlistService: WishlistService, private cartService: CartService, private router: Router) {}

  ngOnInit() {
    // Retrieve wishlist data from local storage
    const wishlistData = localStorage.getItem('wishlist');

    if (wishlistData) {
      this.cartItem = JSON.parse(wishlistData);
    }
  }

  addToCart(item: WishList) {
    // Retrieve cart items from local storage
    const cartData = localStorage.getItem('cart');
    let cartItems: WishList[] = [];
    if (cartData) {
      cartItems = JSON.parse(cartData);
    }
   // Call DeleteWishlist method and wait for it to complete
  this.wishlistService.DeleteWishlist(item.cartItemId).subscribe(() => {

    
    
    cartItems.push(...this.cartItem);

    // Update local storage with modified cart items
    localStorage.setItem('cart', JSON.stringify(cartItems));

    // Clear wishlist items
    localStorage.removeItem('wishlist');

    // Navigate to cart page
    this.router.navigate(['/cart-page']);
 
  });
  }

  removeItem(item: WishList) {
    const index = this.cartItem.indexOf(item);
    if (index !== -1) {
    
 
        
    
      this.cartItem.splice(index, 1);
      localStorage.setItem('wishlist', JSON.stringify(this.cartItem));
    }
  }
}
