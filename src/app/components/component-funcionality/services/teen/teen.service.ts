import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TeenService {
  private urlTeen = `http://localhost:8082/api/teenData`;
  private urlOperativeUnit = `http://localhost:8085/api/operativeUnit`;
  private urlAttorney = `http://localhost:8084/api/attorneyData`;

  constructor(private _http: HttpClient) {}

  findAllDataTeen() {
    return this._http.get(this.urlTeen + '/listData');
  }

  finAllDataTeenActive() {
    return this._http.get(this.urlTeen + '/listData/active');
  }

  findAllDataOperativeUnit() {
    return this._http.get(this.urlOperativeUnit + '/listData');
  }

  findAllDataAttorney() {
    return this._http.get(this.urlAttorney + '/listData');
  }
}
