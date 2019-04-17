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
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { ScanTableComponent } from './scan-table/scan-table.component';
import {FormsModule} from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//import { Http } from "@angular/http";
import {HttpClientModule} from '@angular/common/http';
import { ScanT0dComponent } from './scan-t0d/scan-t0d.component';
import { ScanEditT0dComponent } from './scan-edit-t0d/scan-edit-t0d.component';
import { HeaderComponent } from './partials/header.component';

//import {StoreSSN} from './storeSSN.service';
//import { SendSSNtoBackend } from './sendSSNtoBackend.service';
import { EditT0dComponent } from './edit-t0d/edit-t0d.component';
import { SuccessfulDeleteComponent } from './successful-delete/successful-delete.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ApplyComponent,
    ApplySuccessComponent,
    SsnErrorComponent,
    ScanComponent,
    ScanTableComponent,
    ScanT0dComponent,
    ScanEditT0dComponent,
    EditT0dComponent,
    SuccessfulDeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatInputModule
  ],
  exports: [
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
