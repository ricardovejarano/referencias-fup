import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  flag = true;
  flagLogged = false;

  constructor(private router: Router, public authService: AuthService) {
  }

  ngOnInit() {
    this.seeIfIsLogged();
  }

  goToProfile() {
    this.router.navigate(['perfil']);
  }

  goToHistory() {
    this.router.navigate(['historial']);
  }

  logout() {
    console.log('CIERRA SESIÓN');
    this.router.navigate(['/']);
    localStorage.setItem('logged', 'false');
    this.authService.logout();
    this.flagLogged = false;
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
