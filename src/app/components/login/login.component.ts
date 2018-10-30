import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import * as firebase from 'firebase';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  keyAdmin = '';

  myStyle: object = {};
  myParams: object = {};
  width = 100;
  height = 100;

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

  goToRestorePass() {
    this.router.navigate(['restablecer']);
    // this.authService.restorePass('jucapo05@gmail.com');
  }

}
