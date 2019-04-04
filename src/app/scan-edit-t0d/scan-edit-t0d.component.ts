import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import {
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatCard
} from "@angular/material";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-scan-edit-t0d",
  templateUrl: "./scan-edit-t0d.component.html",
  styleUrls: ["./scan-edit-t0d.component.css"]
})
export class ScanEditT0dComponent implements OnInit, AfterViewInit {
  //scanResultsTable: ScanResultsObject[] = [];
  scanResultsTable = [];
  scanResultsTableDataSource = new MatTableDataSource();
  displayedColumns: string[] = [
    "SSN",
    "DOB",
    "LNAME",
    "FNAME",
    "OCCUPATION",
    "EMPLOYER",
    "DATE"
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private httpClient: HttpClient) {}

  selectedRowIndex: number = 0;

  onRowClicked(row) {
    localStorage.clear();
    console.log("Row clicked: ", row);
    console.log("row['SSN']: ", row["SSN"]);
    localStorage.setItem("lsSSN", row["SSN"]);
    console.log("localStorage==>", localStorage);
  }

  highlight(row) {
    this.selectedRowIndex = row;
  }

  deleteData() {
    //puts ssn of selected entry into localStorage & redirects to successful-delete page,
    //where successful-delete.js will perform dyn.deleteItem
    var ssnToDelete = localStorage.getItem("lsSSN");
    console.log("ssnToDelete=", ssnToDelete);

    //disable page redirect if delete button clicked without selecting anything
    if (localStorage.length == 0) {
      alert("You must select an entry to delete");
      return false;
    }

    var deleteConfirmation = confirm(
      "DELETE ENTRY - THIS CANNOT BE UNDONE: ARE YOU SURE?"
    );

    if (deleteConfirmation != false) {
      //redirect to Delete page upon clicking "delete" button
      window.location.replace("http://localhost:3000/successful-delete");
    }
  }

  showScanResultsT0dd() {
    this.httpClient
      .post(
        "http://localhost:3000/scan/results",
        "ssn=" +
          (<HTMLInputElement>document.getElementById("social-security")).value +
          "&dob=" +
          (<HTMLInputElement>document.getElementById("dob")).value +
          "&lname=" +
          (<HTMLInputElement>document.getElementById("last-name")).value +
          "&fname=" +
          (<HTMLInputElement>document.getElementById("first-name")).value +
          "&occupation=" +
          (<HTMLInputElement>document.getElementById("occupation")).value +
          "&employer=" +
          (<HTMLInputElement>document.getElementById("emp")).value +
          "&date=" +
          (<HTMLInputElement>document.getElementById("application-date")).value,
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      )
      .subscribe(response => {
        this.scanResultsTable = []; //this clears the previous table contents
        let i = 0;
        for (i = 0; i < Object.keys(response[0]).length; i++) {
          this.scanResultsTable.push({
            SSN: response[0][i]["ssn"]["S"],
            DOB: response[0][i]["dob"]["S"],
            LNAME: response[0][i]["lname"]["S"],
            FNAME: response[0][i]["fname"]["S"],
            OCCUPATION: response[0][i]["occupation"]["S"],
            EMPLOYER: response[0][i]["employer"]["S"],
            DATE: response[0][i]["date"]["S"]
          });
          this.scanResultsTableDataSource.data = this.scanResultsTable;
        }
        console.dir(this.scanResultsTable);
      });
  }

  ngOnInit() {
    localStorage.clear();
    /******begin SSN AUTOFORMAT**************************************************************************************/
    (<HTMLInputElement>(
      document.getElementById("social-security")
    )).onkeyup = function() {
      //auto formaatting for ssn entry
      var val = (<HTMLInputElement>(
        document.getElementById("social-security")
      )).value.replace(/\D/g, "");
      var newVal = "";
      if (val.length > 4) {
        (<HTMLInputElement>(
          document.getElementById("social-security")
        )).value = val;
      }
      if (val.length > 3 && val.length < 6) {
        newVal += val.substr(0, 3) + "-";
        val = val.substr(3);
      }
      if (val.length > 5) {
        newVal += val.substr(0, 3) + "-";
        newVal += val.substr(3, 2) + "-";
        val = val.substr(5);
      }
      newVal += val;
      (<HTMLInputElement>(
        document.getElementById("social-security")
      )).value = newVal;
    };
    /******end SSN AUTOFORMAT**************************************************************************************/
  }

  ngAfterViewInit() {
    this.scanResultsTableDataSource.paginator = this.paginator;
    this.scanResultsTableDataSource.sort = this.sort;
    this.scanResultsTableDataSource.sortingDataAccessor = (data, header) =>
      data[header]; //needed to correct for incorrect
    //sorting if column has a mixture of letters, numbers, and symbols
  }
}
