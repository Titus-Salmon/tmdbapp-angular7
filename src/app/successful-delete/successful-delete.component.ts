import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-successful-delete',
  templateUrl: './successful-delete.component.html',
  styleUrls: ['./successful-delete.component.css']
})
export class SuccessfulDeleteComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {

    console.log('localStorage is now =====>');
    console.log(localStorage);

    var ssnKeyForDelete = localStorage.getItem('lsSSN');
    console.log('ssnKeyForDelete=');
    console.log(ssnKeyForDelete);

    this.httpClient
      .post(
        "http://localhost:3000/successful-delete/DeleteSuccess",
        "ssn=" + ssnKeyForDelete,
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      ).subscribe();

  }

}
