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


  myStyle: object = {};
  myParams: object = {};
  width = 100;
  height = 100;
  actionCodeSettings = {};

  constructor(public router: Router, public authService: AuthService) { }

  ngOnInit() {

    this.myStyle = {
      'position': 'absolute',
      'width': '100%',
      'height': '100%',
      'z-index': 0,
      'top': 0,
      'left': 0,
      'right': 0,
      'bottom': 0
    };

    this.myParams = {
      particles: {
        number: {
          value: 180
        },
        color: {
          value: '#ffffff'
        },
        shape: {
          type: 'circle'
        },
        line_linked: {
          color: '#ffffff'
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onclick: {
            mode: 'repulse'
          }
        }
      }
    };
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

    if (this.edad > '15' && this.edad < '90') {

    this.actionCodeSettings = {
      url: 'http://unividafup.edu.co/demo_referencias/validation',
      handleCodeInApp: true,
      iOS: {
      },
      android: {
      },
      dynamicLinkDomain: 'http://unividafup.edu.co/demo_referencias'
    };
    // Agregar nuevo dominio:
    // && this.email.split('@')[1].toLowerCase()  !== <X-dominio>
    if (this.email.split('@')[1].toLowerCase() !== 'fup.edu.co' &&
      this.email.split('@')[1].toLowerCase() !== 'unividafup.edu.co'
      &&
      this.email.split('@')[1].toLowerCase() !== 'gmail.com'
      ) {
      window.alert('El Dominio debe ser @fup.edu.co o @unividafup.edu.co');
    } else {
      if (this.password !== this.password2) {
        window.alert('Las contraseñas no coinciden');
      } else {
        this.usuario.nombre = this.fullName;
        this.usuario.correo = this.email;
        this.usuario.edad = this.edad;
        this.usuario.contador = 0;
        this.usuario.rol = this.rol;
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

        this.authService.sendEmailConfirmation(this.email, this.actionCodeSettings)
          .then(res => {
            window.alert('Revise su bandeja de entrada para validar correo');
            this.authService.registerTemporalUser(this.usuario)
              .then(res2 => {

                this.router.navigate(['/login']);
              }, err => {
                console.log('Error al subir información temporal', err);
              });
          }, err => {
            window.alert('Error al enviar mensaje ' + err);
            console.log(err);
          });
      }
    }
  } else {
    window.alert('Inserta una edad valida');
  }

  }

}
