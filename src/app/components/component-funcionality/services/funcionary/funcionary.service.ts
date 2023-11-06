import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Funcionary } from '../../models/funcionary/funcionary.model';

@Injectable({
  providedIn: 'root',
})
export class FuncionaryService {
  private urlFuncionary = `${environment.apiUrl}/api/funcionaryData`;
  private urlUbigeoAddress = `${environment.apiUrlUbigeoAddress}/api/address`;
  funcionarySelected: Funcionary | undefined = undefined;

  constructor(private _http: HttpClient) {}

  findAll() {
    return this._http.get(`${this.urlFuncionary}/listData`);
  }

  findAllDataActive() {
    return this._http.get(this.urlFuncionary + '/listData/active');
  }

  findDataRankLegalGuardian() {
    return this._http.get(this.urlFuncionary + '/listData/legalGuardian');
  }

  findAllDataInactive() {
    return this._http.get(this.urlFuncionary + '/listData/inactive');
  }

  findAllDataUbigeoAddress() {
    return this._http.get(this.urlUbigeoAddress + '/listData');
  }

  saveNewFuncionary(funcionary: Funcionary) {
    return this._http.post(this.urlFuncionary, funcionary);
  }

  updateDataFuncionary(funcionary: Funcionary) {
    return this._http.put(
      this.urlFuncionary + '/' + funcionary.id_funcionary,
      funcionary
    );
  }

  deleteLogicalDataFuncionary(funcionary: Funcionary) {
    return this._http.patch(
      this.urlFuncionary + '/deleteLogical/' + funcionary.id_funcionary,
      funcionary
    );
  }

  reactiveLogicalDataFuncionary(funcionary: Funcionary) {
    return this._http.patch(
      this.urlFuncionary + /reactiveLogical/ + funcionary.id_funcionary,
      funcionary
    );
  }

  /*
  mergePdf(pdfUrls: string[]): Observable<Blob> {
    return this.http.post<Blob>(`${this.baseUrl}/merge-pdf`, pdfUrls, {
      responseType: 'blob' as 'json'
    });
  }

  getData(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  */
}