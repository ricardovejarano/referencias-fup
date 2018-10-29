import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  keyAdmin = '';

  constructor(public router: Router, public authService: AuthService) { }

  ngOnInit() {
  }

  onSubmitLogin() {
    this.authService.loginEmail(this.email, this.password)
      .then((res) => {
        this.router.navigate(['/']);
        localStorage.setItem('logged', 'true');
        localStorage.setItem('uid', firebase.auth().currentUser.uid);

      }).catch((err) => {
        console.log('Error en Login', err);
        window.alert('Datos incorrectos');
      });
  }

  goToRegister() {
    this.router.navigate(['registro']);
  }

  return() {
    this.router.navigate(['/']);
  }

}
