import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from '@app/Interfaces';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  thecartData= new EventEmitter<Cart[]>;
  constructor(private http: HttpClient) {}

  addToCart(cartData: Cart): Observable<Cart> {
   
 

    return this.http.post<Cart>('https://localhost:7197/api/CartItems',cartData)
      .pipe(
        catchError(error => {
          console.error('Error adding to cart:', error);
          return throwError(error);
        })

       
        
      );
      
        
    }
    getcartbyId(id:string){
      return this.http.get<Cart[]>(`https://localhost:7197/api/CartItems/${id}`);
  
      
    }



  
    
    
  
}
