import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/models/usuario.model';
import * as firebase from 'firebase';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  rol = '';
  email = '';
  edad = '';
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
  usuario: Usuario = new Usuario();

  constructor(public router: Router, public authService: AuthService) { }

  ngOnInit() {
  }

  onChangeSl(event) {
    this.flagFormulario = true;
    switch (event) {
      case 'estudiante': this.esEstudiante = true;
        this.esDocente = false;
        this.esEgresado = false;
        this.esAdministrativo = false;
        break;
      case 'docente': this.esDocente = true;
        this.esAdministrativo = false;
        this.esEgresado = false;
        this.esEstudiante = false;
        break;
      case 'administrativo': this.esAdministrativo = true;
        this.esDocente = false;
        this.esEgresado = false;
        this.esEstudiante = false;
        break;
      case 'egresado': this.esEgresado = true;
        this.esDocente = false;
        this.esAdministrativo = false;
        this.esEstudiante = false;
        break;
    }
  }

  return() {
    this.router.navigate(['login']);
  }

  onSubmitRegister() {
    // Agregar nuevo dominio:
    // && this.email.split('@')[1].toLowerCase()  !== <X-dominio>
    console.log('Dominio', this.email.split('@')[1].toLowerCase());
    if (this.email.split('@')[1].toLowerCase() !== 'fup.edu.co' && this.email.split('@')[1].toLowerCase() !== 'unividafup.edu.co') {
      window.alert('El Dominio debe ser @fup.edu.co o @unividafup.edu.co');
    } else {
      if (this.password !== this.password2) {
        window.alert('Las contraseñas no coinciden');
      } else {
        this.usuario.nombre = this.fullName;
        this.usuario.correo = this.email;
        this.usuario.edad = this.edad;
        this.usuario.contador = 0;
        switch (this.rol) {
          case 'estudiante':
            this.usuario.programa = this.programa;
            this.usuario.semestre = this.semestre;
            break;
          case 'docente':
            this.usuario.programa = this.programa;
            break;
          case 'administrativo':
            break;
          case 'egresado':
            this.usuario.programa = this.programa;
            break;
        }
        console.log('EL USUARIO', this.usuario);
        this.authService.registerAdmin(this.email, this.password, this.usuario, this.rol)
          .then((res) => {
            window.alert('Operación Exitosa');
            this.authService.loginEmail(this.email, this.password)
              .then((res2) => {
                this.router.navigate(['/']);
                localStorage.setItem('logged', 'true');
                localStorage.setItem('uid', firebase.auth().currentUser.uid);
              }).catch((err) => {
                console.log('Error en Login', err);
                window.alert('Datos incorrectos');
              });
            console.log('creado exitoso:', res);
          }).catch((err1) => {
            console.log('creado error:', err1);
          });
      }
    }
  }

}
