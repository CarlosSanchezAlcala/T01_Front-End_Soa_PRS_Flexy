import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment.development';
import {Asignation} from '../../models/asignation/asignation.model';
import {
  TransactionalAllocation,
  transactionDataCompleteResponse
} from '../../models/asignation/transactionDataComplete.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AsignationService {
  private urlAsignation = `${environment.apiUrlAsignation}/api/transaccionalData`;
  asignationSelected: Asignation | undefined = undefined;
  transactionSelected: TransactionalAllocation | undefined = undefined;

  constructor(private _http: HttpClient) {
  }

  findAll() {
    return this._http.get(this.urlAsignation + '/listData');
  }

  findAsignationByTeenId(id_teen: number): Observable<Asignation> {
    return this._http.get<Asignation>(`${this.urlAsignation}/listData/idTeen/${id_teen}`);
  }

  findAllDatosWithoutBody() {
    return this._http.get(this.urlAsignation + '/listDataIdRegister');
  }

  findAllDataActive() {
    return this._http.get(this.urlAsignation + '/listData/active');
  }

  findDataIdRegister() {
    return this._http.get(this.urlAsignation + '/listDataIdRegister');
  }

  findDataTeenNoRegistered() {
    return this._http.get(this.urlAsignation + '/listData/noRegisteredTeen');
  }

  findAllDataInactive() {
    return this._http.get(this.urlAsignation + '/listData/inactive');
  }

  saveNewAsignation(asignation: Asignation) {
    return this._http.post(this.urlAsignation, asignation);
  }

  updateDataAsignation(asignation: Asignation) {
    return this._http.put(
      this.urlAsignation + '/' + asignation.id_funcionaryteend,
      asignation
    );
  }

  updateTwoWayAsignation(twoWayAsignation: transactionDataCompleteResponse) {
    return this._http.put(
      this.urlAsignation +
      '/' +
      twoWayAsignation.transaccionalAllocation.id_funcionaryteend,
      twoWayAsignation
    );
  }

  deleteLogicalDataAsignation(id_teen: number) {
    return this._http.patch(
      `${this.urlAsignation}/deleteLogical/${id_teen}`,
      {}
    );
  }

  reactiveLogicalDataAsignation(asignation: Asignation) {
    return this._http.patch(
      this.urlAsignation + '/reactiveLogical/' + asignation.id_funcionaryteend,
      asignation
    );
  }

  deleteDataAsignationComplete(asignation: Asignation) {
    return this._http.delete(
      this.urlAsignation + '/' + asignation.id_funcionaryteend
    );
  }

  saveMasive(dto: any): Observable<void> {
    return this._http.post<void>(`${this.urlAsignation}/bulk`, dto);
  }

  generarPDF(): Observable<ArrayBuffer> {
    const url = `${this.urlAsignation}/report`;
    return this._http.get(url, {responseType: 'arraybuffer'});
  }

}
