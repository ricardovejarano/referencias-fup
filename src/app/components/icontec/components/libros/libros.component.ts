import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
export class LibrosIcontecComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  ejemplo = 'LOPEZ CASTAÑO. Hugo. El comportamiento de la oferta. Bogota: escala, 2000. 129p.';
  nombre = '';
  apellido = '';
  titulo = '';
  subtitulo = '';
  edicion = '';
  ciudad = '';
  editorial = '';
  paginas = '';
  anioPublicacion = 0;
  userRegister = false;

  anio = [];

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
    if (this.apellido) {
      this.referenciaFinal += this.apellido.toUpperCase() + ', ';
    }
    if (this.nombre) {
      // return word[0].toUpperCase() + word.substr(1).toLowerCase();
      this.referenciaFinal += this.nombre[0].toUpperCase() + this.nombre.substr(1).toLocaleLowerCase() + '. ';
    }

    if (this.titulo && this.subtitulo) {
      this.referenciaFinal +=  this.titulo + ': ' + this.subtitulo + '. ';
    } else {
      this.referenciaFinal +=  this.titulo + '. ';
    }

    if (this.edicion) {
      this.referenciaFinal +=  this.edicion + '. ';
    }

    if (this.ciudad) {
      this.referenciaFinal +=  this.ciudad + ': ';
    }

    if (this.editorial) {
      this.referenciaFinal +=  this.editorial + ', ';
    }

    if (this.anioPublicacion) {
      this.referenciaFinal +=  this.anioPublicacion + '. ';
    }

    if (this.paginas) {
      this.referenciaFinal +=  this.paginas + 'p.';
    }

  }

  copyInputMessage(inputElement) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }
}
