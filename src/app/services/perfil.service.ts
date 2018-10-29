import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  adminsList: AngularFireList<any>;

  constructor(
    public afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase) { }

  getkeyAdmin() {
    if (firebase.auth().currentUser) {
      const authdata = firebase.auth().currentUser;
      return authdata.uid;
    } else {
      setTimeout(() => {
        const authdata = firebase.auth().currentUser;
        return authdata.uid;
      }, 2000);
    }
  }

  getUsers(rol) {
    return this.adminsList = this.afDatabase.list(rol);
  }

  getRol() {
    return this.adminsList = this.afDatabase.list('rol');
  }
}
