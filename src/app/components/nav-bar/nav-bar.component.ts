import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(public router: Router, public authService: AuthService) {
    this.logged = localStorage.getItem('logged');
  }

  ngOnInit() {
  }

  logout() {
    console.log('CIERRA SESIÓN');
    this.router.navigate(['/']);
    localStorage.setItem('logged', 'false');
    this.authService.logout();
    this.logged = 'false';
  }

}
