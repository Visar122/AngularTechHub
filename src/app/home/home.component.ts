import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import {  Product, WishList } from '../Interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { WishlistService } from '@app/services/wishlist.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
     popularProducts:undefined|Product[];
     trendyProducts:undefined|Product[];

     productData:undefined|Product;


     
     
  constructor(private product:ProductService,private activeRoute:ActivatedRoute,private wishlist:WishlistService,private route:Router){}

  ngOnInit(){
 
    
    this.product.PopularProducts().subscribe((products)=>{
      this.popularProducts=products; //this.popularProducts = products;: This line assigns the received products to the popularProducts property.
 

    

  
    });
    this.product.Trendyproducts().subscribe((trendyproduct)=>{

      this.trendyProducts=trendyproduct;
    })
  }
 
  
  }

    
  