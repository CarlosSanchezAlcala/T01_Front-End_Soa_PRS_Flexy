import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Entidades } from '../../models/entidad/entidades.model';

@Injectable({
  providedIn: 'root'
})
export class EntidadService {
  private url = `${environment.apiUrlApiGateWay}/v1/entidad`;
  entidadSelected: Entidades | undefined = undefined;

  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get<Entidades[]>(this.url);
  }

  create(body: Entidades) {
    return this.http.post(this.url, body);
  }
  update(entidad: Entidades): Observable<Entidades> {
    const updateUrl = `${this.url}/${entidad.id}`;

    return this.http.put<Entidades>(updateUrl, entidad);
  }
  delete(id: string) {
    return this.http.delete(`${this.url}/${id}`);
  }
  activarEntidad(id: string): Observable<any> {
    const url = `${this.url}/${id}/activar`;
    return this.http.put(url, null);
  }

  generarPDF(): Observable<ArrayBuffer> {
    const url1 = `${this.url}/export-pdf`;
    return this.http.get(url1, { responseType: 'arraybuffer' });
  }
}
