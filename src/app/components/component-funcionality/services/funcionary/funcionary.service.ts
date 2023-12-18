import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Funcionary } from '../../models/funcionary/funcionary.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FuncionaryService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${environment.token}`
    })};

  private urlFuncionary = `${environment.apiUrlApiGateWay}/api/funcionaryData`;
  private urlUbigeoAddress = `${environment.apiUrlApiGateWay}/api/address`;
  funcionarySelected: Funcionary | undefined = undefined;

  constructor(private _http: HttpClient) {}

  findAll() {
    return this._http.get(`${this.urlFuncionary}/listData`, this.httpOptions);
  }

  findDataFuncionaryByIdSoa(idOperativeUnit: number): Observable<Funcionary[]> {
    return this._http.get<Funcionary[]>(
      `${this.urlFuncionary}/bySoaInfo/${idOperativeUnit}`, this.httpOptions);
  }

  findAllDataActive() {
    return this._http.get(this.urlFuncionary + '/listData/active', this.httpOptions);
  }

  findDataRankLegalGuardian() {
    return this._http.get(this.urlFuncionary + '/listData/legalGuardian', this.httpOptions);
  }

  findAllDataInactive() {
    return this._http.get(this.urlFuncionary + '/listData/inactive', this.httpOptions);
  }

  findAllDataUbigeoAddress() {
    return this._http.get(this.urlUbigeoAddress + '/listData', this.httpOptions);
  }

  saveNewFuncionary(funcionary: Funcionary) {
    return this._http.post(this.urlFuncionary, funcionary, this.httpOptions);
  }

  updateDataFuncionary(funcionary: Funcionary) {
    return this._http.put(
      this.urlFuncionary + '/' + funcionary.id_funcionary,
      funcionary, this.httpOptions
    );
  }

  deleteLogicalDataFuncionary(funcionary: Funcionary) {
    return this._http.patch(
      this.urlFuncionary + '/deleteLogical/' + funcionary.id_funcionary,
      funcionary, this.httpOptions
    );
  }

  reactiveLogicalDataFuncionary(funcionary: Funcionary) {
    return this._http.patch(
      this.urlFuncionary + /reactiveLogical/ + funcionary.id_funcionary,
      funcionary, this.httpOptions
    );
  }

  generarPDF(): Observable<ArrayBuffer> {
    const url = `${this.urlFuncionary}/export-pdf`;
    return this._http.get(url, { responseType: 'arraybuffer', headers: this.httpOptions.headers });
  }
}
