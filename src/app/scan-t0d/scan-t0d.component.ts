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
import { ScanResultsObject } from "./scanResultsObject.model";

@Component({
  selector: "app-scan-t0d",
  templateUrl: "./scan-t0d.component.html",
  styleUrls: ["./scan-t0d.component.css"]
})
export class ScanT0dComponent implements OnInit, AfterViewInit {

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
            DATE: response[0][i]["date"]["S"],
          });
          this.scanResultsTableDataSource.data = this.scanResultsTable;
        }
        console.dir(this.scanResultsTable);
      })
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.scanResultsTableDataSource.paginator = this.paginator;
    this.scanResultsTableDataSource.sort = this.sort;
    this.scanResultsTableDataSource.sortingDataAccessor = (data, header) => data[header]; //needed to correct for incorrect
    //sorting if column has a mixture of letters, numbers, and symbols
  }
}
