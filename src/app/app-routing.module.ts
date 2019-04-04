import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ApplyComponent } from './apply/apply.component';
import { ApplySuccessComponent } from './apply-success/apply-success.component';
import {SsnErrorComponent} from './ssn-error/ssn-error.component';
import {ScanComponent} from './scan/scan.component';
import {ScanT0dComponent} from './scan-t0d/scan-t0d.component';
import {ScanEditT0dComponent} from './scan-edit-t0d/scan-edit-t0d.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'apply', component: ApplyComponent},
  {path: 'apply-success', component: ApplySuccessComponent},
  {path: 'ssn-error', component: SsnErrorComponent},
  {path: 'scan-t0d', component: ScanT0dComponent},
  {path: 'scan-edit-t0d', component: ScanEditT0dComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
