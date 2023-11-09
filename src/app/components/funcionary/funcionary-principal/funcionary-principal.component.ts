import {Component, OnInit} from '@angular/core';
import { FuncionaryService } from '../../component-funcionality/services/funcionary/funcionary.service';

@Component({
  selector: 'app-funcionary-principal',
  templateUrl: './funcionary-principal.component.html',
  styleUrls: ['./funcionary-principal.component.scss']
})
export class FuncionaryPrincipalComponent implements OnInit {

  funcionaryData: any[] = [];
  attorneyData: any[] = [];
  displayedColumns: string[] = [
    'dni',
    'name',
    'surnames',
    'phoneNumber',
    'range',
    'confirmation',
    'actions',
    'moreInformation'
  ];

  constructor(public _funcionaryService: FuncionaryService) {}

  ngOnInit(): void {
    this.findAllDataCompleteFuncionary();
    this.findAllDataActiveFuncionary();
  }

  getConfirmationLegalGuardian(confirmationLegalGuardian: string) {
    return confirmationLegalGuardian === 'S' ? 'Confirmado' : 'Rechazado';
  }

  findAllDataCompleteFuncionary() {
    this._funcionaryService.findAll().subscribe((DataFuncionaryBD: any) => {
      //console.log('Data Teen:', DataTeenBD);
      // this.teenData = DataTeenBD;
    });
  }

  findAllDataActiveFuncionary() {
    this._funcionaryService
      .findAllDataActive()
      .subscribe((DataFuncionaryBDActive: any) => {
        //console.log('Data Teen Active:', DataTeenBDActive);
        this.funcionaryData = DataFuncionaryBDActive;
      });
  }
}
