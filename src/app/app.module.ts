import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SimpleFormComponent } from './simple-form/simple-form.component';
import { BoroughPickerComponent } from './borough-picker/borough-picker.component'
import { BoroughService } from "./borough.service";
import { OverviewTableComponent } from './overview-table/overview-table.component';
import { CensusService } from "./census.service";

@NgModule({
  declarations: [
    AppComponent,
    SimpleFormComponent,
    SimpleFormComponent,
    BoroughPickerComponent,
    OverviewTableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [{provide: 'census', useClass: CensusService}, {provide: 'boroughData', useClass: BoroughService}],
  bootstrap: [AppComponent]
})
export class AppModule { }
