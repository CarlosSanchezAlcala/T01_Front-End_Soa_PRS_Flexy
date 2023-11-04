import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OperativeUnitService } from 'src/app/components/component-funcionality/services/operativeUnit/operative-unit.service';
import { TeenService } from 'src/app/components/component-funcionality/services/teen/teen.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
})
export class SalesComponent implements OnInit {
  showTransferForm = false;
  teenData: any[] = [];
  operativeUnitData: any[] = [];
  formForTransfer: FormGroup = new FormGroup({});

  constructor(
    private _teenService: TeenService,
    private _operativeUnitService: OperativeUnitService,
    private _fb: FormBuilder
  ) {
    this.formForTransfer = this._fb.group({
      id_teen: [''],
      id_operativeunit: [''],
    });
  }

  ngOnInit(): void {
    this.findAllDataOperativeUnit();
    this.findAllDataTeen();
  }

  showForm() {
    this.showTransferForm = true;
  }

  findAllDataTeen() {
    this._teenService
      .finAllDataTeenActive()
      .subscribe((dataReceivedTeen: any) => {
        this.teenData = dataReceivedTeen;
      });
  }

  findAllDataOperativeUnit() {
    this._operativeUnitService
      .findAllDataOperativeUnit()
      .subscribe((dataReceivedOperativeUnit: any) => {
        this.operativeUnitData = dataReceivedOperativeUnit;
      });
  }
}
