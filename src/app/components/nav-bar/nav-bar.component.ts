import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  host: { 'id': 'sideBar' }
})
export class NavBarComponent implements OnInit {

  flag = true;

  constructor() {
  }

  ngOnInit() {
  }

}
