import { Injectable } from '@angular/core';

@Injectable()
export class BoroughService {
  selected = 'manhattan';
  boroughs = [
    { name: `manhattan`, county: `New York` },
    { name: `brooklyn`, county: `King's County` },
  ];
  update() {
    console.log(`we have received a transmission`);
  }
  constructor() { }

}
