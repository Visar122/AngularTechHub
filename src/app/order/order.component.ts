import { Component } from '@angular/core';
import { Cart } from '@app/Interfaces';
import { CartService } from '@app/services/cart.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  cartitems: undefined| Cart[] = []; // Ensure cartItems is an array
  constructor(private cartService: CartService){}

  ngOnInit(): void {
    // Retrieve user ID from local storage
    const userId = localStorage.getItem('user');
    let theuserId = userId ? JSON.parse(userId).userId : null;
    if (theuserId) {
      this.cartService.getcartbyId(theuserId).subscribe(cartItems => {
        this.cartitems = cartItems; // Assign array of Cart objects
      });
    }
  }
}
