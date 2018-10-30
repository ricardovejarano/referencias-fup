import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  // tslint:disable-next-line:use-host-property-decorator
  host: { 'id': 'sideBar' }
})
export class NavBarComponent implements OnInit {

  flag = true;
  logged = 'false';

  constructor() {
    this.logged = localStorage.getItem('logged');
  }

  ngOnInit() {
  }

}
