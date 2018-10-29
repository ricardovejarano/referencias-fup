import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-revista',
  templateUrl: './revista.component.html',
  styleUrls: ['./revista.component.css']
})
export class RevistaComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  ejemplo = 'Mankiw, N. G. (2014). Macroeconomía. Barcelona: Antoni Bosch.';
  nombre = '';
  apellido = '';
  titulo = '';
  tituloRevista = '';
  volumen = 0;
  numero = 0;
  paginasInicio = '';
  paginasFin = '';
  anioPublicacion = 0;


  userRegister = false;

  anio = [];

  nombres = [{ value: '' }];
  apellidos = [{ value: '' }];

  referenciaFinal = '';

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
          this.referenciaFinal += this.nombres[z].value[0] + this.nombres[z].value.substr(1) + '. ';
        } else {
          this.referenciaFinal += this.nombres[z].value[0] + this.nombres[z].value.substr(1) + '. ';
        }
      }
    }

    if (this.anioPublicacion) {
      this.referenciaFinal += '(' + this.anioPublicacion + '). ';
    }

    if (this.titulo) {
      this.referenciaFinal += this.titulo + '. ';
    }

    if (this.tituloRevista) {
      this.referenciaFinal += this.tituloRevista + ', ';
    }

    if (this.volumen) {
      this.referenciaFinal += this.tituloRevista;
    }
    if (this.numero) {
      this.referenciaFinal += '('  + this.numero + '), ';
    }

    if (this.paginasInicio) {
      this.referenciaFinal += 'pp. '  + this.paginasInicio + '-';
    }

    if (this.paginasInicio) {
      this.referenciaFinal += + this.paginasInicio + '.';
    }

  }

  copyInputMessage(inputElement) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

  resetForm(validForm?: NgForm) {
    if (validForm != null) {
      validForm.reset();
    }
  }
}
