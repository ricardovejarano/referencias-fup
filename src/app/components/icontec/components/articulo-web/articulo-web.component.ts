import { Component, OnInit } from '@angular/core';
import { format } from 'url';

@Component({
  selector: 'app-articulo-web',
  templateUrl: './articulo-web.component.html',
  styleUrls: ['./articulo-web.component.css']
})
export class ArticuloWebIcontecComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  ejemplo = 'MARQUEZ DE MELO, José “Comunicación e integración latinoamericana: El papel de ALAIC”. {En línea}. {10 julio de 2008} disponible en: (www.mty.itsem.mx/externos/alaic/texto1html).';
  nombre = '';
  apellido = '';
  titulo = '';
  medioElectronico = '';
  edicion = '';
  fechaPublicacion = '';
  fechaCitaDia = '';
  fechaCitaMes = '';
  fechaCitaAnio = '';
  disponibilidad = '';
  referenciaFinal = '';

  // Arrays para Fecha
  mes = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre',
    'noviembre', 'diciembre'];
  dia = [];
  anio = [];


  constructor() { }

  ngOnInit() {
    this.getArray();
  }

  getArray() {
    for (let y = 1; y < 32; y++) {
      this.dia.push(y);
    }

    for (let x = 1940; x < 2020; x++) {
      this.anio.push(x);
    }
  }

  addReference() {
    this.referenciaFinal = '';
    if (this.apellido) {
      this.referenciaFinal += this.apellido.toUpperCase() + ', ';
    }
    if (this.nombre) {
      // return word[0].toUpperCase() + word.substr(1).toLowerCase();
      this.referenciaFinal += this.nombre[0].toUpperCase() + this.nombre.substr(1).toLocaleLowerCase();
    }

    if (this.titulo) {
      this.referenciaFinal += ' “' + this.titulo + '”.';
    }

    if (this.medioElectronico) {
      this.referenciaFinal += ' {' + this.medioElectronico + '}.';
    }

    if (this.edicion) {
      this.referenciaFinal += ' ' + this.edicion + '.';
    }

    if (this.fechaPublicacion) {
      this.referenciaFinal += ' ' + this.fechaPublicacion + '.';
    }

    if (this.fechaCitaDia) {
      this.referenciaFinal += ' {' + this.fechaCitaDia;
    }

    if (this.fechaCitaMes) {
      if (this.fechaCitaDia) {
        this.referenciaFinal += ' {';
      }
      this.referenciaFinal += ' {' + this.fechaCitaMes + '}';
    }

    if (this.fechaCitaAnio) {
      this.referenciaFinal += ' {' + this.fechaCitaAnio + '}';
    }

    this.referenciaFinal += ' disponiible en: ' + '(' + this.disponibilidad + ')';
  }

  copyInputMessage(inputElement) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

}
