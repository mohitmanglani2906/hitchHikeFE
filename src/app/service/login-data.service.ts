import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { API_URL } from 'src/app/app.constants';
import {map} from 'rxjs/operators';

export const TOKEN = 'token';
export const AUTHENTICATED_USER = 'authenticaterUser';

@Injectable({
  providedIn: 'root'
})
export class LoginDataService {

  constructor(private http: HttpClient) { }

  saveUserSignUpData(userLogin){
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type","application/json")
    return this.http.post(`${API_URL}/users/userLogin/`, userLogin, { headers: headers })

  }

  loginWithGoogle(userEmail, flag){

    return this.http.post(`${API_URL}/users/userLogin/`,
    {
        userEmail,
        flag
    })
    .pipe(
      map(
      data => {
       sessionStorage.setItem(AUTHENTICATED_USER, userEmail);
       sessionStorage.setItem(TOKEN, `Bearer ${data["requestData"][0]["idToken"]}`);
      //  console.log("__Token___ " + sessionStorage.getItem(TOKEN))
       return data;
      }
    )
  );

  }

  getAuthenticatedToken(){
    if(this.getAuthenticatedUser())
      return sessionStorage.getItem(TOKEN)
 }

  getAuthenticatedUser(){
    return sessionStorage.getItem(AUTHENTICATED_USER)
    
 }

  isUserLoggedIn(){
     let user = sessionStorage.getItem(AUTHENTICATED_USER)
     console.log("__LoggedIn____ " + sessionStorage.getItem(AUTHENTICATED_USER))
     console.log("__Token___ " + sessionStorage.getItem(TOKEN))
     return !(user === null)
  }

  logout(){
    sessionStorage.removeItem(AUTHENTICATED_USER)
    sessionStorage.removeItem(TOKEN)
  }

}
