import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class HistorialService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${environment.token}`
    })};

  private urlHistorial = `${environment.apiUrlApiGateWay}/api/transactionalDataSimple`;
  private urlAttendance = `${environment.apiUrlApiGateWay}/v1/attendance`;
  private urlPrograms = `${environment.apiUrlApiGateWay}/v1/programs`;

  constructor(private _http: HttpClient) { }

  findAll() {
    return this._http.get(`${this.urlHistorial}/listData`, this.httpOptions);
  }
}
