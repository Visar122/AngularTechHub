import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Cart, PaymentDetail } from '@app/Interfaces';
import { CartService } from '@app/services/cart.service';
import { PaymentDetailService } from '@app/services/payment-detail.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent{
  addProductMessage: string | undefined;

  cartItems: Cart[] = []; // Corrected to be an array

  


  constructor(
    public service: PaymentDetailService,
    private route: Router,
    private cart: CartService
  ) {}

  

  // reduce method reduces the array to a single value.


removeItem() {
  // Optionally, you can remove an item from cartItems here
  const cartData = localStorage.getItem('cart');

  if (cartData) {
    const cartItems: Cart[] = JSON.parse(cartData);

    // Update the local storage with the modified cart data
    localStorage.setItem('cart', JSON.stringify(cartItems));

    // Optionally, you can also update the cart on the backend by calling addToCart
    for (const item of cartItems) {
      this.cart.addToCart(item).subscribe(
        (result) => {
        
          this.route.navigate(['/Order']);
          localStorage.removeItem('cart');
     
        },
        (error) => {
          console.error('Error adding to cart:', error);
        }
      );
    }
  }
}


  submit(data: PaymentDetail) {
  

    // Post the payment detail to the server
    this.service.PostPaymentDetail(data).subscribe((result) => {});
  }
}
