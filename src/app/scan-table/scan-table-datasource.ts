import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface ScanTableItem {
  dob: string;
  ssn: number;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: ScanTableItem[] = [
  {ssn: 1, dob: 'Hydrogen'},
  {ssn: 2, dob: 'Helium'},
  {ssn: 3, dob: 'Lithium'},
  {ssn: 4, dob: 'Beryllium'},
  {ssn: 5, dob: 'Boron'},
  {ssn: 6, dob: 'Carbon'},
  {ssn: 7, dob: 'Nitrogen'},
  {ssn: 8, dob: 'Oxygen'},
  {ssn: 9, dob: 'Fluorine'},
  {ssn: 10, dob: 'Neon'},
  {ssn: 11, dob: 'Sodium'},
  {ssn: 12, dob: 'Magnesium'},
  {ssn: 13, dob: 'Aluminum'},
  {ssn: 14, dob: 'Silicon'},
  {ssn: 15, dob: 'Phosphorus'},
  {ssn: 16, dob: 'Sulfur'},
  {ssn: 17, dob: 'Chlorine'},
  {ssn: 18, dob: 'Argon'},
  {ssn: 19, dob: 'Potassium'},
  {ssn: 20, dob: 'Calcium'},
];

/**
 * Data source for the ScanTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ScanTableDataSource extends DataSource<ScanTableItem> {
  data: ScanTableItem[] = EXAMPLE_DATA;

  constructor(private paginator: MatPaginator, private sort: MatSort) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<ScanTableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginator's length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: ScanTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: ScanTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'dob': return compare(a.dob, b.dob, isAsc);
        case 'ssn': return compare(+a.ssn, +b.ssn, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
