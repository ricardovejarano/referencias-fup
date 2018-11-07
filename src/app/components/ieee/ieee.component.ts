import { Component, OnInit, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'app-ieee',
  templateUrl: './ieee.component.html',
  styleUrls: ['./ieee.component.css']
})
export class IeeeComponent implements OnInit, AfterViewChecked {

  formHeight = 0;
  mainCard;
  finalRef;
  formRef;
  constructor() { }

  ngOnInit() {
    this.mainCard = '';
    this.finalRef = '';
    this.formRef = '';
    this.formHeight = 0;
  }

  ngAfterViewChecked() {

    this.mainCard = document.getElementById('Reference');
    this.finalRef = document.getElementById('clipboard');
    this.formRef = document.getElementById('formReference');

    this.formHeight = this.mainCard.offsetHeight - this.finalRef.offsetHeight;
    this.formRef.style.height = 'calc(' + String(this.formHeight) + 'px - 7rem)';
    console.log('Form: ' + this.formHeight);
  }
}
