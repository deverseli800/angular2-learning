import { Component, OnInit, Inject, Output, EventEmitter, Input } from '@angular/core';
@Component({
  selector: 'app-borough-picker',
  template: `
    <div class="form-group">
      <label for="boroughPicker">Pick a borough</label>
      <select 
        [(ngModel)]="selectedBorough"
        class="form-control"
        id="boroughPicker"
        (ngModelChange)="update.emit({ borough: selectedBorough })"
      >
        <option *ngFor="let borough of boroughObjects.boroughs">{{borough.name}}</option>
      </select>
    </div>
    <p>
      We have selected this borough: {{selectedBorough}}
    </p>
  `,
  styles: []
})
export class BoroughPickerComponent implements OnInit {
  @Input() boroughObjects;

  constructor() {
  }
  @Output() update = new EventEmitter();

  ngOnInit() {}

}
