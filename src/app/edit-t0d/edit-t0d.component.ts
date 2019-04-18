import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import {EditForm} from '../edit-form';
import { EditServiceService } from '../edit-service.service';

@Component({
  selector: 'app-edit-t0d',
  templateUrl: './edit-t0d.component.html',
  styleUrls: ['./edit-t0d.component.css']
})
export class EditT0dComponent implements OnInit {

  unionNumber: any;
  date: any;
  lastName: any;
  firstName: any;
  middleInit: any;
  occupation: any;
  streetAdd: any;
  phone: any;
  city: any;
  state: any;
  zip: any;
  emp: any;
  empDate: any;
  empAddr: any;
  empPhone: any;
  empCity: any;
  empState: any;
  empZip: any;
  initFee: any;
  paidTo: any;
  dob: any;
  ssn: any;
  previous: any;
  prevNumber: any;

  editFormModel = new EditForm(this.unionNumber, this.date, this.lastName, this.firstName, this.middleInit, this.occupation, this.streetAdd, this.phone, this.city, this.state, this.zip, this.emp, this.empDate, this.empAddr, this.empPhone, this.empCity, this.empState, this.empZip, this.initFee, this.paidTo, this.dob, this.ssn, this.previous, this.prevNumber);

  constructor(private http: HttpClient, private editServiceT0d: EditServiceService) { }

  ngOnInit() {

    console.log('localStorage is now =====>');
    console.log(localStorage);

    var ssnKeyForEditing = localStorage.getItem('lsSSN');
    console.log('ssnKeyForEditing=');
    console.log(ssnKeyForEditing);

    this.http
      .post(
        "http://localhost:3000/edit-entry/EditEntry",
        "ssn=" + ssnKeyForEditing,
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      ).subscribe(response => {console.log(response[0][0]);

        this.editFormModel.unionNumber=response[0][0]['union_number']['S'];
        this.editFormModel.date=response[0][0]['date']['S'];
        this.editFormModel.lastName=response[0][0]['lname']['S'];
        this.editFormModel.firstName=response[0][0]['fname']['S'];
        this.editFormModel.middleInit=response[0][0]['mi']['S'];
        this.editFormModel.occupation=response[0][0]['occupation']['S'];
        this.editFormModel.streetAdd=response[0][0]['address']['S'];
        this.editFormModel.phone=response[0][0]['phone']['S'];
        this.editFormModel.city=response[0][0]['city']['S'];
        this.editFormModel.state=response[0][0]['state']['S'];
        this.editFormModel.zip=response[0][0]['zip']['S'];
        this.editFormModel.emp=response[0][0]['employer']['S'];
        this.editFormModel.empDate=response[0][0]['employment_date']['S'];
        this.editFormModel.empAddr=response[0][0]['employer_address']['S'];
        this.editFormModel.empPhone=response[0][0]['employer_phone']['S'];
        this.editFormModel.empCity=response[0][0]['employer_city']['S'];
        this.editFormModel.empState=response[0][0]['employer_state']['S'];
        this.editFormModel.empZip=response[0][0]['employer_zip']['S'];
        this.editFormModel.initFee=response[0][0]['fee']['S'];
        this.editFormModel.paidTo=response[0][0]['paid_to']['S'];
        this.editFormModel.dob=response[0][0]['dob']['S'];
        this.editFormModel.ssn=response[0][0]['ssn']['S'];
        this.editFormModel.previous=response[0][0]['membership']['S'];
        this.editFormModel.prevNumber=response[0][0]['previous_union_number']['S'];

      });

  }

  onSubmit(){
    console.log(this.editFormModel);
    this.editServiceT0d.editT0d(this.editFormModel)
    .subscribe(
      dataT0d => console.log('dataT0d~~~~~>', dataT0d),
      error => console.error('error~~~~~>', error)
    ) //subscribes to post data returned from edit form (=dataT0d) in editServiceT0d instance of EditServiceService
  };

}
