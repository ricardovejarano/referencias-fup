import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-periodicos',
  templateUrl: './periodicos.component.html',
  styleUrls: ['./periodicos.component.css']
})
export class PeriodicosComponent implements OnInit {

// tslint:disable-next-line:max-line-length
ejemplo = 'Aunión, J.A. (24 octubre, 2017). Una enciclopedia visual del turismo en Madrid. El País, p.B5';
nombre = '';
apellido = '';
titulo = '';
paginaInicial = '';
paginaFinal = '';
periodico = '';
fechaCitaDia = '';
fechaCitaMes = '';
fechaCitaAnio = '';
referenciaFinal = '';
userRegister = false;

// Arrays para Fecha
mes = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre',
  'noviembre', 'diciembre'];
dia = [];
anio = [];
anioCita = [2015, 2016, 2017, 2018, 2019, 2020, 2021];


nombres = [{ value: '' }];
apellidos = [{ value: '' }];


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

  if (this.fechaCitaDia) {
    this.referenciaFinal += '(' + this.fechaCitaDia;
  }

  if (this.fechaCitaMes) {
    this.referenciaFinal += ' ' + this.fechaCitaMes + ', ';
  }

  if (this.fechaCitaAnio) {
    this.referenciaFinal += this.fechaCitaAnio + '). ';
  }

  if (this.titulo) {
    this.referenciaFinal += this.titulo + '. ';
  }

  if (this.periodico) {
    this.referenciaFinal +=  + this.periodico + ', ';
  }

  if (this.paginaInicial ) {
    this.referenciaFinal += 'p.' + this.paginaInicial;
  }

  if (this.paginaFinal ) {
    this.referenciaFinal += '-' + this.paginaFinal + '.';
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
