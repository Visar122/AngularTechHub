import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { WishList } from '@app/Interfaces';
import { catchError, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  wishlist=new EventEmitter<WishList[]>;
  constructor(private http:HttpClient) { }


  addToWishlist(WishList: WishList){

    let Wishlist2: WishList[] = JSON.parse(localStorage.getItem('wishlist') ?? '[]');// Retrieve existing cart data from local storage or initialize an empty array

    if (!Wishlist2 || Wishlist2.length === 0) {// If there is no existing cart data or it's empty, initialize with the current cart item; 
      Wishlist2 = [WishList];
    } else {
      Wishlist2.push(WishList);          //otherwise, add the new item
    }
  
    localStorage.setItem('wishlist', JSON.stringify(Wishlist2));// Update the local storage with the modified cart data
    this.wishlist.emit(Wishlist2);

    return this.http.post<WishList>('https://localhost:7197/api/Wishlists',WishList)
      .pipe(
        catchError(error => {
          console.error('Error adding to cart:', error);
          return throwError(error);
        })

       
        
      );

  }

  
  DeleteWishlist(id:number){
    return this.http.delete(`https://localhost:7197/api/WishLists/${id}`);
  }

}
