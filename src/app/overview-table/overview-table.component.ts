import { Component, OnInit, Inject, Input, SimpleChanges } from '@angular/core';
import {setBindingDebugInfoForChanges} from "@angular/core/src/linker/view_utils";

@Component({
  selector: 'app-overview-table',
  template: `
    <h1>{{borough}}</h1>
    <table class="table table-striped">
      <thead>
        <th></th>
        <th>{{boroughLookup[borough].neighborhood.name}}</th>
        <th>% Total</th>
        <th>{{boroughLookup[borough].countyName}}</th>
        <th>% Total</th>
      </thead>
      <tbody>
        <tr *ngFor="let row of table">
          <td>{{row.label}}</td>
          <td>{{row.zipValue | number}}</td>
          <td>{{row.zipPercentage | percent}}</td>
          <td>{{row.countyValue | number}}</td>
          <td>{{row.countyPercentage | percent}}</td>
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
        'name' : 'Park Slope',
        'zipCode' : '11215',
      },
    },
    'manhattan' : {
      'countyNumber' : '061',
      'countyName' : 'New York County',
      'neighborhood' : {
        'name' : 'East Village',
        'zipCode' : '10009',
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

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    if (changes) {
      if (changes.hasOwnProperty('borough')) {
        this.getTableDataFromCensus();
      }
    }
  }

  getTableDataFromCensus() {
    //get zip level info
    const countyPromise = this.census.buildQuery('2015', this.dataForQuery.survey, [{
      key: 'county',
      value: this.boroughLookup[this.borough].countyNumber
    }, {key: 'in=state', value: '36'}], this.dataForQuery.fields)
    const zipPromise = this.census.buildQuery('2015', this.dataForQuery.survey, [{
      key: 'zip+code+tabulation+area',
      value: this.boroughLookup[this.borough].neighborhood.zipCode
    }], this.dataForQuery.fields);
    Promise.all([zipPromise, countyPromise]).then(values => {
      this.generateTableFromQueryResults(values);
    });
  }

  generateTableFromQueryResults(results) {
    const zipDataArray = results[0][1];
    const countyDataArray = results[1][1];
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
    this.table = rows;
  }
}
