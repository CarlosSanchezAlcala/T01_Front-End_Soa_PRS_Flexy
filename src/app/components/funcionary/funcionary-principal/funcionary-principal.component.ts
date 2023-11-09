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
    'name',
    'surnameFather',
    'surnameMother',
    'dni',
    'phoneNumber',
    'range',
    'confirmation',
    'address',
    'email',
  ];

  constructor(public _funcionaryService: FuncionaryService) {}

  ngOnInit(): void {
    this.findAllDataCompleteFuncionary();
    this.findAllDataActiveFuncionary();
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
