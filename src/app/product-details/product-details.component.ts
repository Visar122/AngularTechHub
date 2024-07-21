import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product, WishList } from '../Interfaces';
import { Cart } from '../Interfaces';
import { CartService } from '@app/services/cart.service';
import { WishlistService } from '@app/services/wishlist.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {


   productData:undefined|Product;
   relatableItems: Product[]=[] ;
   productQuantity:number=1;

   cartData: Cart | undefined;
   wishList:WishList|undefined;
  constructor(private activeRoute:ActivatedRoute ,private product:ProductService,private route:Router,private cart:CartService,private wishlist:WishlistService) {}

  ngOnInit(): void {
    
 // Get the id from the route parameters
 let productId=this.activeRoute.snapshot.paramMap.get('ProductId');
 console.log('ProductId:', productId);

 // Use the correct parameter name 'id' in the following code
 productId && this.product.getProductbyId(productId).subscribe((data) => {
   this.productData = data;
  

    })
   
  


}

   
    
  
  


  handleQuantity(val:string){


    if(this.productQuantity<10 && val==='plus'){
      this.productQuantity+=1; //increasing it by 1

    }else if(this.productQuantity >1 && val==='min'){
      this.productQuantity-=1
    }

  }



  addToCard() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity;
  
      if (localStorage.getItem('user')) {
        console.warn("User is logged in");
  
        let user = localStorage.getItem('user');
        let theuserId = user ? JSON.parse(user).userId : null;
        console.warn(theuserId);
  
        let cartData: Cart[] = JSON.parse(localStorage.getItem('cart') || '[]');
  
       
      
        
          
          this.cartData = {
            cartItemId: this.productData.id,
            productName: this.productData.productName,
            price: this.productData.price * this.productData.quantity, // Multiply the price by the quantity
            category: this.productData.category,
            color: this.productData.color,
            description: this.productData.description,
            image: this.productData.image,
            userId: theuserId,
            quantity: this.productData.quantity
          };
          cartData.push(this.cartData);
      
  
        // Update the local storage with the modified cart data
        localStorage.setItem('cart', JSON.stringify(cartData));
  
  
        this.route.navigateByUrl(this.route.url);
      }
    }
  }
  
 
addtoWishlist(){

  if(this.productData){ 
   //i get the quantity too

  if(localStorage.getItem('user')) {
    console.warn("User is logged in");
  
    let user = localStorage.getItem('user');
    let theuserId = user ? JSON.parse(user).userId : null;
    console.warn(theuserId);
  
    this.wishList = {
      cartItemId:this.productData.id,
      productName:this.productData.productName,
      price:this.productData.price,
      category:this.productData.category,
      color: this.productData.color,
      description: this.productData.description,
      image: this.productData.image,
      userId: theuserId,
      quantity: 1,
    };

  
    console.warn(this.wishList);
    
  
    this.wishlist.addToWishlist(this.wishList).subscribe((result)=>{});

  
        // Perform actions based on the result
    
        if(localStorage.getItem('wishlist')){ 
          let wishlist: WishList[] = JSON.parse(localStorage.getItem('wishlist') || '[]');

        // Check if the product is already in the cart
      const existingProduct = wishlist.find(item => item.cartItemId === this.productData?.id);

      if (!existingProduct ) {
      
   
   
  
          // Update local storage
          localStorage.setItem('wishlist', JSON.stringify(wishlist));

          this.route.navigate(['WishList']); // Correct navigation method
  }
  
}
   
 


  }


  
  }
}
}