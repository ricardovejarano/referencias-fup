import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-articulo-web',
  templateUrl: './articulo-web.component.html',
  styleUrls: ['./articulo-web.component.css']
})
export class ArticuloWebIcontecComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  ejemplo = 'MARQUEZ DE MELO, José “Comunicación e integración latinoamericana: El papel de ALAIC”. {En línea}. {10 julio de 2008} disponible en: (www.mty.itsem.mx/externos/alaic/texto1html).';
  nombre = '';
  apellido = '';
  titulo = '';
  medioElectronico = '';
  edicion = '';
  fechaPublicacion = '';
  fechaCita = '';
  disponibilidad = '';
  referenciaFinal = '';


  constructor() { }

  ngOnInit() {
  }

  addReference() {
    if (this.apellido) {
      this.referenciaFinal += this.apellido.toUpperCase() + ', ';
    }
    if (this.nombre) {
      // return word[0].toUpperCase() + word.substr(1).toLowerCase();
      this.referenciaFinal += this.nombre[0].toUpperCase() + this.nombre.substr(1).toLocaleLowerCase();
    }

    if (this.titulo) {
      this.referenciaFinal += '“' + this.titulo + '”.';
    }

    this.referenciaFinal += '{En línea}';

    if (this.fechaPublicacion) {
      this.referenciaFinal += this.fechaPublicacion + '. ';
    }

    if (this.fechaCita) {
      this.referenciaFinal += '{' + this.titulo + '}';
    }

    this.referenciaFinal += 'disponiible en:' + '(' + this.disponibilidad + ')';
  }

  copyInputMessage(inputElement) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

}
