import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { EditForm } from './edit-form';


@Injectable({
  providedIn: 'root'
})
export class EditServiceService {

  urlT0d = "http://localhost:3000/successful-edit/EditSuccess"
  constructor(private httpT0d: HttpClient) { }

  editT0d(editPost: EditForm) {
    return this.httpT0d.post<any>(this.urlT0d, editPost);
  } //returns post data from edit form to localhost:3000/SuccessfulEdit (which successful-edit.js handles)
}
