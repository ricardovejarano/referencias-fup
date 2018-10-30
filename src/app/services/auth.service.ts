import { Injectable, Output, EventEmitter } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Usuario } from '../models/usuario.model';
import * as firebase from 'firebase';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth, private toastr: ToastrService, public router: Router) { }

  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

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


  restorePass(email) {
    const auth = firebase.auth();
    return auth.sendPasswordResetEmail(email)
      .then(() => {
        console.log('email sent');
        this.toastr.success('Revise su bandeja de entrada', 'Operación exitosa');
        this.router.navigate(['login']);
      }
      )
      .catch((error) => {
        if (error.message === 'There is no user record corresponding to this identifier. The user may have been deleted.') {
          this.toastr.warning('Usuario no encontrado');
        } else if (error.message === 'The email address is badly formatted.') {
          this.toastr.warning('Correo no valido');
        } else {
          this.toastr.warning('Error en el proceso');
        }
        console.log(error.message);
      }
      );
  }
}
