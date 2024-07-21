import { Injectable } from "@angular/core";


export interface signup{
    name:string,
    password:string,
    email:string
}
export interface Login{
    email:string,
    password:string;

}
export interface Product{
    productName:string,
    price:number,
    category:undefined|string,
    color:string,
    description:string,
    image:string,
    id:number,
    status:undefined|string,
    quantity:undefined|number

}

export interface Cart{
 
    cartItemId: number|any ;
    productName: string;
    price: number;
    category: string | undefined;
    color: string;
    description: string;
    image: string;
    userId: number;
    quantity:undefined| number;

   

  
}

export interface WishList{

 
    cartItemId: number|any ;
    productName: string;
    price: number;
    category: string | undefined;
    color: string;
    description: string;
    image: string;
    userId: number;
    quantity:1;

   

  
}
export class PaymentDetail {
   
    cardOwnerName:string = ""
    cardNumber: string = ""
    expiration: string = ""
    securityCode: string = ""
    price:number =0;
 
 }
 