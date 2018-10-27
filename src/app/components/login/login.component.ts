import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSubmitLogin() {
    console.log('Función para inicio de sesión');
  }

  goToRegister() {
    this.router.navigate(['registro']);
  }

  return() {
    this.router.navigate(['/']);
  }

}
