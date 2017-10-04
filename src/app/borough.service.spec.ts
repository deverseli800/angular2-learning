/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BoroughService } from './borough.service';

describe('BoroughService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BoroughService]
    });
  });

  it('should ...', inject([BoroughService], (service: BoroughService) => {
    expect(service).toBeTruthy();
  }));
});
