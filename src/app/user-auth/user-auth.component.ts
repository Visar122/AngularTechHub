import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Login, signup } from '../Interfaces';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {
  SignUpError:string='';
  LoginError:string='';
  SignUpEmptyError:string='';
  LoginEmptyError:string='';
  signUpcharacterError:string='';
  logincharacterError:string='';

  showLogin=false;
  constructor(private user:UserService){}


  ngOnInit(){  
    this.user.reloadUser(); //this uses the method so  if the user is logged in  he dosent se the sign up field  from api
   
    this.user.UserAdded.subscribe((added) => {
      if (added) {
        // User is successfully added, hide the login component
        this.showLogin = false;
      }
    });

    
  }
 

  signUp(data:signup){
 // Empty  restriction
    if(!data.name||!data.email||!data.password){
       // Display an error message or handle the empty fields as needed
      this.SignUpEmptyError='Please fill in all required fields'
      
      setTimeout(()=>{
        this.SignUpEmptyError='';
      },3000);
      return; // Stop the execution if any field is empty
    }
  // Password  restriction
    if(data.password.length < 8){

      this.signUpcharacterError='Password must be at least 8 characters long';

      setTimeout(()=>{
        this.signUpcharacterError='';
      },3000);
      return; // Stop the execution if any field is empty
    }

    this.user.UserSignUp(data);

    this.user.isSignUpError.subscribe((isError)=>{
      if(isError){
        this.SignUpError = 'User Already exists';
        // Set a timeout to clear the authError after 3 seconds
        setTimeout(() => {
          this.SignUpError = '';
        }, 3000);
        
              
     
      }
    })
     

  }
    // Empty  restriction
  login(data:Login){
    if(!data.email||!data.password){
      // Display an error message or handle the empty fields as needed
   
     
     setTimeout(()=>{
         this.LoginEmptyError='Please fill in all required fields'
     },3000);
     return; // Stop the execution if any field is empty
   }

    // Password  restriction
   if(data.password.length < 8){

    this.logincharacterError='Password must be at least 8 characters long';

    setTimeout(()=>{
      this.logincharacterError='';
    },3000);
    return; // Stop the execution if any field is empty
  }

    this.user.UserLogin(data);

    
    console.warn(data)

    this.user.isLogginError.subscribe((isError)=>{
      if(isError){
        this.LoginError = 'Email Or password is Incorrect';
        // Set a timeout to clear the authError after 3 seconds
        setTimeout(() => {
          this.LoginError = '';
        }, 3000);
        
       
      }
     
    })

    
  }
  openSignup(){
    this.showLogin=true;
  }

  openLogin(){
    this.showLogin=false;
  }
}
