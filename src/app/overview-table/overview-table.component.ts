import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview-table',
  template: `
    <table class="table table-striped">
      <thead>
        <th>Description</th>
        <th>2015 Estimates</th>
        <th>East Village % Change 2010-2015</th>
        <th>% Change 2015-2020</th>
        <th>2015 Estimate</th>
        <th>New York County % Change 2010-2015</th>
        <th>% Change 2015-2020</th>
      </thead>
      <tbody>
        <tr *ngFor="let row of table">
          <td *ngFor="let field of row">{{field}}</td>
        </tr>
      </tbody>
    </table>
  `,
  styles: []
})
export class OverviewTableComponent implements OnInit {
  overviewTableFields = {
    'description' : [
      { value: 'universe totals' },
      { value: 'population households'},
      { value: 'average household size'},
    ],
    '2015 estimate' : [
      {'survey' : 'acs5', 'field' : 'B01001_001E'},
      {'survey' : 'acs5', 'field' : 'B01001_001E'},
      {'survey' : 'acs5', 'field' : 'B01001_001E'},
    ],
  };

  table = [];
  constructor() {
  }

  ngOnInit() {
   this.table = this.generateTable();
  }

  generateTable() {
    const columnFields = Object.keys(this.overviewTableFields).map(columnName => this.overviewTableFields[columnName]);
    const maxLength = columnFields.reduce((a,b) => {
      return a.length > b.length ? a.length : b.length;
    });
    const columnKeys = Object.keys(this.overviewTableFields);
    console.log([...Array(maxLength)].map(item => console.log('item', item)));
    const rows = Array.from(Array(maxLength)).map((value, i) => {
      console.log('what is our value?', i);
      return columnKeys.map((key) => {
        if (this.overviewTableFields[key] && this.overviewTableFields[key][i]) {
          return this.overviewTableFields[key][i].value;
        }
      });

    });
    return rows;
  }
}
