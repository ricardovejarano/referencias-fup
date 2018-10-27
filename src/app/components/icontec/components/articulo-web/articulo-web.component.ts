import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-articulo-web',
  templateUrl: './articulo-web.component.html',
  styleUrls: ['./articulo-web.component.css']
})
export class ArticuloWebComponent implements OnInit {

  nombre = '';
  apellido = '';
  titulo = '';
  medioElectronico = '';
  edicion = '';
  fechaPublicacion = '';
  fechaCita = '';
  disponibilidad = '';


  constructor() { }

  ngOnInit() {
  }

  addReference() {
    
  }

}
