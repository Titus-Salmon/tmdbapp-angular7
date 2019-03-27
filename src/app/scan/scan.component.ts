import { Component, OnInit, Injectable } from "@angular/core";
import { ArrayDataSource } from "@angular/cdk/collections";
import { Observable } from "rxjs";
import { NgModule } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: "app-scan",
  templateUrl: "./scan.component.pug",
  styleUrls: ["./scan.component.css"]
})

@Injectable()
export class ScanComponent implements OnInit {

  constructor(private httpClient: HttpClient) {}

  showScanResultsT0d() {
    this.httpClient.post(
      "http://localhost:3000/scan/results",
      'ssn=' + (<HTMLInputElement>document.getElementById("social-security")).value +
      '&dob=' + (<HTMLInputElement>document.getElementById("dob")).value +
      '&lname=' + (<HTMLInputElement>document.getElementById("last-name")).value +
      '&fname=' + (<HTMLInputElement>document.getElementById("first-name")).value +
      '&occupation=' + (<HTMLInputElement>document.getElementById("occupation")).value +
      '&employer=' + (<HTMLInputElement>document.getElementById("emp")).value +
      '&date=' + (<HTMLInputElement>document.getElementById("application-date")).value,
      {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
    ).subscribe(
      (postResponseData)=>{
        console.log(`POST response data from server (scan.js) in response to httpClient
        POST request data (ssn=\'\'&dob=\'\'...) from client (scan.component.ts)
        USE THIS AS OBSERVABLE TO POPULATE MATERIAL DATA TABLE`);
        console.log(postResponseData);

        console.log('(<HTMLInputElement>document.getElementById("social-security")).value=');
        console.log((<HTMLInputElement>document.getElementById("social-security")).value);
      }
    );
  }

  /*
  static resDatAcc = [];

  soc: any;
  dob: any;
  lastName: any;
  firstName: any;
  occ: any;
  empl: any;
  appDate: any;
  ajaxCall: XMLHttpRequest;

  ls_conv2_arr: any;

  BIRTHDATE: any;
  SOCSEC: any;
  */

  ngOnInit() {}

  /*
  showScanResults() {
    this.soc = (<HTMLInputElement>(
      document.getElementById("social-security")
    )).value;
    this.dob = (<HTMLInputElement>document.getElementById("dob")).value;
    this.lastName = (<HTMLInputElement>(
      document.getElementById("last-name")
    )).value;
    this.firstName = (<HTMLInputElement>(
      document.getElementById("first-name")
    )).value;
    this.occ = (<HTMLInputElement>document.getElementById("occupation")).value;
    this.empl = (<HTMLInputElement>document.getElementById("emp")).value;
    this.appDate = (<HTMLInputElement>(
      document.getElementById("application-date")
    )).value;
    this.ajaxCall = new XMLHttpRequest();
    var responseDataAccum = [];
    this.ajaxCall.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log("ajaxCall.responseText = ");
        console.log(this.responseText);

        var jsonParsedData = this.responseText;
        var jsonResponse = JSON.parse(jsonParsedData);
        console.log("jsonResponse =");
        console.log(jsonResponse);

        localStorage.setItem("ls_jsonres", JSON.stringify(jsonParsedData));

        console.log("jsonResponse.length =");
        console.log(jsonResponse.length);
        console.log("jsonResponse[0] =");
        console.log(jsonResponse[0]);
        console.log("jsonResponse[0].length =");
        console.log(jsonResponse[0].length);
        if (jsonResponse[0].length == 0) {
          //if search results are empty, send alert, then reload page
          alert("NO SEARCH RESULTS");
          location.reload();
        }

        //var responseDataAccum = [];

        jsonResponse.forEach(i => {
          //for each element of the jsonResponse array,
          //get corresponding string entered in the application form
          console.log("*************************************************");
          console.log("~~~~~> i =");
          console.log(i);
          i.forEach(n => {
            console.log("///////////////////");
            console.log(n);
            var dob_entry = n["dob"]["S"];
            var ssn_entry = n["ssn"]["S"];
            var lname_entry = n["lname"]["S"];
            var fname_entry = n["fname"]["S"];
            var occ_entry = n["occupation"]["S"];
            var empl_entry = n["employer"]["S"];
            var appDate_entry = n["date"]["S"];
            var tableBody = <HTMLTableElement>(
              document.getElementById("resultsTableBody")
            );
            var row = tableBody.insertRow(-1);
            var cellSSN = row.insertCell(-1);
            var cellDOB = row.insertCell(-1);
            var cellLname = row.insertCell(-1);
            var cellFname = row.insertCell(-1);
            var cellOcc = row.insertCell(-1);
            var cellEmp = row.insertCell(-1);
            var cellAppDate = row.insertCell(-1);
            cellSSN.innerHTML = ssn_entry;
            cellDOB.innerHTML = dob_entry;
            cellLname.innerHTML = lname_entry;
            cellFname.innerHTML = fname_entry;
            cellOcc.innerHTML = occ_entry;
            cellEmp.innerHTML = empl_entry;
            cellAppDate.innerHTML = appDate_entry;

            responseDataAccum.push(dob_entry, ssn_entry);
            ScanComponent.resDatAcc.push(dob_entry, ssn_entry);
            //localStorage.setItem('resdata', dob_entry)
            //ScanComponent.push(dob_entry, ssn_entry);
            //console.log('ScanComponent.resDatAcc INSIDE=');
            //console.log(ScanComponent.resDatAcc);
          });
        });

        var ResultsTableBody = document.getElementById("resultsTableBody");
        console.log("ResultsTableBody = ");
        console.log(ResultsTableBody);
        console.log("ResultsTableBody[0] = ");
        console.log(ResultsTableBody[0]);
        var tbl = <HTMLTableElement>document.getElementById("resultsTable");
      }
      document.getElementById("resultsTable").style.display = "inline-block";

      console.log("responseDataAccum - inside ajax call =");
      console.log(responseDataAccum);
    };
    this.ajaxCall.open("POST", "http://localhost:3000/scan/results", true);
    console.log("post request sent from scan.hbs");
    this.ajaxCall.setRequestHeader(
      "Content-type",
      "application/x-www-form-urlencoded"
    );
    this.ajaxCall.send(
      "ssn=" +
        this.soc +
        "&dob=" +
        this.dob +
        "&lname=" +
        this.lastName +
        "&fname=" +
        this.firstName +
        "&occupation=" +
        this.occ +
        "&employer=" +
        this.empl +
        "&date=" +
        this.appDate
    );
    console.log("this.ajaxCall =");
    console.log(this.ajaxCall);

    //console.log("this.responseDataAccum=");
    //console.log(this.responseDataAccum);

    console.log("ScanComponent=");
    console.dir(ScanComponent);

    console.log("ScanComponent.length=");
    console.dir(ScanComponent.length);

    console.log("ScanComponent.prototype=");
    console.dir(ScanComponent.prototype);

    //console.log('ScanComponent.prototype.showScanResults()=');
    //console.dir(ScanComponent.prototype.showScanResults());

    console.log("ScanComponent.prototype.resDatAcc=");
    //console.dir(ScanComponent.prototype.resDatAcc);

    console.log("ScanComponent.resDatAcc=");
    console.log(ScanComponent.resDatAcc);

    console.log("ScanComponent.resDatAcc.entries=");
    console.dir(ScanComponent.resDatAcc.entries);

    console.log("ScanComponent.resDatAcc.map=");
    console.dir(ScanComponent.resDatAcc.map);

    console.log("ScanComponent.resDatAcc.toString=");
    console.dir(ScanComponent.resDatAcc.toString);

    console.log("ScanComponent.resDatAcc[0]=");
    console.dir(ScanComponent.resDatAcc[0]);

    console.log("ScanComponent.resDatAcc.length=");
    console.dir(ScanComponent.resDatAcc.length);

    console.log("ScanComponent.resDatAcc.values=");
    console.dir(ScanComponent.resDatAcc.values);

    console.log("ScanComponent.prototype.resDatAcc[0]=");
    //console.dir(ScanComponent.prototype.resDatAcc[0]);

    console.log("this.resDatAcc=");
    //console.dir(this.resDatAcc);

    console.log("responseDataAccum OUTSIDE =");
    console.log(responseDataAccum);

    console.log("this.ajaxCall[0] =");
    console.log(this.ajaxCall[0]);

    console.log("this.ajaxCall.response =");
    console.log(this.ajaxCall.response);

    console.log("this.ajaxCall.responseText=");
    console.log(this.ajaxCall.responseText);

    //console.log('JSON.parse(this.ajaxCall.responseText)=');
    //console.log(JSON.parse(this.ajaxCall.responseText));

    console.log("localStorage=");
    console.log(localStorage);

    console.log("Object.values(localStorage)=");
    console.log(Object.values(localStorage));

    console.log("JSON.stringify(localStorage)=");
    console.log(JSON.stringify(localStorage));

    this.ls_conv2_arr = JSON.parse(localStorage.getItem("ls_jsonres"));
    console.log("this.ls_conv2_arr=");
    console.dir(this.ls_conv2_arr);

    console.log("JSON.stringify(this.ls_conv2_arr)=");
    console.dir(JSON.stringify(this.ls_conv2_arr));

    console.log("JSON.stringify(this.ls_conv2_arr)[0]=");
    console.dir(JSON.stringify(this.ls_conv2_arr)[0]);

    console.log("this.ls_conv2_arr[0]=");
    console.log(this.ls_conv2_arr[0]);
    console.log("this.ls_conv2_arr[0][0]=");
    console.log(this.ls_conv2_arr[0][0]);
    console.log("this.ls_conv2_arr[0][0]['date']=");
    console.log(this.ls_conv2_arr[0][0]["date"]);
  }
  */
}
