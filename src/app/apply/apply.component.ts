import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-apply",
  templateUrl: "./apply.component.pug",
  styleUrls: ["./apply.component.css"]
})
export class ApplyComponent implements OnInit {
  date: Date;
  day: any;
  month: any;
  year: any;
  today: any;

  ssnId: any;

  val: any;
  newVal: any;

  pn1: any;
  pn2: any;
  charCode: any;
  evt: any;
  size: any;

  constructor() {}

  ngOnInit() {
    console.log("ngOnInit from apply.component.ts");

    this.SetDate();

    this.ssnId = <HTMLInputElement>document.getElementById("s-s-n");

    this.pn1 = <HTMLInputElement>document.getElementById("phoneNumber1");
    this.pn2 = <HTMLInputElement>document.getElementById("phoneNumber2");
  }

  onKeySSN(event: Event, any: any): any {
    /******begin SSN AUTOFORMAT****************************/

    //auto formatting for ssn entry
    this.val = this.ssnId.value.replace(/\D/g, "");
    this.newVal = "";
    if (this.val.length > 4) {
      this.ssnId.value = this.val;
    }
    if (this.val.length > 3 && this.val.length < 6) {
      this.newVal += this.val.substr(0, 3) + "-";
      this.val = this.val.substr(3);
    }
    if (this.val.length > 5) {
      this.newVal += this.val.substr(0, 3) + "-";
      this.newVal += this.val.substr(3, 2) + "-";
      this.val = this.val.substr(5);
    }
    this.newVal += this.val;
    this.ssnId.value = this.newVal;
    /******end SSN AUTOFORMAT**************************/
  }

  onKeyPN1(event: Event, any: any): any {//phone1 autoformat
    console.log("this.pn1.value=", this.pn1.value);
    //this.charCode = (this.evt.which) ? this.evt.which : this.evt.keyCode;
    this.pn1.value = this.phoneFormat(this.pn1.value);

  }

  onKeyPN2(event: Event, any: any): any {//phone2 autoformat
    console.log("this.pn2.value=", this.pn2.value);
    //this.charCode = (this.evt.which) ? this.evt.which : this.evt.keyCode;
    this.pn2.value = this.phoneFormat(this.pn2.value);
  }


  // A function to format text to look like a phone number
  phoneFormat(input) {
    // Strip all characters from the input except digits
    input = input.replace(/\D/g, "");
    // Trim the remaining input to ten characters, to preserve phone number format
    input = input.substring(0, 10);
    // Based upon the length of the string, we add formatting as necessary
    this.size = input.length;
    if (this.size == 0) {
      input = input;
    } else if (this.size < 4) {
      input = "(" + input;
    } else if (this.size < 7) {
      input = "(" + input.substring(0, 3) + ") " + input.substring(3, 6);
    } else {
      input =
        "(" +
        input.substring(0, 3) +
        ") " +
        input.substring(3, 6) +
        " - " +
        input.substring(6, 10);
    }
    return input;
  }
  /******end PHONE AUTOFORMAT**************************************************************************************/

  SetDate() {
    this.date = new Date();
    this.day = this.date.getDate();
    this.month = this.date.getMonth() + 1;
    this.year = this.date.getFullYear();
    if (this.month < 10) {
      this.month = "0" + this.month;
    }
    if (this.day < 10) this.day = "0" + this.day;
    this.today = this.year + "-" + this.month + "-" + this.day;
    (<HTMLInputElement>document.getElementById("formDate")).value = this.today;

    console.log("formDate.value=");
    console.log((<HTMLInputElement>document.getElementById("formDate")).value);
  }
}
