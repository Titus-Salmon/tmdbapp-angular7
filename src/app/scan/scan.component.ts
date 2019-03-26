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

  ngOnInit() {
    this.filtersConfig = {
      //base_path: "Tablefilter-master/dist/tablefilter/",
      paging: {
        length: 20,
        results_per_page: ["Results per page ", [20, 25, 30, 35, 40, 45, 50]]
      },
      grid_layout: true,
      alternate_rows: false,
      btn_reset: true,
      rows_counter: true,
      rows_counter_text: "Displayed rows: ",
      loader: true,
      status_bar: true,
      //remember_page_number: true,
      //remember_page_length: false,
      col_types: [
        "string",
        "string",
        "string",
        "string",
        "string",
        "string",
        "string"
      ],
      extensions: [
        {
          name: "sort"
        }
      ]
      //enable_slc_reset_filter: false
    };

    //this.tf = new TableFilter('resultsTable', this.filtersConfig);
  }

  /*function clearTable() {
    tf.clearFilters(); //needed to reset the bottom pagination fields ('Rows', 'Page', and 'Results per page'),
    //otherwise they don't update correctly (tablefilter method)
    if (document.getElementById("resultsTableBody").rows.length > 0) {
        //if table has any data in it
        tf.destroy(); //1st, destroy tablefilter table (tablefilter method)
        if (document.getElementById("resultsTableBody").rows[0].cells.length > 0) {
            //clear the table (not connected to tablefilter)
            var tableBody = document.getElementById("resultsTableBody");
            tableBody.innerHTML = "";
        }
    }
    console.log('(document.getElementById("resultsTableBody").rows.length_inside_clearTable ~~~~~~~> ');
    console.log((document.getElementById("resultsTableBody").rows.length));
}
/**************************************************************************************************/
  /*deleteFirstRow is needed because tablefilter's grid-layout option kept inserting additional empty
row upon consecutive searches*/
  /*function deleteFirstRow() {
    if (document.getElementById("resultsTableBody").rows.length > 0) {
        document.getElementById("resultsTableBody").deleteRow(0);
    }
}
/**************************************************************************************************/
  //function clearCaption() {
  //   document.getElementById("resultsTable").deleteCaption(); //clears table caption on click, otherwise caption gets duplicated
  //}
  showScanResults() {
    //tf.destroy();
    //tf.init();
    //clearTable();
    //deleteFirstRow();
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
        //tf.destroy();
        //tf.clearFilters();
        //tf.init();
        //tf.destroy();
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
        /*******tablefilter.js*************************************************************/
        //tf.init(); //tf.init() must be down here, otherwise if it is up with the rest of the tablefilter.js script,
        //search results keep duplicating table components when clicking 'search' button
        /*******tablefilter.js*************************************************************/
        var ResultsTableBody = document.getElementById("resultsTableBody");
        console.log("ResultsTableBody = ");
        console.log(ResultsTableBody);
        console.log("ResultsTableBody[0] = ");
        console.log(ResultsTableBody[0]);
        var tbl = <HTMLTableElement>document.getElementById("resultsTable");
        // var filterRow = tbl.childNodes[2].childNodes[1];
        //console.log("tbl = ");
        //console.log(tbl);
        //if (tbl.childNodes[2].childNodes.length > 4) {
        //if there is more than 1 <tr class="fltrow"></tr>
        //tbl.childNodes[2].removeChild(filterRow); //delete it
        //}
        /* console.log("tbl.childNodes = ");
        console.log(tbl.childNodes);
        console.log("tbl.childNodes[2].childNodes = ");
        console.log(tbl.childNodes[2].childNodes);
        console.log("tbl.childNodes[2].childNodes.length = ");
        console.log(tbl.childNodes[2].childNodes.length);
        var gridContent = document.getElementsByClassName("grd_Cont");
        console.log("gridContent=");
        console.log(gridContent);
        console.log("gridContent.length=");
        console.log(gridContent.length);
        console.log("gridContent[0]=");
        console.log(gridContent[0]);
        console.log("gridContent[0].childNodes=");
        console.log(gridContent[0].childNodes);
        if (gridContent.length >= 1) {*/
        //var list = document.getElementById("myList");   // Get the <ul> element with id="myList"
        //   list.removeChild(list.childNodes[0]);
        //gridContent[0].removeChild(gridContent[0].childNodes[2]);
        //location.reload();
        //tf.destroy();
        //}
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