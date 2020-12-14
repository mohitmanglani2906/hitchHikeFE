import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { API_URL } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class DashboardDataServiceService {

  constructor(private http: HttpClient) { }

  createAuthorizationHeader(headers: HttpHeaders) {
    // headers.append('Authorization', 'Basic ' +
    //   btoa('username:password')); 
    
    headers.append("Access-Control-Allow-Origin","*")
    return headers
  }

  getUserDetails(userEmail){
    return this.http.get(`${API_URL}/requests/getUserDetails?userEmail=` + userEmail)
  }

  saveUserInitiatedRequests(userRequest){
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type","application/json")
    // headers = headers.set("Access-Control-Allow-Origin","*")
    //                   .set("Access-Control-Allow-Methods","DELETE, POST, GET, OPTIONS")
    //                   .set("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")
    //                   .set('Access-Control-Allow-Credentials', 'true') 
  
    // headers = this.createAuthorizationHeader(headers)
    console.log("__Headers____ " + headers)
    return this.http.post(`${API_URL}/requests/hitchHikeRequests/`, userRequest, { headers: headers })
  }

  fetchAllRequests(){

    return this.http.get(`${API_URL}/requests/hitchHikeRequests/`)

  }

  fetchMyRequests(userEmail){
    return this.http.get(`${API_URL}/requests/myRequests?userEmail=` + userEmail)
  }

  changeRequest(requestJson){
    return this.http.put(`${API_URL}/requests/hitchHikeRequests/`, requestJson)
  }

}
