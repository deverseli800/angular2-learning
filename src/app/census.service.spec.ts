/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CensusService } from './census.service';

describe('CensusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CensusService]
    });
  });

  it('should ...', inject([CensusService], (service: CensusService) => {
    expect(service).toBeTruthy();
  }));
});
