import { Component, OnInit, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

	deviceWidth= window.innerWidth;
	timer:any;

  constructor() { }

  ngOnInit() {
  }
  ngAfterViewChecked(){
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
  }

}
