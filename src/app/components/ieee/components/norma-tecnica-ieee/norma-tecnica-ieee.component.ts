import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-norma-tecnica-ieee',
  templateUrl: './norma-tecnica-ieee.component.html',
  styleUrls: ['./norma-tecnica-ieee.component.css']
})
export class NormaTecnicaIeeeComponent implements OnInit {

  ejemplo = 'Letter Symbols for Quantities, ANSI Standard Y10.5-1968.';
  titulo = '';
  numero = 0;
  organismo = '';
  anioPublicacion = 0;
  anio = [];
  userRegister = false;

  referenciaFinal = '';

  constructor() { }

  ngOnInit() {
    this.getArray();
  }


  getArray() {

    for (let x = 1940; x < 2020; x++) {
      this.anio.push(x);
    }
  }

  addReference() {
    this.referenciaFinal = '';


    if (this.titulo) {
      this.referenciaFinal += this.titulo + ', ';
    }

    if (this.organismo) {
      this.referenciaFinal += this.organismo;
    }

    if (this.numero) {
      this.referenciaFinal += ' '  + this.numero;
    }

    if (this.anioPublicacion) {
      this.referenciaFinal += '-' + this.anioPublicacion + '.';
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
