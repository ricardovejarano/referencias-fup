import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-capitulo-libro',
  templateUrl: './capitulo-libro.component.html',
  styleUrls: ['./capitulo-libro.component.css']
})
export class CapituloLibroComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  ejemplo = 'Pedrós Esteban, A. (2008). Sostenibilidad ciudadana. En Diálogos urbanos (pp.265-278). Valencia: Universidad Politécnica de Valencia.';
  nombre = '';
  apellido = '';
  tituloCapitulo = '';
  tituloLibro = '';
  ciudad = '';
  editorial = '';
  paginaInicial = 0;
  paginaFinal = 0;
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
          this.referenciaFinal += this.nombres[z].value[0] + this.nombres[z].value.substr(1) + ', ';
        } else {
          this.referenciaFinal += this.nombres[z].value[0] + this.nombres[z].value.substr(1) + '. ';
        }
      }
    }

    if (this.anioPublicacion) {
      this.referenciaFinal += '(' + this.anioPublicacion + '). ';
    }

    if (this.tituloCapitulo) {
      this.referenciaFinal += this.tituloCapitulo + '. ';
    }

    if (this.tituloLibro) {
      this.referenciaFinal += 'En ' + this.tituloLibro + ': ';
    }

    if (this.paginaInicial) {
      this.referenciaFinal += '(pp.' + this.paginaInicial;
    }

    if (this.paginaFinal) {
      this.referenciaFinal += '-' + this.paginaFinal + ').';
    }

    if (this.ciudad) {
      this.referenciaFinal += this.ciudad + ': ';
    }
    if (this.editorial) {
      this.referenciaFinal += this.editorial + '.';
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
