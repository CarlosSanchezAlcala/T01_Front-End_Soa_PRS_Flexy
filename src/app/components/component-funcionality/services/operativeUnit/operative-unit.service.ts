import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OperativeUnitService {
  private urlOperativeUnit = `http://localhost:8085/api/operativeUnit`;
  private urlFuncionary = `http://localhost:8081/api/funcionaryData`;

  constructor(private _http: HttpClient) {}

  findAllDataOperativeUnit() {
    return this._http.get(this.urlOperativeUnit + '/listData');
  }

  findAllDataFuncionary() {
    return this._http.get(this.urlFuncionary + '/listData/active');
  }
}
