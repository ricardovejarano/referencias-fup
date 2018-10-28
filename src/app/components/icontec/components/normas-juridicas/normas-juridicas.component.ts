import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-normas-juridicas',
  templateUrl: './normas-juridicas.component.html',
  styleUrls: ['./normas-juridicas.component.css']
})
export class NormasJuridicasComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  ejemplo = 'COLOMBIA. MINISTERIO DE DESARROLLO ECONÓMICO. Decreto 2269 (16, noviembre, 1993). Por el cual se organiza el sistema de normalización, certificación y metrología. Bogotá D.C.: El Ministerio, 1993. 18 p.';
  jurisdiccion = '';
  autorCorporativo = '';
  designacion = '';
  fechaNormaDia = '';
  fechaNormaMes = '';
  fechaNormaAnio = '';
  nombreNorma = '';
  tituloPublicacion = '';
  lugarPublicacion = '';
  anioPublicacion = '';
  numero = '';
  userRegister = false;
  paginaInicial = '';
  paginaFinal = '';
  referenciaFinal = '';

  // Arrays para Fecha
  mes = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre',
    'noviembre', 'diciembre'];
  dia = [];
  anio = [];
  anioCita = [2015, 2016, 2017, 2018, 2019, 2020, 2021];


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


    if (this.jurisdiccion) {
      this.referenciaFinal += this.jurisdiccion.toUpperCase() + '.';
    }

    if (this.autorCorporativo) {
      this.referenciaFinal += ' ' + this.autorCorporativo.toUpperCase() + '.';
    }

    if (this.designacion) {
      //  word[0].toUpperCase() + word.substr(1).toLowerCase();
      this.referenciaFinal += ' ' + this.designacion[0].toUpperCase() + this.designacion.substr(1).toLowerCase();
    }

    if (this.fechaNormaDia) {
      this.referenciaFinal += ' (' + this.fechaNormaDia;
    }

    if (this.fechaNormaMes) {
      this.referenciaFinal += ', ' + this.fechaNormaMes;
    }

    if (this.fechaNormaAnio) {
      this.referenciaFinal += ' ,' + this.fechaNormaAnio + ').';
    }

    if (this.nombreNorma) {
      this.referenciaFinal += ' ' + this.nombreNorma + '.';
    }

    if (this.tituloPublicacion) {
      this.referenciaFinal += ' ' + this.tituloPublicacion + '.';
    }

    if (this.lugarPublicacion) {
      this.referenciaFinal += ' ' + this.lugarPublicacion;
    }

    if (this.anioPublicacion) {
      this.referenciaFinal += ', ' + this.anioPublicacion + '.';
    }

    if (this.paginaInicial) {
      this.referenciaFinal += ' ' + this.paginaInicial;
    }

    if (this.paginaFinal) {
      this.referenciaFinal += '-' + this.paginaFinal + ' p.';
    } else {
      this.referenciaFinal += ' p.';
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
