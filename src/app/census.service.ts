import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import 'rxjs/add/operator/toPromise';


@Injectable()
export class CensusService {
  config = {
    baseUrl: 'https://api.census.gov/data/',
    apiKey: '6f463c3d90e98ff583f5374ad92ba076f633e683',
  };

  constructor(private http: Http) { }

  buildQuery(
    year = '2015',
    survey = 'acs5',
    geography = 'zip+code+tabulation+area',
    fieldsArr = ['B25010_001E', 'B01001_001E', 'B11001_001E', 'B19013_001E', 'B01001_001E'],
    geographyValue ='10009') {
    const queryString = `?get=${fieldsArr.join(',')}&for=${geography}:${geographyValue}`;
    const fullQuery = `${this.config.baseUrl}${year}/${survey}${queryString}`;
    console.log('our full query', fullQuery);
    return this.makeQuery(fullQuery);
  }

  makeQuery(queryString) {
    let url = queryString;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        const queryResults = response.json();
        console.log(queryResults);
      });
  }
}
