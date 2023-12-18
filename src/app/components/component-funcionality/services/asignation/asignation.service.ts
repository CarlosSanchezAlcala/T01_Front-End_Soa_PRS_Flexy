import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment.development';
import {Asignation} from '../../models/asignation/asignation.model';
import {
  TransactionalAllocation,
  transactionDataCompleteResponse
} from '../../models/asignation/transactionDataComplete.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AsignationService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${environment.token}`
    })};

  private urlAsignation = `${environment.apiUrlApiGateWay}/api/transaccionalData`;
  asignationSelected: Asignation | undefined = undefined;
  transactionSelected: TransactionalAllocation | undefined = undefined;

  constructor(private _http: HttpClient) {
  }

  findAll() {
    return this._http.get(this.urlAsignation + '/listData', this.httpOptions);
  }

  findAsignationByTeenId(id_teen: number): Observable<Asignation> {
    return this._http.get<Asignation>(`${this.urlAsignation}/listData/idTeen/${id_teen}`, this.httpOptions);
  }

  findAllDatosWithoutBody() {
    return this._http.get(this.urlAsignation + '/listDataIdRegister', this.httpOptions);
  }

  findAllDataActive() {
    return this._http.get(this.urlAsignation + '/listData/active', this.httpOptions);
  }

  findDataIdRegister() {
    return this._http.get(this.urlAsignation + '/listDataIdRegister', this.httpOptions);
  }

  findDataTeenNoRegistered() {
    return this._http.get(this.urlAsignation + '/listData/noRegisteredTeen', this.httpOptions);
  }

  findAllDataInactive() {
    return this._http.get(this.urlAsignation + '/listData/inactive', this.httpOptions);
  }

  saveNewAsignation(asignation: Asignation) {
    return this._http.post(this.urlAsignation, asignation, this.httpOptions);
  }

  updateDataAsignation(asignation: Asignation) {
    return this._http.put(
      this.urlAsignation + '/' + asignation.id_funcionaryteend,
      asignation, this.httpOptions
    );
  }

  updateTwoWayAsignation(twoWayAsignation: transactionDataCompleteResponse) {
    return this._http.put(
      this.urlAsignation +
      '/' +
      twoWayAsignation.transaccionalAllocation.id_funcionaryteend,
      twoWayAsignation, this.httpOptions
    );
  }

  deleteLogicalDataAsignation(id_teen: number) {
    return this._http.patch(
      `${this.urlAsignation}/deleteLogical/${id_teen}`, this.httpOptions,
      {}
    );
  }

  reactiveLogicalDataAsignation(asignation: Asignation) {
    return this._http.patch(
      this.urlAsignation + '/reactiveLogical/' + asignation.id_funcionaryteend,
      asignation, this.httpOptions
    );
  }

  deleteDataAsignationComplete(asignation: Asignation) {
    return this._http.delete(
      this.urlAsignation + '/' + asignation.id_funcionaryteend
      , this.httpOptions);
  }

  saveMasive(dto: any): Observable<void> {
    return this._http.post<void>(`${this.urlAsignation}/bulk`, dto, this.httpOptions);
  }

  generarPDF(): Observable<ArrayBuffer> {
    const url = `${this.urlAsignation}/report`;
    return this._http.get(url, { responseType: 'arraybuffer', headers: this.httpOptions.headers });
  }

}
