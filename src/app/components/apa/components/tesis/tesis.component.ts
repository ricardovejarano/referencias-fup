import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-tesis',
  templateUrl: './tesis.component.html',
  styleUrls: ['./tesis.component.css']
})
export class TesisComponent implements OnInit {
  // tslint:disable-next-line:max-line-length
  ejemplo = 'Aponte, L, & Cardona, C. (2009). Educación ambiental y evaluación de la densidad poblacional para la conservación de los cóndores reintroducidos en el Parque Nacional Natural Los Nevados y su zona amortiguadora (tesis de pregrado). Universidad de Caldas, Manizales, Colombia.';
  nombre = '';
  apellido = '';
  titulo = '';
  tipoTesis = '';
  institucion = '';
  ciudad = '';
  pais = '';

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
        this.referenciaFinal += this.apellidos[z].value.toUpperCase() + '. ';
      }
      if (this.nombres[z].value) {
        if (z !== (this.nombres.length - 1) && this.nombres.length !== 1) {
          this.referenciaFinal += this.nombres[z].value[0].toUpperCase() + this.nombres[z].value.substr(1).toLocaleLowerCase() + ', & ';
        } else {
          this.referenciaFinal += this.nombres[z].value[0].toUpperCase() + this.nombres[z].value.substr(1).toLocaleLowerCase() + '. ';
        }
      }
    }

    if (this.anioPublicacion) {
      this.referenciaFinal += '(' + this.anioPublicacion + '). ';
    }

    if (this.titulo) {
      this.referenciaFinal += this.titulo;
    }


    if (this.tipoTesis) {
      this.referenciaFinal += ' (' + this.tipoTesis + ')';
    }

    if (this.institucion) {
      this.referenciaFinal += '. ' + this.institucion + ', ';
    }

    if (this.ciudad) {
      this.referenciaFinal += this.ciudad + ', ';
    }

    if (this.pais) {
      this.referenciaFinal += this.pais + '. ';
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
