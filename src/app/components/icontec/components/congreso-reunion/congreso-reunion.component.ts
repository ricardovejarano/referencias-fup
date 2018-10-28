import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-congreso-reunion',
  templateUrl: './congreso-reunion.component.html',
  styleUrls: ['./congreso-reunion.component.css']
})
export class CongresoReunionComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  ejemplo = 'CONGRESO INTERNACIONAL DEL BARROCO IBEROAMERICANO. (3: 8-12, octubre, 2001: Sevilla, España). Memorias. Sevilla: Universidad Pablo de Olavide, 2001. 130 p.';
  congreso = '';
  ciudad = '';
  pais = '';
  titulo = '';
  numero = 0;
  editorial = '';
  anioPublicacion = '';
  fechaPublicacion = '';
  dia1 = '';
  dia2 = '';
  fechaCitaMes = '';
  fechaCitaAnio = '';
  paginas = '';
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

    if (this.congreso) {
      this.referenciaFinal += this.congreso.toUpperCase() + '. ';
    }

    if (this.numero) {
      this.referenciaFinal += ' (' + this.numero + ': ';
    }

    if (this.dia1) {
      this.referenciaFinal += this.dia1 + '-';
    }

    if (this.dia2) {
      this.referenciaFinal += this.dia2 + ', ';
    }

    if (this.fechaCitaMes) {
      this.referenciaFinal +=  this.fechaCitaMes + ', ';
    }

    if (this.fechaCitaAnio) {
      this.referenciaFinal += this.fechaCitaAnio + ': ';
    }

    if (this.ciudad) {
      this.referenciaFinal += this.ciudad + ', ';
    }
    if (this.pais) {
      this.referenciaFinal += this.pais + '). ';
    }

    if (this.titulo) {

      this.referenciaFinal += this.titulo + '. ';
    }

    if (this.ciudad) {
      this.referenciaFinal += this.ciudad + ': ';
    }

    if (this.editorial) {
      this.referenciaFinal += this.editorial + ', ' + this.fechaCitaAnio + '. ';
    }

    if (this.paginas) {
      this.referenciaFinal += this.paginas + ' p.';
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
