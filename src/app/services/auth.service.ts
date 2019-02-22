import { Injectable, Output, EventEmitter } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Usuario } from '../models/usuario.model';
import * as firebase from 'firebase';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth, private toastr: ToastrService, public router: Router,
    private afDatabase: AngularFireDatabase) { }

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


  writeVerifyUser(email, uid) {
    // first read info from temporal user
    this.afDatabase.list('user-temporal')
    .snapshotChanges().subscribe(item => {
      item.forEach(element => {
        const x = element.payload.toJSON();
        x['$key'] = element.key;
        if (x['correo'] === email) {
          const user: Usuario = new Usuario();
          user.correo = x['correo'];
          user.contador = x['contador'];
          user.edad = x['edad'];
          user.historial = x['historial'];
          user.nombre = x['nombre'];
          user.programa = x['programa'];
          user.rol = x['rol'];
          user.semestre = x['semestre'];
          console.log('USUARIO EN LA CONSULTA');
          this.write(user.rol, uid, user, x['$key']);
        }
      });
    });
  }

  write(rol, uid, usuario, keyToDell) {
    const usersRefRol = firebase.database().ref('rol');
    usersRefRol.child(uid).set(rol);
    const usersRef = firebase.database().ref(rol);
    usersRef.child(uid).set(usuario)
    .then(res => {
      console.log('res de write', res);
      this.afDatabase.list(`user-temporal`).remove(keyToDell)
      .then( res2 => {
        console.log('Temporal eliminada');
        window.alert('Ya puede iniciar sesión');
        this.router.navigate(['/login']);
      }, err2 => {
        console.log('Error al eliminar usuario temporal', err2);
      });
    }, err => {
      console.log('error', err);
    });
  }



  registerTemporalUser(usuario: Usuario) {
    const usersRef = firebase.database().ref(`user-temporal`);
    return usersRef.push(usuario);
  }


  sendEmailConfirmation(email, actionCodeSettings) {
    return firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings);
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
