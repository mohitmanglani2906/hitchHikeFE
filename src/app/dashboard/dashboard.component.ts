import { Component, OnInit } from '@angular/core';
import { DashboardDataServiceService } from '../service/dashboard-data-service.service';
import { SocialAuthServiceConfig, SocialAuthService } from 'angularx-social-login';
import { GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";

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

  user: SocialUser;
  loggedIn: boolean;

  constructor(private dashboarddataService: DashboardDataServiceService, private authService: SocialAuthService) { }

  ngOnInit() {

    // this.authService.authState.subscribe((user) => {
    //   this.user = user;
    //   this.loggedIn = (user != null);
    // });
    // let today = new Date();
    // var result = today.toISOString().split('.')[0];
    // console.log("Result__ %s", result)
  }

  submitForm(){
    this.userRequest.status = "Pending"
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

  fetchAllRequests(){
    this.dashboarddataService.fetchAllRequests()
      .subscribe(
         response => {
            //this.allRequests = JSON.stringify(response["requestData"])
            //console.log("Data___AllRequests___ " + this.allRequests)
            this.allRequestsList = response
            this.getAllRequestList(this.allRequestsList["requestData"])
         },
         error => {
           console.log("__Error___ " + error.message)
         }
      )
  }

  getAllRequestList(allRequestsList){
      for(var i = 0; i < allRequestsList.length ;i++){
         console.log(allRequestsList[i]["id"])
         console.log(allRequestsList[i]["email"])
      }
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

}
