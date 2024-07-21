import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Login, signup } from '../Interfaces';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLogginError = new BehaviorSubject<boolean>(false);
  isSignUpError = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private route: Router) { }

  

  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.route.navigate(['seller-home']);
    }
  }
  SellerLogin(data: Login) {
    console.warn(data);
  
    this.http.get(`https://localhost:7197/api/Sellers/Login?email=${data.email}&password=${data.password}`, { observe: 'response' }).subscribe(
      (result: any) => {
        console.log('Login result:', result);
        if (result&&result.body) {
          this.isLogginError.next(false);
          localStorage.setItem('seller', JSON.stringify(result.body));
          this.route.navigate(['seller-home']);
        } else {
          console.warn('login failed');
          this.isLogginError.next(true);
        }
      },
      (error) => {
        // Handle error here if needed
        console.error('Error in SellerLogin:', error);
      }
    );
  }
}