import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-scan",
  templateUrl: "./scan.component.pug",
  styleUrls: ["./scan.component.css"]
})
export class ScanComponent implements OnInit {
  filtersConfig: any;
  tf: any;
  soc: any;
  dob: any;
  lastName: any;
  firstName: any;
  occ: any;
  empl: any;
  appDate: any;
  ajaxCall: XMLHttpRequest;

  constructor() {}

  ngOnInit() {}

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
    this.ajaxCall.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log("ajaxCall.responseText = ");
        console.log(this.responseText);
        var jsonParsedData = this.responseText;
        var jsonResponse = JSON.parse(jsonParsedData);
        console.log("jsonResponse =");
        console.log(jsonResponse);
        console.log("jsonResponse.length =");
        console.log(jsonResponse.length);
        console.log("jsonResponse[0].length =");
        console.log(jsonResponse[0].length);
        if (jsonResponse[0].length == 0) {
          //if search results are empty, send alert, then reload page
          alert("NO SEARCH RESULTS");
          location.reload();
        }
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
    console.log("ajaxCall =");
    console.log(this.ajaxCall);
  }
}
