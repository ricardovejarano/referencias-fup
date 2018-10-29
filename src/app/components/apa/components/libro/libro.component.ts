import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css']
})
export class LibroApaComponent implements OnInit {

 // tslint:disable-next-line:max-line-length
 ejemplo = 'Mankiw, N. G. (2014). Macroeconomía. Barcelona: Antoni Bosch.';
 nombre = '';
 apellido = '';
 titulo = '';
 ciudad = '';
 editorial = '';
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
      if (z !== (this.nombres.length - 1)  && this.nombres.length !== 1) {
        this.referenciaFinal += this.nombres[z].value[0] + this.nombres[z].value.substr(1) + ', ';
      } else {
        this.referenciaFinal += this.nombres[z].value[0] + this.nombres[z].value.substr(1) + '. ';
      }
    }
  }

   if (this.anioPublicacion) {
    this.referenciaFinal += '(' + this.anioPublicacion + '). ';
  }

   if (this.titulo ) {
     this.referenciaFinal += this.titulo + '. ' ;
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
