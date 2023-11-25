import { Injectable } from '@angular/core';
import {environment} from "../../../../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {TransferTeen} from "../../models/transfer/transferTeen.model";

@Injectable({
  providedIn: 'root'
})
export class TransferTeenService {

  private urlTransferTeen = `${environment.apiUrlTransferTeen}/api/transferTeen`;

  constructor(private _http: HttpClient) { }

  saveNewTransferTeen(transferTeen: TransferTeen) {
    return this._http.post(this.urlTransferTeen, transferTeen);
  }

}
