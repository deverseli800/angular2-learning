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
    geography = [{ key:'zip+code+tabulation+area', value: '10009'}],
    fieldsArr = ['B25010_001E', 'B01001_001E', 'B11001_001E', 'B19013_001E', 'B01001_001E']) {
    const geographies = geography.map(geoObj => `${geoObj.key}:${geoObj.value}`).join('&');
    const queryString = `?get=${fieldsArr.join(',')}&for=${geographies}`;
    const fullQuery = `${this.config.baseUrl}${year}/${survey}${queryString}`;
    return this.makeQuery(fullQuery);
  }

  makeQuery(queryString) {
    let url = queryString;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        const queryResults = response.json();
        return queryResults;
      }, error => {
        return error;
      });
  }
}
