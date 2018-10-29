import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  usersList: AngularFireList<any>;

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
    return this.usersList = this.afDatabase.list(rol);
  }

  getContadorProgramas() {
    return this.usersList = this.afDatabase.list('contador-programas');
  }

  getEstudiantes() {
    return this.usersList = this.afDatabase.list('estudiante');
  }

  getDocentes() {
    return this.usersList = this.afDatabase.list('docente');
  }

  getAdministrativos() {
    return this.usersList = this.afDatabase.list('administrativo');
  }

  getEgresado() {
    return this.usersList = this.afDatabase.list('egresado');
  }

  getRol() {
    return this.usersList = this.afDatabase.list('rol');
  }

  saveImageProfile(keyAdmin, img) {
    const storageRef = firebase.storage().ref(`imagesProfile/${keyAdmin}`);
    return storageRef.putString(img, 'base64', { contentType: 'image/png' });
  }

  getProfileImage(keyAdmin) {
    const storage = firebase.storage();
    const pathReference = storage.ref(`imagesProfile/${keyAdmin}`);
    return pathReference.getDownloadURL();
  }
}
