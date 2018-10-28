import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-normas-tecnicas',
  templateUrl: './normas-tecnicas.component.html',
  styleUrls: ['./normas-tecnicas.component.css']
})
export class NormasTecnicasComponent implements OnInit {

 // tslint:disable-next-line:max-line-length
 ejemplo = 'INSTITUTO COLOMBIANO DE NORMALIZACIÓN Y CERTIFICACIÓN. Sistemas de gestión de la calidad: fundamentos y vocabulario. NTC-ISO 9001. Bogotá D.C.: El instituto, 2005. 36 p.';
 entidad = '';
 titulo = '';
 codigo = '';
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

   if (this.entidad ) {
     this.referenciaFinal += this.entidad.toUpperCase()  + '. ';
   }

   if (this.titulo ) {
    this.referenciaFinal += this.titulo + '. ';
  }

   if (this.codigo) {
     this.referenciaFinal += this.codigo + '. ';
   }

   if (this.edicion) {
     this.referenciaFinal += this.edicion + ', ';
   }

   if (this.ciudad) {
     this.referenciaFinal += this.ciudad + ': ';
   }

   if (this.editorial) {
     this.referenciaFinal += this.editorial + ', ';
   }

   if (this.anioPublicacion) {
     this.referenciaFinal += this.anioPublicacion + '. ';
   }

   if (this.paginas) {
     this.referenciaFinal += this.paginas + ' p.';
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
