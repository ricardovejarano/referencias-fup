import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-link-validation',
  templateUrl: './link-validation.component.html',
  styleUrls: ['./link-validation.component.css']
})
export class LinkValidationComponent implements OnInit {

  email = '';
  password1 = '';
  password2 = '';

  myStyle: object = {};
  myParams: object = {};
  width = 100;
  height = 100;

  constructor(public router: Router, public authService: AuthService) {
  }
  ngOnInit() {
    firebase.initializeApp(environment.firebaseConfig);
  }

  onSubmitValidate() {
    if (this.password1 === this.password2) {
      if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
        firebase.auth().signInWithEmailLink(this.email, window.location.href)
          .then(res => {
            window.localStorage.removeItem('emailForSignIn');
            // window.alert('Usuario creado correctamente, por favor inicie sesión');
            const key = firebase.auth().currentUser.uid;
            const user = firebase.auth().currentUser;
            user.updatePassword(this.password1);
            this.writeInDatabase(this.email, key);
          })
          .catch(err => {
            console.log('ERROR', err);
            window.alert('ERROR DE AUTENTICACIÓN');
            this.router.navigate(['/']);
          });
      }
    } else {
      window.alert('Las contraseñas no coinciden');
    }
  }

  writeInDatabase(email, uid) {
    this.authService.writeVerifyUser(email, uid);
  }

  return() {
    this.router.navigate(['/']);
  }

}
