import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ScanTableDataSource } from './scan-table-datasource';

@Component({
  selector: 'app-scan-table',
  templateUrl: './scan-table.component.html',
  styleUrls: ['./scan-table.component.css']
})
export class ScanTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: ScanTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['ssn', 'dob'];

  ngOnInit() {
    this.dataSource = new ScanTableDataSource(this.paginator, this.sort);
  }
}
