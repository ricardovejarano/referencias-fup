import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-articulo-revista',
  templateUrl: './articulo-revista.component.html',
  styleUrls: ['./articulo-revista.component.css']
})
export class ArticuloRevistaIcontecComponent implements OnInit {
  autor = '';
  // tslint:disable-next-line:max-line-length
  ejemplo = 'FLECHA, Ramón. H. Giroux o la solidaridad. En: Cuadernos de pedagogía. Vol.; 2. No 198 (Ago-Sep.1991); p. 15-20.';
  nombre = '';
  apellido = '';
  titulo = '';
  nombreRevista = '';
  volumen = '';
  fechaPublicacion = '';
  fechaCitaDia = '';
  fechaCitaMes = '';
  fechaCitaAnio = '';
  disponibilidad = '';
  anioRevista = '';
  referenciaFinal = '';
  numeroRevista = '';
  userRegister = false;
  paginaInicial = '';
  paginaFinal = '';
  mesRevista = '';
  mes2Revista = '';

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
        if (z === (this.nombres.length - 1)) {
          this.referenciaFinal += '.';
        }
      }
    }

    if (this.titulo) {
      this.referenciaFinal += ' ' + this.titulo + '.';
    }

    if (this.nombreRevista) {
      this.referenciaFinal += ' En: ' + this.nombreRevista + '.';
    }

    if (this.volumen) {
      this.referenciaFinal += ' Vol. ' + this.volumen + '.';
    }

    if (this.numeroRevista) {
      this.referenciaFinal += ' No ' + this.numeroRevista;
    }

    if (this.mesRevista) {
      this.referenciaFinal += ' (' + this.mesRevista;
    }

    if (this.mes2Revista) {
      this.referenciaFinal += '-' + this.mes2Revista + '.';
    } else {
      this.referenciaFinal += '.';
    }

    if (this.anioRevista) {
      this.referenciaFinal += ' ' + this.anioRevista + ')';
    } else {
      this.referenciaFinal += ')';
    }

    if (this.paginaInicial) {
      this.referenciaFinal += '; p. ' + this.paginaInicial;
    }

    if (this.paginaFinal) {
      this.referenciaFinal += '-' + this.paginaInicial + '.';
    } else {
      this.referenciaFinal += '.';
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
