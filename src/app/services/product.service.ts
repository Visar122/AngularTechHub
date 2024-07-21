import { EventEmitter, Injectable } from '@angular/core';
import { Cart, Product } from '../Interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
   cartData= new EventEmitter<Product[]>;
  constructor(private http:HttpClient) { }          

  addProduct(data:Product){  //Product is the interface , This adds products to the list
    return this.http.post('https://localhost:7197/api/Products ',data);
  }

  productList(){ //this just shows the list of products
    return this.http.get<Product[]>('https://localhost:7197/api/Products');// product in productlist is a type array and the product interface is an object so now i need to define it
  }


  deleteProduct(id:number){
    return this.http.delete(`https://localhost:7197/api/Products/${id}`);
  }

  PopularProducts(){
    return this.http.get<Product[]>('https://localhost:7197/api/Products/PopularProducts');  //    return this.http.get<Product[]>('https://localhost:7197/api/Products/PopularProducts?_limit=4');
   }

   
   Trendyproducts(){
    return this.http.get<Product[]>('https://localhost:7197/api/Products/TrendyProducts');
   }

  getProductbyId(id:string){
    return this.http.get<Product>(`https://localhost:7197/api/Products/${id}`);

    
  }

 updateProduct(product:Product){
     return this.http.put<Product>(`https://localhost:7197/api/Products/${product.id}`,product); //id we update a https we need to use put
 }

 Searchproduct(query:string){
  return this.http.get<Product[]>(`https://localhost:7197/api/Products/SearchProduct?query=${query}`);
 }

}