import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-articulo-revista',
  templateUrl: './articulo-revista.component.html',
  styleUrls: ['./articulo-revista.component.css']
})
export class ArticuloRevistaComponent implements OnInit {
  autor = '';

  constructor() { }

  ngOnInit() {
  }

  addReference() {
    console.log('Se agrega referencia');
  }

}
