import { Component, OnInit } from '@angular/core';
import { DashboardDataServiceService } from '../service/dashboard-data-service.service';
import { SocialAuthServiceConfig, SocialAuthService } from 'angularx-social-login';
import { GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { LoginDataService } from '../service/login-data.service';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common'
import { AUTHENTICATED_USER } from '../service/login-data.service'
import * as moment from 'moment';



export class UserRequest {
  public email:string
  public sourcePlace: string
  public destinationPlace: string
  public leavingTime: Date
  public status: string
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userRequest: UserRequest = new UserRequest()
  successMessage = ""
  leaveTime = ""
  allRequestsList : any
  myRequests : any
  email = ""
  user: SocialUser;
  loggedIn: boolean;
  IsmyRequests: boolean
  IsallRequests: boolean

  constructor(private dashboarddataService: DashboardDataServiceService, private authService: SocialAuthService, private router: Router,
    private route: ActivatedRoute, public datepipe: DatePipe) { }

  ngOnInit() {  
    this.email = this.route.snapshot.params["email"]
    console.log("Email___ " + this.email)
    this.userRequest.email = this.email
    console.log("__LoggedIn____ " + sessionStorage.getItem(AUTHENTICATED_USER))
    if(sessionStorage.getItem(AUTHENTICATED_USER) != this.userRequest.email){
       this.router.navigate(['login'])
    }
    this.fetchMyRequests()
      
  }

  submitForm(){
    this.userRequest.status = "Pending"
    // this.userRequest.email = this.email 
    console.log("User Email____ " + this.userRequest.email)
    console.log("User Source Place____ " + this.userRequest.sourcePlace)
    console.log("User Destination Place____ " + this.userRequest.destinationPlace)
    console.log("User Request___ " + this.userRequest)
    console.log("User Leaving Time____ " + this.userRequest.leavingTime)

    // let today = new Date(this.userRequest.leavingTime);
    // this.userRequest.leavingTime = today
    console.log("_Json StringFy___ " + JSON.stringify(this.userRequest))
    this.dashboarddataService.saveUserInitiatedRequests(JSON.stringify(this.userRequest))
      .subscribe(
        response => {
          this.successMessage = "Request Initiated Successfully!!"
          console.log("Success")
          this.fetchMyRequests()
        }
        ,
        error => {
          console.log("Reject__ " + error.message)
        }
      )


    // console.log("__today__ " + today)
    // var result = today.toUTCString().split('.')[0];
    // console.log("Result__ %s", result)
    
    
  }

  fetchMyRequests(){
    this.dashboarddataService.fetchMyRequests(this.email)
      .subscribe(
        response => {
          this.myRequests = response
          this.allRequestsList = ""
          if(response["success"] == true){
            console.log("response" + response)
            this.IsmyRequests = true
            this.IsallRequests = false
            this.myRequests = this.getAllPendingRequests(this.myRequests.requestData)
            console.log("This My Request____ " + JSON.stringify(this.myRequests))
            if(this.myRequests.length == 0){
              this.IsmyRequests = false
            }
          }
          
        },
        error => {
          console.log("__Error___ " + error.message)
        }
      )
  }

  fetchAllRequests(){
    this.dashboarddataService.fetchAllRequests()
      .subscribe(
         response => {
            this.allRequestsList = response
            this.IsmyRequests = false
            if(response["success"] == true){
              this.IsallRequests = true
              this.allRequestsList = this.getAllRequestList(this.allRequestsList["requestData"])
              console.log("All Requests___ " + JSON.stringify(this.allRequestsList))
              if(this.allRequestsList.length == 0){
                this.IsmyRequests = false
              }
            }
            
         },
         error => {
           console.log("__Error___ " + error.message)
         }
      )
  }

  cancelRequest(requestJson){
      requestJson.status = "Cancel"
      this.customReverseTimeConverter(requestJson)
      // this.dashboarddataService.cancelRequest(requestJson)
      //   .subscribe(
      //     response => {
      //        console.log("Success" + JSON.stringify(response))
      //     },
      //     error => {
      //       console.log("Error")
      //     }
      //   )
  }

  getAllRequestList(allRequestsList){
      let allRequest = []
      for(var i = 0; i < allRequestsList.length ;i++){
         
         if(allRequestsList[i]["email"] == this.email || allRequestsList[i]["status"] != "Pending"){
            console.log("Deleted")
            delete allRequestsList[i]
         }
         else{
          let time = this.customeTimeConverter(allRequestsList[i]["leavingTime"].slice(11,-1))
          allRequestsList[i]["leavingDate"] = moment(allRequestsList[i]["leavingTime"]).format('LL')
          allRequestsList[i]["leavingTime"] = time
          allRequestsList[i]["initiatedDate"] = moment(allRequestsList[i]["initiatedTime"]).format('LL')
          allRequestsList[i]["initiatedTime"] = this.customeTimeConverter(allRequestsList[i]["initiatedTime"].slice(11,-1))
          allRequest.push(allRequestsList[i])
         }
      }
      return allRequest
  }

  getAllPendingRequests(requestJson){
      console.log("requestJson __ " + JSON.stringify(requestJson))
      for(var i=0; i < requestJson.length ; i++){
        
        if(requestJson[i]["status"] != "Pending"){
           delete requestJson[i]
        }
        else{
          let time = this.customeTimeConverter(requestJson[i]["leavingTime"].slice(11,-1))
          requestJson[i]["leavingDate"] = moment(requestJson[i]["leavingTime"]).format('LL')
          requestJson[i]["leavingTime"] = time
          requestJson[i]["initiatedDate"] = moment(requestJson[i]["initiatedTime"]).format('LL')
          requestJson[i]["initiatedTime"] = this.customeTimeConverter(requestJson[i]["initiatedTime"].slice(11,-1))
        }
      }

      return requestJson
      
  }

  customeTimeConverter(stringDate){
      let hours = stringDate.slice(0,2)
      let minutes = stringDate.slice(3,5)
      let time;
      
      if(hours >= 0 && hours <= 12){
        time = hours + ":" + minutes + " AM"

      }
      else if(hours >= 13 && hours <=23){
        hours = parseInt(hours) - 12
        time = hours + ":" + minutes + " PM"
      }
      return time
      
  }

  customReverseTimeConverter(requestJson){
      console.log(JSON.stringify(requestJson))
      
      for(var item in requestJson){
          let formattedTime;
          let formattedDate;
          let hours;
          let minutes;
          let time;
          if(item == "leavingTime"){
            formattedDate = moment(requestJson["leavingDate"]).format().slice(0,10)
            if(requestJson[item].includes("PM")){
              hours = parseInt(requestJson[item].split(":")[0]) + 12  
            }
            else {
              hours = String(parseInt(requestJson[item].split(":")[0]))
              if(String(hours).length == 1){
                hours = "0" + String(hours)
              }
            }
      
            minutes = requestJson[item].split(":")[1].replace("PM","").replace(" ","")
            time = hours + ":" + minutes + ":00Z"
            formattedTime = moment(requestJson["leavingDate"]).format().slice(0,10) + "T" + time
            requestJson[item] = formattedTime
            console.log("Combine Date___ " + formattedTime)
            console.log("requestJson_Final__ " + JSON.stringify(requestJson))
            delete requestJson["leavingDate"]
          }
          else if(item == "initiatedTime"){
            formattedDate = moment(requestJson["initiatedDate"]).format().slice(0,10)
            if(requestJson[item].includes("PM")){
              hours = parseInt(requestJson[item].split(":")[0]) + 12  
            }
            else {
              hours = String(parseInt(requestJson[item].split(":")[0]))
              if(String(hours).length == 1){
                hours = "0" + String(hours)
              }
            }
      
            minutes = requestJson[item].split(":")[1].replace("PM","").replace(" ","")
            time = hours + ":" + minutes + ":00Z"
            formattedTime = moment(requestJson["initiatedDate"]).format().slice(0,10) + "T" + time
            requestJson[item] = formattedTime
            console.log("Combine Date___ " + formattedTime)
            console.log("requestJson_Final__ " + JSON.stringify(requestJson))
            delete requestJson["initiatedDate"]
          }
      }

      console.log("New Request json___ " + JSON.stringify(requestJson))
     }
  
  // signInWithGoogle(): void {
  //   console.log("__Sign in with Google___")
  //   this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  // }

}
