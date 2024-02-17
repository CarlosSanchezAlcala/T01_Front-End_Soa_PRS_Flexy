import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from "../../../../../environments/environment.development";
import {Observable} from "rxjs";

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

  generarPDF(): Observable<ArrayBuffer> {
    const url = `${this.urlFuncionary}/export-pdf`;
    return this._http.get(url, { responseType: 'arraybuffer' });
  }

}
