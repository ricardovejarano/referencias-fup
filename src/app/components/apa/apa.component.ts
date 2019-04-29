import { Component, OnInit, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'app-apa',
  templateUrl: './apa.component.html',
  styleUrls: ['./apa.component.css']
})
export class ApaComponent implements OnInit, AfterViewChecked {

  deviceWidth = window.innerWidth;
  formHeight = 0;
  mainCard;
  finalRef;
  formRef;
  timer:any;

  constructor() { }

  ngOnInit() {
    this.mainCard = '';
    this.finalRef = '';
    this.formRef = '';
    this.formHeight = 0;
  }

  ngAfterViewChecked() {

    if(this.deviceWidth < 768){
      const menu = document.getElementById("mainMenuAccordion");
      if(menu.classList.contains('show')){
        this.timer = setTimeout (() => {
          menu.classList.remove('show');         
        }, 1200);
      }else{
        clearTimeout(this.timer);        
      }
    }

    if(this.deviceWidth > 768){
      this.mainCard = document.getElementById('Reference');
      this.finalRef = document.getElementById('clipboard');
      this.formRef = document.getElementById('formReference');

      this.formHeight = this.mainCard.offsetHeight - this.finalRef.offsetHeight;
      this.formRef.style.height = 'calc(' + String(this.formHeight) + 'px - 7rem)';

    }
  }
}
