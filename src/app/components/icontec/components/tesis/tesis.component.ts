import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-tesis',
  templateUrl: './tesis.component.html',
  styleUrls: ['./tesis.component.css']
})
export class TesisIcontecComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  ejemplo = 'BERRQUET MARIMON, Félix. Experiencia de iniciaciones cultura investigativa con estudiantes de pregrado desde un semillero de investigación. Medellín, 2007, 117p. Trabajo de investigación (magíster en educación con énfasis en pedagogía y diversidad cultural). Universidad de Antioquia. Facultad de educación.';
  nombre = '';
  apellido = '';
  titulo = '';
  tgTitulo = '';
  universidad = '';
  ciudad = '';
  departamento = '';
  paginas = '';
  facultad = '';
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
        this.referenciaFinal += this.apellidos[z].value.toUpperCase() + ', ';
      }
      if (this.nombres[z].value) {
        if (z !== (this.nombres.length - 1) && this.nombres.length !== 1) {
          this.referenciaFinal += this.nombres[z].value[0].toUpperCase() + this.nombres[z].value.substr(1).toLocaleLowerCase() + ', ';
        } else {
          this.referenciaFinal += this.nombres[z].value[0].toUpperCase() + this.nombres[z].value.substr(1).toLocaleLowerCase() + '. ';
        }
      }
    }

    if (this.titulo ) {
      this.referenciaFinal += this.titulo + '. ';
    }

    if (this.ciudad) {
      this.referenciaFinal += this.ciudad + ', ';
    }


    if (this.anioPublicacion) {
      this.referenciaFinal += this.anioPublicacion + ', ';
    }

    if (this.paginas) {
      this.referenciaFinal += this.paginas + 'p. ';
    }

    if (this.tgTitulo) {
      this.referenciaFinal += this.tgTitulo + '. ';
    }

    if (this.universidad) {
      this.referenciaFinal += this.universidad + '. ';
    }

    if (this.facultad) {
      this.referenciaFinal += this.facultad + '. ';
    }

    if (this.departamento) {
      this.referenciaFinal += this.departamento + '. ';
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
