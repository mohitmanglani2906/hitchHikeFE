import { Component, OnInit } from '@angular/core';
import { DashboardDataServiceService } from '../service/dashboard-data-service.service';


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

  constructor(private dashboarddataService: DashboardDataServiceService) { }

  ngOnInit() {
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
    this.dashboarddataService.saveUserInitiatedRequested(JSON.stringify(this.userRequest))
      .subscribe(
        data => {
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

}
