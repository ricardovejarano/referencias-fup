import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  email = '';
  password = '';

  constructor(public router: Router) { }

  ngOnInit() {
  }

  return() {
    this.router.navigate(['login']);
  }

  onSubmitRegister() {
    console.log('Función para registro de usuario');
  }

}
