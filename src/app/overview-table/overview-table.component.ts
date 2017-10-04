import { Component, OnInit, Inject } from '@angular/core';

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
    'description' : {
      'static': true,
      'variables': [
        { value: 'universe totals' },
        { value: 'population households'},
        { value: 'average household size'},
      ]
    },
    '2015 estimate' : {
      'static': false,
      'survey': 'acs5',
      'geography': 'zip+code+tabulation+area',
      'geoCensusValue': '10019',
      'variables': [
        {'field': 'B01001_001E'},
        {'field': 'B11001_001E'},
        {'field': 'B19013_001E'},
      ],
    }
  };

  table = [];
  constructor(@Inject('census') private census) {}

  ngOnInit() {
    console.log('do we have a census defined', this.census);
   this.table = this.generateTable();
   this.getTableDataFromCensus();
  }

  getTableDataFromCensus() {
    const columnKeys = Object.keys(this.overviewTableFields);
    columnKeys.map((columnKey) => {
      const fieldBasePath = this.overviewTableFields[columnKey];
      const queryFields = fieldBasePath.variables.map((dataObject) => {
        console.log('what data objects are these?', dataObject);
        return dataObject.field;
      });
      if (!fieldBasePath.static) {
        this.census.buildQuery('2015', fieldBasePath.survey, fieldBasePath.geography, queryFields, fieldBasePath.geoCensusValue);
      }

      console.log('what are our queryfields', queryFields);
    })
  }

  generateTable() {
    const columnFields = Object.keys(this.overviewTableFields).map(columnName => this.overviewTableFields[columnName].variables);
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
