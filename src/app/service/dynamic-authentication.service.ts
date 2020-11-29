import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class DynamicAuthenticationService {

  constructor() { }

  isUserLoggedIn(){
    let user = sessionStorage.getItem('authenticaterUser')
    return !(user === null)
 }

 logout(){
  sessionStorage.removeItem('authenticaterUser')
}

}
