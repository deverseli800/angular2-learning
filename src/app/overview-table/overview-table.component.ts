import { Component, OnInit, Inject, Input } from '@angular/core';

@Component({
  selector: 'app-overview-table',
  template: `
    <table class="table table-striped">
      <thead>
        <th></th>
        <th>{{borough.neighborhood.name}}</th>
        <th>% Total</th>
        <th>{{borough.countyName}}</th>
        <th>% Total</th>
      </thead>
      <tbody>
        <tr *ngFor="let row of table">
          <td>{{row.label}}</td>
          <td>{{row.zipValue}}</td>
          <td>{{row.zipPercentage}}</td>
          <td>{{row.countyValue}}</td>
          <td>{{row.countyPercentage}}</td>
        </tr>
      </tbody>
    </table>
  `,
  styles: []
})
export class OverviewTableComponent implements OnInit {
  boroughLookup = {
    'brooklyn' : {
      'countyNumber' : '047',
      'countyName' : `King's County`,
      'neighborhood' : {
        'name' : 'East Village',
        'zipCode' : '10009',
      },
    },
    'manhattan' : {
      'countyNumber' : '061',
      'countyName' : 'New York County',
      'neighborhood' : {
        'name' : 'Park Slope',
        'zipCode' : '11215',
      }
    }
  };
  dataForQuery = {
    survey: 'acs5/profile',
    fields : ['DP03_0018E', 'DP03_0019E', 'DP03_0020E', 'DP03_0020E'],
  };
  surveyFieldLabels = ['2015 Est. Pop 16+ by Transp. to Work', 'Drove Alone', 'Carpooled'];

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
  @Input() borough;

  constructor(@Inject('census') private census) {
    this.borough = this.boroughLookup['manhattan'];
  }

  ngOnInit() {
   this.getTableDataFromCensus();
  }

  getTableDataFromCensus() {
    //get zip level info
    const countyPromise = this.census.buildQuery('2015', this.dataForQuery.survey, [{
      key: 'county',
      value: this.borough.countyNumber
    }, {key: 'in=state', value: '36'}], this.dataForQuery.fields)
    const zipPromise = this.census.buildQuery('2015', this.dataForQuery.survey, [{
      key: 'zip+code+tabulation+area',
      value: '10009'
    }], this.dataForQuery.fields);
    Promise.all([zipPromise, countyPromise]).then(values => {
      console.log('got our data back', values);
      this.generateTableFromQueryResults(values);
    });
  }

  generateTableFromQueryResults(results) {
    const zipDataArray = results[0][1];
    const countyDataArray = results[1][1];
    console.log(`our data ${zipDataArray}`);
    const rows = this.surveyFieldLabels.map((label, index) => {
      let dataObject = {
        label: label,
        zipValue: zipDataArray[index],
        zipPercentage: index !== 0 ? parseFloat(zipDataArray[index]) / zipDataArray[0] : null,
        countyValue: countyDataArray[index],
        countyPercentage: index !== 0 ? parseFloat(countyDataArray[index]) / countyDataArray[0] : null
      };

      return dataObject;
    });
    console.log('our rows from the table', rows);
    this.table = rows;
  }
}
