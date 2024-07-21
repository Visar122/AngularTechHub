import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../Interfaces';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {

  addProductMessage:string | undefined;

  constructor(private product:ProductService){

  }
  ngOnInit(){}

  submit(data:Product){   //Product is the interface 
 
     this.product.addProduct(data).subscribe((result)=>{
      console.warn(result);
      
      if(result){
        this.addProductMessage="Product Added sucessfully";
      }  
    }); 
      setTimeout(()=>{
        this.addProductMessage=undefined;
      },3000)
   
  }
}
