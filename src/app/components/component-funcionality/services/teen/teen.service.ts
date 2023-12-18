import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Teen } from '../../models/teen/teen.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TeenService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${environment.token}`
    })};

  private urlTeen = `${environment.apiUrlApiGateWay}/api/teenData`;
  private urlUbigeoAddress = `${environment.apiUrlApiGateWay}/api/address`;
  private urlOperativeUnit = `${environment.apiUrlApiGateWay}/api/operativeUnit`;
  private urlAttorney = `${environment.apiUrlApiGateWay}/api/attorneyData`;
  private urlarchivos = `${environment.apiUrlApiGateWay}`;
  private urldataarchivos = `${environment.apiUrlApiGateWay}/getData`;

  teenSelected: Teen | undefined = undefined;

  constructor(private _http: HttpClient) { }

  findAll() {
    return this._http.get(`${this.urlTeen}/listData`, this.httpOptions);
  }

  findAllDataActive() {
    return this._http.get(this.urlTeen + '/listData/active', this.httpOptions);
  }

  findAllDataInactive() {
    return this._http.get(this.urlTeen + '/listData/inactive', this.httpOptions);
  }

  findAllDataUbigeoAddress() {
    return this._http.get(this.urlUbigeoAddress + '/listData', this.httpOptions);
  }

  findAllDataOperativeUnit() {
    return this._http.get(this.urlOperativeUnit + '/listData', this.httpOptions);
  }

  findAllDataAttorney() {
    return this._http.get(this.urlAttorney + '/listData', this.httpOptions);
  }

  saveNewTeen(teen: Teen) {
    return this._http.post(this.urlTeen, teen, this.httpOptions);
  }

  updateDataTeen(teen: Teen) {
    return this._http.put(this.urlTeen + '/' + teen.id_teen, teen, this.httpOptions);
  }

  transferDataTeen(teen: Teen) {
    return this._http.patch(
      this.urlTeen + '/transferTeen/' + teen.id_teen,
      teen, this.httpOptions
    );
  }

  deleteLogicalDataTeen(teen: Teen) {
    return this._http.patch(
      this.urlTeen + '/deleteLogical/' + teen.id_teen,
      teen, this.httpOptions
    );
  }

  reactiveLogicalDataTeen(teen: Teen) {
    return this._http.patch(
      this.urlTeen + '/reactiveLogical/' + teen.id_teen,
      teen, this.httpOptions
    );
  }

  mergePdf(pdfUrls: string[]): Observable<Blob> {
    return this._http.post<Blob>(`${this.urlarchivos}/merge-pdf`, pdfUrls, {
      responseType: 'blob' as 'json'
    });
  }

  getData(): Observable<any> {
    return this._http.get(this.urldataarchivos, this.httpOptions);
  }

  generarPDF(): Observable<ArrayBuffer> {
    const url = `${this.urlTeen}/export-pdf`;
    return this._http.get(url, { responseType: 'arraybuffer', headers: this.httpOptions.headers });
  }

}
