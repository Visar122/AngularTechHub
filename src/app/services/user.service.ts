import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { signup,Login } from '../Interfaces';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  UserAdded=new EventEmitter<boolean>(false);
  
  isuserLoggedIn=new BehaviorSubject<boolean>(false);
 
  isLogginError=new EventEmitter<boolean>(false);
  isSignUpError=new EventEmitter<boolean>(false);

  constructor(private http:HttpClient,private route:Router) {   }
    
    UserSignUp(data:signup){ //the things get added in the console like name email passowrd automaticly by this method in the start

  // Check if the email already exists
  return this.http.post('https://localhost:7197/api/Users/SignUp',data,{observe:'response'}).subscribe((result)=>{ //Here we post it in the interface
        if (result) {
          this.UserAdded.emit(true); //'user'is a label to call the data stored,JSON.stringify(result.body)) takes only the  result  body so name password email not all the information
         

        } else {
          this.http.get(`https://localhost:7197/api/Users/UserExists?email=${data.email}`,{ observe: 'response' }).subscribe((result: any) => {
   
         console.warn(result);   //u can see the user is created

         if(result){
          console.warn('Email already exists');
          // You may want to handle this case, show an error message, etc.
          this.isSignUpError.emit(true);
          return;
        }
      });
  }
});
}
  reloadUser(){                                             //this is so if user is logged in he cannot acess the login page again from the api
    if(localStorage.getItem('user')){
      this.isuserLoggedIn.next(true);
      this.route.navigate(['home']) ;
    }
  }

  UserLogin(data:Login){
 

    this.http.get(`https://localhost:7197/api/Users/Login?email=${data.email}&password=${data.password}`,
    {observe:'response'}).subscribe((result:any)=>{
 console.warn(result) //to check the body 
      if(result&&result.body&&result.body){
        this.isLogginError.emit(false);
        localStorage.setItem('user',JSON.stringify(result.body));
        this.route.navigate(['home']) ;

      }
      else{
        console.warn('login failed')
        this.isLogginError.emit(true);
      }
    })

  }
}
