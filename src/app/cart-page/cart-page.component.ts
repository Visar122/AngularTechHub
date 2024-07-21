import { Component, Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn:'root'
})


@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']  // Corrected property name
})
export class CartPageComponent implements OnInit  {

  cartItem:any[]=[];
  // Variable to store the total price of all items in the cart
  total: number = 0;

  ngOnInit() {
  // Retrieve cart data from local storage
    const cartData=localStorage.getItem('cart');

if (cartData) {
    let parsedCartData = JSON.parse(cartData);
    // Check if parsedCartData is an array
    if (Array.isArray(parsedCartData)) {
      this.cartItem = parsedCartData;
    } else {
      // If not an array, initialize cartItem as an array and push the parsed data
      this.cartItem = [parsedCartData];
    }
    this.calculateTotal();
  }
  }
  //reduce method  reduces the array to a single value.
  calculateTotal() {
    this.total = this.cartItem.reduce((sum, item) => sum + item.price, 0); //each element in the array   adds the item.price to the running total (sum). 
  }

  removeItem(index: number) {
    this.cartItem.splice(index, 1);//splice removes the item form the cart and it removes 1 
    localStorage.setItem('cart', JSON.stringify(this.cartItem));
    this.calculateTotal(); // Recalculate total after removing the item
    window.location.reload();
  }
}


