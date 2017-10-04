import {Component, Inject} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = `Demographic Overview`;
  onUpdate(borough) {
    console.log('we are updating stuff so now we can make a call to the service', borough);
    this.boroughData.update(borough);
  }

  constructor(@Inject('boroughData') private boroughData) {
  }
}
