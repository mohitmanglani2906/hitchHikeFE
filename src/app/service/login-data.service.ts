import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { API_URL } from 'src/app/app.constants';

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

  loginWithGoogle(userEmail){

    return this.http.get(`${API_URL}/users/userLogin?userEmail=` + userEmail)

  }
}
