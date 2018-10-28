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
  userRegister = false;

  // Arrays para Fecha
  mes = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre',
    'noviembre', 'diciembre'];
  dia = [];
  anio = [];
  anioCita = [2015, 2016, 2017, 2018, 2019, 2020, 2021];


  nombres = [{ value: '' }];
  apellidos = [{ value: '' }];


  constructor() { }

  ngOnInit() {
    this.getArray();
  }

  addAuthor() {
    this.nombres.push({ value: '' });
    this.apellidos.push({ value: '' });
  }

  quitAuthor(index) {
    this.nombres.splice(index, 1);
    this.apellidos.splice(index, 1);
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

    for (let z = 0; z < this.nombres.length; z++) {
      if (this.apellidos[z].value) {
        if (z !== 0) {
          this.referenciaFinal += ', ';
        }
        this.referenciaFinal += this.apellidos[z].value.toUpperCase() + ', ';
      }
      if (this.nombres[z].value) {
        // return word[0].toUpperCase() + word.substr(1).toLowerCase();
        this.referenciaFinal += this.nombres[z].value[0].toUpperCase() + this.nombres[z].value.substr(1).toLocaleLowerCase();
      }
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
      if (!this.fechaCitaDia) {
        this.referenciaFinal += ' {';
      }
      this.referenciaFinal += ' ' + this.fechaCitaMes;
      if (!this.fechaCitaAnio) {
        this.referenciaFinal += '}';
      }
    }

    if (this.fechaCitaAnio) {
      if (!this.fechaCitaDia && !this.fechaCitaMes) {
        this.referenciaFinal += '{';
      }
      if (this.fechaCitaDia || this.fechaCitaMes) {
        this.referenciaFinal += ' de';
      }
      this.referenciaFinal += ' ' + this.fechaCitaAnio + '}';
    }

    this.referenciaFinal += ' disponiible en: ' + '(' + this.disponibilidad + ')';
  }

  clear() {
    this.nombre = '';
    this.apellido = '';
    this.titulo = '';
    this.medioElectronico = '';
    this.edicion = '';
    this.fechaPublicacion = '';
    this.fechaCitaDia = '';
    this.fechaCitaMes = '';
    this.fechaCitaAnio = '';
    this.disponibilidad = '';
    this.referenciaFinal = '';
    this.nombres = [{ value: '' }];
    this.apellidos = [{ value: '' }];
  }

  copyInputMessage(inputElement) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

}
