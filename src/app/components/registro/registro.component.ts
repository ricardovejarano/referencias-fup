import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  rol = '';
  email = '';
  password = '';
  password2 = '';
  fullName = '';
  programa = '';
  semestre = '';
  flagFormulario = false;
  esEstudiante = false;
  esAdministrativo = false;
  esDocente = false;
  esEgresado = false;

  constructor(public router: Router) { }

  ngOnInit() {
  }

  onChangeSl(event) {
    this.flagFormulario = true;
    switch (event) {
      case 'estudiante': this.esEstudiante = true; break;
      case 'docente': this.esDocente = true; break;
      case 'administrativo': this.esAdministrativo = true; break;
      case 'egresado': this.esEgresado = true; break;
    }
  }

  return() {
    this.router.navigate(['login']);
  }

  onSubmitRegister() {
    if (this.email.split('@')[1].toLowerCase() !== 'fup.edu.co') {
      window.alert('El Dominio debe ser @fup.edu.co');
    } else {
      if (this.password !== this.password2) {
        window.alert('Las contraseñas no coinciden');
      } else {

        console.log('AQUI VA EL REGISTRO YA VALIDADO');
      }
    }
  }

}
