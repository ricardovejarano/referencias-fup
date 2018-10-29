import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sitio-web',
  templateUrl: './sitio-web.component.html',
  styleUrls: ['./sitio-web.component.css']
})
export class SitioWebComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  ejemplo = 'Medina, O. (26 septiembre, 2014). Anarquismo y leyes justas [Mensaje en un blog]. Recuperado de http://www.jotdown.es/2014/09 /anarquismo-leyes-justas/.';
  nombre = '';
  apellido = '';
  titulo = '';
  url = '';
  descripcion = '';
  fechaCitaDia = '';
  fechaCitaMes = '';
  fechaCitaAnio = '';
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
        this.referenciaFinal += this.apellidos[z].value + ', ';
      }
      if (this.nombres[z].value) {
        if (z !== (this.nombres.length - 1) && this.nombres.length !== 1) {
          this.referenciaFinal += this.nombres[z].value[0] + this.nombres[z].value.substr(1) + ', ';
        } else {
          this.referenciaFinal += this.nombres[z].value[0] + this.nombres[z].value.substr(1) + '. ';
        }
      }
    }

    if (this.fechaCitaDia) {
      this.referenciaFinal += '(' + this.fechaCitaDia;
    }

    if (this.fechaCitaMes) {
      this.referenciaFinal += ' ' + this.fechaCitaMes + ', ';
    }

    if (this.fechaCitaAnio) {
      this.referenciaFinal += this.fechaCitaAnio + '). ';
    }

    if (this.titulo) {
      this.referenciaFinal += this.titulo + ' ';
    }

    if (this.descripcion) {
      this.referenciaFinal += '[' + this.descripcion + ']. ';
    }

    if (this.url) {
      this.referenciaFinal += 'Recuperado de ' + this.url + '.';
    }
  }

  resetForm(validForm?: NgForm) {
    if (validForm != null) {
      validForm.reset();
    }
  }

  copyInputMessage(inputElement) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }
}
