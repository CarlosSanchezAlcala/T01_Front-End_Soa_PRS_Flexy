import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${environment.token}`
    })};

  private urlAttendance = `${environment.apiUrlApiGateWay}/api/attendance`;

  constructor(private _http: HttpClient) { }

  findAll() {
    return this._http.get(`${this.urlAttendance}/list`, this.httpOptions);
  }

}
