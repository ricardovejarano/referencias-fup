import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-informe-tecnico',
  templateUrl: './informe-tecnico.component.html',
  styleUrls: ['./informe-tecnico.component.css']
})
export class InformeTecnicoComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  ejemplo = 'K. E. Elliott y C.M. Greene, "A local adaptive protocol," Argonne National Laboratory, Francia, Informe Técnico 916-1010-BB, 1997.';
  nombre = '';
  apellido = '';
  titulo = '';
  numero = 0;
  pais = '';
  responsable = '';
  userRegister = false;
  anio = [];
  anioPublicacion = 0;


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
          this.referenciaFinal += this.apellidos[z].value[0].toUpperCase() + this.apellidos[z].value.substr(1).toLocaleLowerCase() + ', y ';
        } else {
          this.referenciaFinal += this.apellidos[z].value[0].toUpperCase() + this.apellidos[z].value.substr(1).toLocaleLowerCase() + '. ';
        }
      }
    }


    if (this.titulo) {
      this.referenciaFinal += '"' + this.titulo + '", ';
    }

    if (this.responsable) {
      this.referenciaFinal += this.responsable + ', ';
    }

    if (this.pais) {
      this.referenciaFinal += this.pais + ',';
    }

    if (this.numero) {
      this.referenciaFinal += ' Informe Tecnico ' + this.numero + ', ';
    }

    if (this.anioPublicacion) {
      this.referenciaFinal +=  this.anioPublicacion + '.';
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
