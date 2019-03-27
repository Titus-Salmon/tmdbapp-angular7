import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ApplyComponent } from './apply/apply.component';
import { ApplySuccessComponent } from './apply-success/apply-success.component';
import { SsnErrorComponent } from './ssn-error/ssn-error.component';
import { ScanComponent } from './scan/scan.component';

import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { ScanTableComponent } from './scan-table/scan-table.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//import { Http } from "@angular/http";
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ApplyComponent,
    ApplySuccessComponent,
    SsnErrorComponent,
    ScanComponent,
    ScanTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
