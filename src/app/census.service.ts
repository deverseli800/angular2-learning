import { Injectable } from '@angular/core';

@Injectable()
export class CensusService {
  config = {
    baseUrl: 'https://api.census.gov/data/',
    apiKey: '6f463c3d90e98ff583f5374ad92ba076f633e683',
  };

  constructor() { }

  buildQuery(year= '2015', survey= 'acs5', geography= 'zip+code+tabulation+area', fieldsArr= ['B25010_001E', 'B01001_001E', 'B11001_001E', 'B19013_001E', 'B01001_001E']) {
    console.log('we are building a query');
    return 5
  }
}
