import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  flagLogged = false;

  constructor(private router: Router) {
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

  goToLogin() {
    this.router.navigate(['login']);
  }

}
