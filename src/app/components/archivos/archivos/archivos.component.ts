import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { TeenService } from '../../component-funcionality/services/teen/teen.service';
import { HttpClient } from '@angular/common/http';

interface CodigoToPalabraMapping {
  [codigo: string]: string;
}

@Component({
  selector: 'app-archivos',
  templateUrl: './archivos.component.html',
  styleUrls: ['./archivos.component.scss']
})
export class ArchivosComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }

  filteredData: any;
  searchTerm: string = '';
  showResults: boolean = false;
  showDocumentsPopup: boolean = false;
  resultadoEspecifico: any;

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

  constructor(private _dialog: MatDialog, private _fbService: TeenService, private http: HttpClient, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if (this.data && this.data.dni) {
      this.searchTerm = this.data.dni;
      this.actualizarTabla(); // Llama a actualizarTabla en lugar de realizarBusqueda en la inicialización
    }
  }

  actualizarTabla(): void {
    this._fbService.getData().subscribe((response) => {
      this.data = response;

      // Realiza la búsqueda después de obtener los datos
      this.realizarBusqueda();
    });
  }

  realizarBusqueda(): void {
    if (this.data && Array.isArray(this.data)) { // Asegura que this.data sea un array
      if (this.searchTerm.length === 8) {
        this.filteredData = this.data.filter((item: any) =>
          item.dni.includes(this.searchTerm)
        );

        // Verificar si hay resultados después de la búsqueda
        if (this.filteredData.length > 0) {
          // Tomar el primer resultado (puedes ajustar esto según tus necesidades)
          this.resultadoEspecifico = this.filteredData[0].campo;

          // Mostrar la ventana emergente
          this.showResults = true;
          this.showDocumentsPopup = true;
        } else {
          this.showResults = false;
          this.showDocumentsPopup = false;
        }
      } else {
        this.showResults = false;
        this.showDocumentsPopup = false;
        this.filteredData = [];
      }
    } else {
      this.showResults = false;
      this.showDocumentsPopup = false;
      this.filteredData = [];
    }
  }

  nuevaBusqueda(): void {
    this.searchTerm = '';
    this.showResults = false;
  }

  verDocumentos(dni: string) {
    this.searchTerm = dni; // Establece searchTerm al DNI proporcionado
    this.realizarBusqueda(); // Llama a realizarBusqueda para mostrar los resultados
  }

  ocultarDocumentos(): void {
    this.showDocumentsPopup = false; // Ocultar documentos
  }

}
