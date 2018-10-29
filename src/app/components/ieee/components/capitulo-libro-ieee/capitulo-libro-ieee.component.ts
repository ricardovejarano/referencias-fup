import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-capitulo-libro-ieee',
  templateUrl: './capitulo-libro-ieee.component.html',
  styleUrls: ['./capitulo-libro-ieee.component.css']
})
export class CapituloLibroIeeeComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  ejemplo = 'Itoh, "Biotransformation in ionic liquid", en Future directions in biocatalysis. Amsterdam: Elsevier Science, 2007, 3-20.';
  nombre = '';
  apellido = '';
  tituloCapitulo = '';
  tituloLibro = '';
  ciudad = '';
  editorial = '';
  edicion = '';
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
      if (this.nombres[z].value) {
        this.referenciaFinal += this.nombres[z].value.toUpperCase() + '. ';
      }
      if (this.apellidos[z].value) {
          this.referenciaFinal += this.apellidos[z].value[0].toUpperCase() + this.apellidos[z].value.substr(1).toLocaleLowerCase() + ', ';
      }
    }

    if (this.tituloCapitulo) {
      this.referenciaFinal += '"' + this.tituloCapitulo + '", ';
    }

    if (this.tituloLibro) {
      this.referenciaFinal += 'en ' + this.tituloLibro + '. ';
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
      this.referenciaFinal += this.anioPublicacion + ', ';
    }

    if (this.paginaInicial) {
      this.referenciaFinal += this.paginaInicial + '-';
    }

    if (this.paginaFinal) {
      this.referenciaFinal += this.paginaFinal + '.';
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
