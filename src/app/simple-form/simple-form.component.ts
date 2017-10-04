import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Http, Response } from "@angular/http";
import 'rxjs/add/operator/toPromise';
@Component({
  selector: 'app-simple-form',
  template: `
  <input #myInput type="text" [(ngModel)]="message">
    <button (click)="update.emit({text:message})">Click Me!</button>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
    }

    * {
      font-famly: monospace;
      
    }
  `]
})
export class SimpleFormComponent implements OnInit {
  @Input() message;

  @Output() update = new EventEmitter();

  constructor(private http: Http) {
  }

  ngOnInit() {
    let url = `https://randomuser.me/api/?results=10`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        response.json().data;
        console.log(`the response from our call ${response}`);
      });
  }

}
