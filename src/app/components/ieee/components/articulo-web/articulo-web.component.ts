import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-articulo-web',
  templateUrl: './articulo-web.component.html',
  styleUrls: ['./articulo-web.component.css']
})
export class ArticuloWebComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  ejemplo = 'G. Peris Ripollés, "Acertando quinielas con redes neuronales", Naukas, 09-12-2015. [En línea]. Disponible en: http://naukas.com/2015/12/09/acertando-quinielas-redes-neuronales/.';
  nombre = '';
  apellido = '';
  titulo = '';
  tituloWeb = '';
  url = '';
  fechaCitaDia = '';
  fechaCitaMes = '';
  fechaCitaAnio = '';
  userRegister = false;

  // Arrays para Fecha
  mes = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre',
    'noviembre', 'diciembre'];
  dia = [];
  anio = [];
  anioCita = [2015, 2016, 2017, 2018, 2019, 2020, 2021];

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
      if (this.nombres[z].value) {
          this.referenciaFinal += this.nombres[z].value.toUpperCase() + '. ';
      }
      if (this.apellidos[z].value) {
          this.referenciaFinal += this.apellidos[z].value[0].toUpperCase() + this.apellidos[z].value.substr(1).toLocaleLowerCase() + ', ';
      }
    }

    if (this.titulo) {
      this.referenciaFinal += '"' + this.titulo + '", ';
    }

    if (this.tituloWeb) {
      this.referenciaFinal += this.tituloWeb + ', ';
    }

    if (this.fechaCitaDia) {
      this.referenciaFinal += this.fechaCitaDia + '-';
    }
    if (this.fechaCitaMes) {
      this.referenciaFinal += this.fechaCitaMes + '-';
    }
    if (this.fechaCitaAnio) {
      this.referenciaFinal += this.fechaCitaAnio + '. ';
    }

    if (this.url) {
      this.referenciaFinal += '[En línea]. Disponible en: ' + this.url + '. ';
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
