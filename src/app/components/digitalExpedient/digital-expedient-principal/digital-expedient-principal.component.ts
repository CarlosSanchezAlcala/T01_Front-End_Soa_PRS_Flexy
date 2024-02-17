import {ChangeDetectorRef, Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SheetService} from "../../component-funcionality/services/sheets/sheet.service";

interface CodigoToPalabraMapping {
  [codigo: string]: string;
}

@Component({
  selector: 'app-digital-expedient-principal',
  templateUrl: './digital-expedient-principal.component.html',
  styleUrls: ['./digital-expedient-principal.component.scss']
})
export class DigitalExpedientPrincipalComponent {

  dataBD: any;
  dataANX1E: any;
  dataANX1: any;
  dataINFPI: any;
  dataANX00: any;
  searchTerm: string = '';
  showResults: boolean = false;
  showNewSearchButton: boolean = false;
  showFilter: boolean = false;
  filterFlag: string = "A";


  selectedExpediente: string = '';
  showTable: boolean = false;
  dataExp: any;

  codigoToPalabra: CodigoToPalabraMapping = {
    'ANX00': 'FICHA DE INGRESO',
    'ANX01': 'ACTA DE COMPROMISO DE INSCRIPCIÓN',
    'ANX1B': 'ACTA DE COMPROMISO POR INCUMPLIMIENTO',
    'ANX1C': 'ACTA DE CONOCIMIENTO DEL PLAN DE TRATAMIENTO INDIVIDUAL',
    'ANX1E': 'ACTA DE COMPROMISO E INSCRIPCIÓN “PROGRAMA DE ESCUELA DE PADRES”',
    'ANX0A': 'ACTA DE COMPROMISO DEL ADOLESCENTE Y SUS PADRES',
    'ANX0B': 'CONSTANCIA DE VISITA DOMICILIARIA',
    'ANX05': 'SERVICIO DE ORIENTACIÓN AL ADOLESCENTE SOA CAÑETE - CITACIÓN',
    'ANX02': 'EVALUCIÓN DEL RIESGO DE VIOLENCIA EN JÓVENES (SAVRY)',
    'HCR20': 'HOJA DE CODIFICACIÓN (HCR20)',
    'ANX04': 'FICHA PSICOSOCIAL',
    'ANX1D': 'ACTA DE CONOCIMIENTO DE MODIFICACION DEL PLAN DE TRATAMIENTO INDIVIDAL',
    'INFPI': 'INFORME DE PLAN INDIVIDUAL',
    'INFSG': 'INFORME DE SEGUIMIENTO',
    'INFII': 'INFORME DE INCUMPLIMIENTO',
    'INFIC': 'INFORME DE INCIDENCIA',
    'INFIF': 'INFORME FINAL',
  };

  title = 'flexy-angular';
  constructor(private cdr: ChangeDetectorRef, private http: HttpClient, private service: SheetService) { }

  ngOnInit(): void { }
  cambiarFiltro(): void {
    this.nuevaBusqueda();
  }

  realizarBusqueda(): void {
    if (this.searchTerm.length === 8) {
      this.service.getInfoFlag(parseInt(this.searchTerm, 10), this.filterFlag).subscribe({
        next: (sheetData) => {
          console.log(sheetData);
          this.dataBD = sheetData;
          this.cdr.detectChanges();

          this.service.getSheetDataByIdANX1E(parseInt(this.searchTerm, 10)).subscribe({
            next: (sheetData) => {
              console.log(sheetData);
              this.dataANX1E = sheetData;
              this.cdr.detectChanges();
            }
          })

          this.service.getSheetDataByIdANX1(parseInt(this.searchTerm, 10)).subscribe({
            next: (sheetData) => {
              console.log(sheetData);
              this.dataANX1 = sheetData;
              this.cdr.detectChanges();
            }
          })

          this.service.getSheetDataByIdINFPI(parseInt(this.searchTerm, 10)).subscribe({
            next: (sheetData) => {
              console.log(sheetData);
              this.dataINFPI = sheetData;
              this.cdr.detectChanges();
            }
          })

          this.service.getSheetDataByIdANX00(parseInt(this.searchTerm, 10)).subscribe({
            next: (sheetData) => {
              console.log(sheetData);
              this.dataANX00 = sheetData;
              this.selectedExpediente = '';
              this.cdr.detectChanges();
            }
          })

          this.showResults = true;
          this.showNewSearchButton = true;
          this.showFilter = true;
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      this.showResults = false;
      this.showNewSearchButton = false;
      this.showFilter = false;
      this.dataBD = [];
    }
  }

  // Nueva Búsqueda de DNI
  nuevaBusqueda(): void {
    this.searchTerm = '';
    this.showResults = false;
    this.showNewSearchButton = false;
    this.showFilter = false;
    this.selectedExpediente = '';
    this.dataExp = [];
    this.dataBD = [];
  }

  // Eliminar | Restaurar
  contextMenu(event: MouseEvent, id: number, tipo: string): void {
    event.preventDefault();

    if (this.filterFlag === 'A') {
      const choice = window.confirm(`¿Desea eliminar el ${tipo} N° ${id}?`);

      if (choice) {
        const flagToDelete = 'I';

        this.service.updateStatus(tipo, id, flagToDelete).subscribe({
          next: (updateResponse) => {
            console.log('Eliminación lógica realizada:', updateResponse);
            this.seleccionarExpediente();
          },
          error: (updateError) => {
            console.error('Error al intentar eliminar lógicamente:', updateError);
          }
        });
      }
    } else if (this.filterFlag === 'I') {
      const choice = window.confirm(`¿Desea restaurar el ${tipo} N° ${id}?`);

      if (choice) {
        const flagToRestore = 'A';

        this.service.updateStatus(tipo, id, flagToRestore).subscribe({
          next: (updateResponse) => {
            console.log('Restauración realizada:', updateResponse);
            this.seleccionarExpediente();
          },
          error: (updateError) => {
            console.error('Error al intentar restaurar:', updateError);
          }
        });
      }
    }
  }

  // Tipo De Riesgo
  getColorForRiesgo(riesgo: string): string {
    switch (riesgo) {
      case 'BAJO':
        return 'lightgreen';
      case 'MODERADO':
        return 'khaki';
      case 'ALTO':
        return 'lightcoral';
      default:
        return 'transparent';
    }
  }




  // NUEVA LOGICA A USAR
  busquedaNueva(): void {
    if (this.searchTerm.length === 8) {

      this.service.getSheetDataByBD(parseInt(this.searchTerm, 10)).subscribe({
        next: (expediente) => {
          console.log(expediente);
          this.dataExp = expediente;
          this.cdr.detectChanges();
        }
      });

      this.showFilter = true;
      this.showNewSearchButton = true;
      this.showResults = true;
      this.showTable = true;

    } else {
      this.showResults = false;
      this.showNewSearchButton = false;
      this.showFilter = false;
      this.dataBD = [];
    }
  }

  seleccionarExpediente(): void {
    this.service.getFilterExpediente(parseInt(this.searchTerm, 10), this.filterFlag, this.selectedExpediente).subscribe({
      next: (sheetData) => {
        console.log(sheetData);
        this.dataBD = sheetData;
        this.showTable = true;
        this.cdr.detectChanges();
      }
    })
  }

}
