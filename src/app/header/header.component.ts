import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product }from '../Interfaces';
import { CartService } from '@app/services/cart.service';
import { WishlistService } from '@app/services/wishlist.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('myVariable') myVariableInput: ElementRef | undefined;

  title = 'Ecom-project';
  menuType = 'Default';
  sellerName = '';
  UserName='';
  searchResult: undefined | Product[];
  Search=false;
  cartItems=0;
  wishlistItem=0;
  


  constructor(private route: Router, private product: ProductService,private cart:CartService,private wishlist:WishlistService) {}

  ngOnInit() {
    this.route.events.subscribe((value: any) => {
      console.warn(value);
      if (value.url){

        if (localStorage.getItem('seller') && value.url.includes('seller')) {
           console.warn('this is seller area');
         
           let sellerStore = localStorage.getItem('seller');
          let sellerData = sellerStore && JSON.parse(sellerStore);
       
          this.menuType = 'seller';
          this.sellerName = sellerData.name;
        }
      
        
        else if(localStorage.getItem('user')){
           let userStore=localStorage.getItem('user')
           let userData=userStore &&JSON.parse(userStore); // userStore && means if userstore is true
           this.UserName=userData.name;
          this.menuType='user';
        
        } 

        else {
          this.menuType = 'Default';
        }
    
      }



      let cartData=localStorage.getItem('cart'); //basically getting the item localCartFrom localStorage
      if(cartData){ //if cartData has somethingi n it is not undefined 
          
        this.cartItems=JSON.parse(cartData).length;  // now we put the items length in the cart
      }
      this.cart.thecartData.subscribe((result)=>{
                                                           //this is so i get 5 item or more
        this.cartItems=result.length
      })
    
    });

   
  
  

    
  }

  isHomeRoute() {
    return (
       this.route.url.includes('/home') || this.route.url.includes('/search') || this.route.url.includes('search/:query') || 
       this.route.url.includes('/seller-auth')|| this.route.url.includes('/user-login')||this.route.url.includes('/details')|| this.route.url.includes('/cart-page')|| this.route.url.includes('') || 
       this.route.url.includes('/#') || !this.isSellerRoute() // Exclude seller routes
    );
  } 

  
  isSellerRoute(){
    return(
      this.route.url.includes('/seller-add-product')||this.route.url.includes('/seller-home')
    );
  }


  
  isDetailRoute() {
    return (
       this.route.url.includes('/details') 
    );
  }

  focusSearchInput() {
    if (this.myVariableInput && this.myVariableInput.nativeElement) {
      this.myVariableInput.nativeElement.focus();
    }
  }

/*   clearSearchInput(myVariable: any) {
    return (myVariable.value = '');
  } */

  logoutSeller() {
    localStorage.removeItem('seller');
    this.route.navigate(['home']);
  }
  logoutUser(){
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    localStorage.removeItem('wishlist');
    this.route.navigate(['home']);
  }

  Searchproduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      console.warn(element.value);

     

      this.product.Searchproduct(element.value).subscribe((result:any) => {
        this.searchResult = result;
        if (result.length > 5) {
          result.length = 5; // Limiting the number of displayed results to 5
        }
      
      });
    }
  }
  

  hideSearch() {
    this.searchResult = undefined;
  }

  submitSearch(value: string) {
    console.warn(value);
  // Get the current route URL
  
    
    this.route.navigate([`search/${value}`]);
  }
       
  SearchClick(){
    this.Search=true;
  }

  selectedProduct: Product | undefined;

  setSelectedProduct(product: Product) {
    this.selectedProduct = product;
    if (this.myVariableInput && this.myVariableInput.nativeElement) {
      this.myVariableInput.nativeElement.value = product.productName; // native element is what i type in browser to my search input
    }
  }

}