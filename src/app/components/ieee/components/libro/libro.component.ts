import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css']
})
export class LibroComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  ejemplo = 'G. F. Knoll. Radiation detection and measurement, 4th ed. Hoboken (N.J.): John Wiley & Sons, 2010.';
  nombre = '';
  apellido = '';
  titulo = '';
  ciudad = '';
  editorial = '';
  edicion = '';
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
      if (this.nombres[z].value) {
          this.referenciaFinal += this.nombres[z].value.toUpperCase() + '. ';
      }
      if (this.apellidos[z].value) {
        if (z !== (this.apellidos.length - 1) && this.apellidos.length !== 1) {
          this.referenciaFinal += this.apellidos[z].value[0].toUpperCase() + this.apellidos[z].value.substr(1).toLocaleLowerCase() + ', ';
        } else {
        this.referenciaFinal += this.apellidos[z].value[0].toUpperCase() + this.apellidos[z].value.substr(1).toLocaleLowerCase() + '. ';
        }
      }
    }

    if (this.titulo) {
      this.referenciaFinal += this.titulo + ', ';
    }

    if (this.edicion) {
      this.referenciaFinal += this.edicion + '. ';
    }

    if (this.ciudad) {
      this.referenciaFinal += this.ciudad + ': ';
    }

    if (this.editorial) {
      this.referenciaFinal += this.editorial + ', ';
    }

    if (this.anioPublicacion) {
      this.referenciaFinal += this.anioPublicacion + '.';
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
