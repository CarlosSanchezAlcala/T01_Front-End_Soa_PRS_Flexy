import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import {Teen} from "../../models/teen/teen.model";

@Injectable({
  providedIn: 'root',
})
export class TeenService {
  private urlTeen = `${environment.apiUrlTeen}/api/teenData`;
  private urlOperativeUnit = `${environment.apiUrlOperativeUnit}/api/operativeUnit`;
  private urlAttorney = `${environment.apiUrlAttorney}/api/attorneyData`;

  constructor(private _http: HttpClient) {}

  saveNewTeen(teen: Teen) {
    return this._http.post(this.urlTeen, teen);
  }

  updateTeen(teen: Teen) {
    return this._http.put(this.urlTeen + '/' + teen.id_teen, teen);
  }

  transferDataTeen(teen: Teen) {
    return this._http.patch(this.urlTeen + '/transferTeen/' + teen.id_teen, teen);
  }

  deleteLogicalDataTeen(teen: Teen) {
    return this._http.patch(this.urlTeen + '/deleteLogical/' + teen.id_teen, teen);
  }

  reactiveLogicalDataTeen(teen: Teen) {
    return this._http.patch(this.urlTeen + '/reactiveLogical/' + teen.id_teen, teen);
  }

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
