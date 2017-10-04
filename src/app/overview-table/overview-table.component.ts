import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-overview-table',
  template: `
    <table class="table table-striped">
      <thead>
        <th>2015 Households By Size</th>
        <th>East Village</th>
        <th>New York County</th>
        <th>% Total</th>
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
    '2015 Households By Size' : {
      'static': true,
      'variables': [
        { value: '1-person' },
        { value: '2-person'},
        { value: '3-person'},
      ]
    },
    'East Village' : {
      'static': false,
      'survey': 'acs5',
      'geography': [{ key:'zip+code+tabulation+area', value: '10009'}],
      'variables': [
        {'field': 'B11016_010E'},
        {'field': 'B11016_003E'},
        {'field': 'B11016_011E'},
      ],
    },
    'New York County' : {
      'static': false,
      'survey': 'acs5',
      'geography': [{ key:'county', value: '061'}, {key: 'in=state', value:'36'}],
      'variables': [
        {'field': 'B11016_010E'},
        {'field': 'B11016_003E'},
        {'field': 'B11016_011E'},
      ],
    }
  };

  table = [];
  constructor(@Inject('census') private census) {}

  ngOnInit() {
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
        this.census.buildQuery('2015', fieldBasePath.survey, fieldBasePath.geography, queryFields)
          .then(response => {
            fieldBasePath.variables.map((dataObject, index) => {
              dataObject.value = response[1][index];
            })
            console.log('we got stuff back from promise', fieldBasePath);
            this.table = this.generateTable();
          }, error => {
            console.log('this query did not work');
          });
      }

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
        if (this.overviewTableFields[key].variables && this.overviewTableFields[key]['variables'][i]) {
          return this.overviewTableFields[key]['variables'][i].value;
        }
      });
    });
    return rows;
  }
}
