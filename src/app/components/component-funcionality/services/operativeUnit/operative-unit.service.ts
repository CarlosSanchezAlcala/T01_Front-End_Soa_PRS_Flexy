import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from "../../../../../environments/environment.development";

@Injectable({
  providedIn: 'root',
})
export class OperativeUnitService {
  private urlOperativeUnit = `${environment.apiUrlApiGateWay}/api/operativeUnit`;
  private urlFuncionary = `${environment.apiUrlApiGateWay}/api/funcionaryData`;

  constructor(private _http: HttpClient) {}

  findAllDataOperativeUnit() {
    return this._http.get(this.urlOperativeUnit + '/listData');
  }

  findAllDataFuncionary() {
    return this._http.get(this.urlFuncionary + '/listData/active');
  }
}
