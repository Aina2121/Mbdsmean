import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { env } from 'process';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  /**
   *
   * @param {HttpClient} _http
   */
  constructor(private _http: HttpClient, private globalService: GlobalService) {}

  getAll(page, limit): Observable<any> {
    return this._http.get(environment.apiUrl + "assignments" + "?page=" + page + "&limit=" + limit);
  }

  addAssignment(assignment): Observable<any> {
    const options = this.globalService.formOption(true, localStorage.getItem('token'));
    return this._http.post(environment.apiUrl + "assignments", assignment)
  }

  updateAssignment(assignment): Observable<any> {
    const options = this.globalService.formOption(true, localStorage.getItem('token'));
    console.log("options", options)
    return this._http.put(environment.apiUrl + "assignments", assignment, options)
  }
}
