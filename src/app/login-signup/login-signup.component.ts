import { Component, OnInit } from '@angular/core';
import { SocialAuthServiceConfig, SocialAuthService } from 'angularx-social-login';
import { GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { Router } from '@angular/router';
import { LoginDataService } from '../service/login-data.service';

export class UserLogin {
  public email:string
  public userEmailJson: any
  public authToken: string
  public createdTime: Date
  public idToken: string
  public loggedInWith: string
}


@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css']
})
export class LoginSignupComponent implements OnInit {

  user: SocialUser;
  loggedIn: boolean;
  signup: boolean;
  userLogin: UserLogin = new UserLogin()
  signUpMessageSuccess = ""
  signUpMessageFailure = ""
  loginMessageSuccess = ""
  loginMessageFailure = ""

  constructor(private authService: SocialAuthService, private router: Router, private logindataService: LoginDataService) { }

  ngOnInit()  
  {
    
  }

  loginWithGoogle() {
    console.log("__Sign in with Google___")
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      if(this.loggedIn != false){
        this.logindataService.loginWithGoogle(this.user.email).subscribe(
          response =>{
              console.log(response)
              console.log(this.user.email)
              if(response["success"] == false){
                this.loginMessageFailure = response["message"]
                this.router.navigate(['login'])
              }
              else{
                this.router.navigate(['dashboard', this.user.email])
              }
              
          }, 
          error =>{
            console.log("message__ " + error.message)
            this.loginMessageFailure = "Something went wrong. Please try again later!"
            this.router.navigate(["login"])
          }
        )
      }
      else{
        this.loginMessageFailure = "Something went wrong. Please try again later!"
        this.router.navigate(['login'])
      }
    });
    
  }

  signUpWithGoogle(){
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.userLogin.email = this.user.email
      this.userLogin.authToken = this.user.authToken
      this.userLogin.userEmailJson =  this.user.response
      this.userLogin.userEmailJson["userEmail"] = this.userLogin.userEmailJson["$t"]
      this.userLogin.idToken = this.user.idToken
      this.userLogin.loggedInWith = this.user.provider
      this.userLogin.createdTime = new Date();
      delete this.userLogin.userEmailJson["$t"]
      this.logindataService.saveUserSignUpData(this.userLogin).subscribe(
          response => {
            // this.signup =  false
            if(response["success"] == false){
              console.log("user Email Json___ " + typeof(this.userLogin.userEmailJson))
              // this.signup = false
              this.signUpMessageFailure = response["message"]
            }
            else{
              // this.signup =  true
              this.signUpMessageSuccess = "Account Created Successfully!"
            }
          },
          error =>{
            // this.signup = false
            this.signUpMessageFailure = "Account not created. Please try again!"
          }
        )
      // console.log("__User___ "+ JSON.stringify(this.user.response))
      // console.log("_u1__" + this.user.idToken)
      // console.log("Auth Code___ " + this.user.authorizationCode)
      // console.log("__Auth Token__ " + this.user.authToken)
      // console.log("___id__" + this.user.id)
      // console.log("__provider__ " + this.user.provider)
    });
  }

}
