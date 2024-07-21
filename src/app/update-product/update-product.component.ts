import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../Interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit{
  productData:undefined|Product;
  message:string| undefined;
constructor(private route:ActivatedRoute,private product:ProductService,private router:Router){}

ngOnInit(){
  let ProductId=this.route.snapshot.paramMap.get('id');
  console.warn(ProductId);                                  // this.product.getProductbyId(ProductId) gets a number and that number now is the id from data or productdata
  ProductId && this.product.getProductbyId(ProductId).subscribe((data)=>{ //ProductId &&  means if productid is not null or undifined
    console.warn(data)
    this.productData=data;
  });
}


submit(data2: any) {
  if (this.productData) {
    data2.id = this.productData.id;
  }

  this.product.updateProduct(data2).subscribe((result) => {

 

    if (!result) {
      this.message = 'Product is updated';
    }
  });

  setTimeout(() => {
    this.message = undefined;
  }, 3000);

  setTimeout(() => {
    this.router.navigate(['/seller-home']);
  }, 4000);
  console.warn(data2);
}
}