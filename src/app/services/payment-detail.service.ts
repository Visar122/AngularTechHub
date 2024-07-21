import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { NgForm } from '@angular/forms';
import { PaymentDetail } from '@app/Interfaces';

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {


  

  list:PaymentDetail[]=[]; 
  formData:PaymentDetail=new PaymentDetail(); //basically ive made formData so the  value of formdata is of the value which is about to be inserted
  
  
  constructor(private http:HttpClient) { } //need to import  HttpClientModule




  PostPaymentDetail(data:PaymentDetail){
    return this.http.post(`https://localhost:7197/api/PaymentDetails`, data)
  }
 

  ResetForm(form:NgForm){
    form.reset()
    this.formData=new PaymentDetail()

  }



}