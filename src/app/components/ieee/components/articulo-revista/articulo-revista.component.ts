import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-articulo-revista',
  templateUrl: './articulo-revista.component.html',
  styleUrls: ['./articulo-revista.component.css']
})
export class ArticuloRevistaComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  ejemplo = 'C.L. Kotropoulos, "Source phone identification using sketches of features", IET Biometrics, vol. 3, n.º 2, pp.75-83, jun. 2014. [En línea]. Disponible en: http://dx.doi.org/10.1049/iet-bmt.2013.0056. Acceso: mayo 2016.';
  nombre = '';
  apellido = '';
  titulo = '';
  tituloRevista = '';
  volumen = '';
  numero = '';
  paginaInicial = 0;
  paginaFinal = 0;
  url = '';

  fechaCitaMes = '';
  fechaCitaAnio = '';
  fechaAccesoMes = '';
  fechaAcessoAnio = '';

  userRegister = false;

  // Arrays para Fecha
  mes = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre',
    'noviembre', 'diciembre'];
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

    if (this.tituloRevista) {
      this.referenciaFinal += this.tituloRevista + ', ';
    }

    if (this.volumen) {
      this.referenciaFinal += this.volumen + ', ';
    }

    if (this.numero) {
      this.referenciaFinal += this.numero + ', ';
    }

    if (this.paginaInicial) {
      this.referenciaFinal += 'pp.' + this.paginaInicial + '-';
    }

    if (this.paginaFinal) {
      this.referenciaFinal += this.paginaFinal + ', ';
    }

    if (this.fechaCitaMes) {
      this.referenciaFinal += this.fechaCitaMes + '. ';
    }

    if (this.fechaCitaAnio) {
      this.referenciaFinal += this.fechaCitaAnio + '. ';
    }

    if (this.url) {
      this.referenciaFinal += '[En línea]. Disponible en: ' + this.url + '. ';
    }

    if (this.fechaAccesoMes) {
      this.referenciaFinal += 'Acceso: ' + this.fechaAccesoMes + ' ';
    }

    if (this.fechaAcessoAnio) {
      this.referenciaFinal +=  this.fechaAcessoAnio + '.';
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
