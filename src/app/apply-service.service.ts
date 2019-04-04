import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ApplicationForm } from './application-form';


@Injectable({
  providedIn: 'root'
})
export class ApplyServiceService {

  urlT0d = "http://localhost:3000/apply"
  constructor(private httpT0d: HttpClient) { }

  applyT0d(applyPost: ApplicationForm) {
    return this.httpT0d.post<any>(this.urlT0d, applyPost);
  }
}
