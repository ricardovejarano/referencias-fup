import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  flagLogged = false;

  constructor() {
  }

  ngOnInit() {
    this.seeIfIsLogged();
  }

  seeIfIsLogged() {
    if (localStorage.getItem('logged') === 'true') {
      this.flagLogged = true;
    } else {
      this.flagLogged = false;
    }

  }

}
