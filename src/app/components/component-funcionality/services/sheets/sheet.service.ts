import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/internal/Observable';
import {environment} from "../../../../../environments/environment.development";
import {Sheet} from "../../models/Sheets/Sheet.model";

@Injectable({
  providedIn: 'root'
})
export class SheetService {

  constructor(private http: HttpClient) { }

  listSheet() {
    return this.http.get(`${environment.CONNECTION_URL}`);
  }

  listSheetANX1E() {
    return this.http.get(`${environment.CONNECTION_URL}/tabs/ANEXO_1-E`);
  }


  listSheetANX1() {
    return this.http.get(`${environment.CONNECTION_URL}/tabs/ANEXO_1`);
  }


  deleteSheet(ndoc: number) {
    return this.http.delete(`${environment.CONNECTION_URL}`);
  }

  getSheetDataByBD(dni: number) {
    return this.http.get(`${environment.CONNECTION_URL}/tabs/FICHA_DE_INGRESO/dni/${dni}`);
  }

  getSheetDataByIdANX1E(dni: number) {
    return this.http.get(`${environment.CONNECTION_URL}/tabs/ANEXO_1-E/dni/${dni}`);
  }

  getSheetDataByIdANX1(dni: number) {
    return this.http.get(`${environment.CONNECTION_URL}/tabs/ANEXO_1/dni/${dni}`);
  }

  getSheetDataByIdINFPI(dni: number) {
    return this.http.get(`${environment.CONNECTION_URL}/tabs/PLAN_INDIVIDUAL/dni/${dni}`);
  }

  getSheetDataByIdANX00(dni: number) {
    return this.http.get(`${environment.CONNECTION_URL}/tabs/FICHA_DE_INGRESO/dni/${dni}`);
  }

  getInfoFlag(dni: number, flag: string) {
    return this.http.get(`${environment.CONNECTION_URL}/tabs/BD_ExpedienteDigital/search?dni=*${dni}*&flag=${flag}`);
  }

  getFilterExpediente(dni: number, flag: string, num_exp: string) {
    return this.http.get(`${environment.CONNECTION_URL}/tabs/BD_ExpedienteDigital/search?dni=*${dni}*&flag=${flag}&num_exp=${num_exp}`);
  }

  updateStatus(tipo: string, id: number, flag: string): Observable<Sheet> {
    const url = `${environment.CONNECTION_URL}/search?tipo=*${tipo}*&id=${id}`;

    return this.http.patch<Sheet>(url, {
      flag,
    });
  }
}
