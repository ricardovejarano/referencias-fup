import { Component, OnInit, Input } from '@angular/core';
import { ReferenciaWhitKey } from 'src/app/models/referenciaWithKey.model';

@Component({
  selector: 'app-card-referencia',
  templateUrl: './card-referencia.component.html',
  styleUrls: ['./card-referencia.component.css']
})
export class CardReferenciaComponent implements OnInit {

  @Input() referencia: ReferenciaWhitKey;

  constructor() { }

  ngOnInit() {
  }

}
