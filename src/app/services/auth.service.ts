import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Usuario } from '../models/usuario.model';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(public afAuth: AngularFireAuth) { }

  loginEmail(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, pass)
        .then(userData => resolve(userData),
          err => reject(err));
    });
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

  registerAdmin(email, pass, usuario: Usuario, rol) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, pass)
        .then(userData => {
          resolve(userData);
          const key = firebase.auth().currentUser.uid;
          // añadir administrador en la rama admin con su Auth como key
          const usersRef = firebase.database().ref(rol);
          const usersRefRol = firebase.database().ref('rol');
          usersRef.child(key).set(usuario);
          usersRefRol.child(key).set(rol);
        },
          err => {
            reject(err);
            console.log('err', err);
          });
    });
  }
}
