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

  private urlTeen = `${environment.apiUrlTeen}/api/teenData`;
  private urlUbigeoAddress = `${environment.apiUrlUbigeoAddress}/api/address`;
  private urlOperativeUnit = `${environment.apiUrlOperativeUnit}/api/operativeUnit`;
  private urlAttorney = `${environment.apiUrlAttorney}/api/attorneyData`;
  private urlarchivos = `${environment.apiarchivos}`;
  private urldataarchivos = `${environment.apiarchivos}/getData`;

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
    return this._http.post(this.urlTeen, teen);
  }

  updateDataTeen(teen: Teen) {
    return this._http.put(this.urlTeen + '/' + teen.id_teen, teen);
  }

  transferDataTeen(teen: Teen) {
    return this._http.patch(
      this.urlTeen + '/transferTeen/' + teen.id_teen,
      teen
    );
  }

  deleteLogicalDataTeen(teen: Teen) {
    return this._http.patch(
      this.urlTeen + '/deleteLogical/' + teen.id_teen,
      teen
    );
  }

  reactiveLogicalDataTeen(teen: Teen) {
    return this._http.patch(
      this.urlTeen + '/reactiveLogical/' + teen.id_teen,
      teen
    );
  }

  mergePdf(pdfUrls: string[]): Observable<Blob> {
    return this._http.post<Blob>(`${this.urlarchivos}/merge-pdf`, pdfUrls, {
      responseType: 'blob' as 'json'
    });
  }

  getData(): Observable<any> {
    return this._http.get(this.urldataarchivos);
  }

  generarPDF(): Observable<ArrayBuffer> {
    const url = `${this.urlTeen}/export-pdf`;
    return this._http.get(url, {responseType: 'arraybuffer'});
  }

}
