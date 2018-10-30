import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class ReferenciaService {

  Referencias: AngularFireList<any>;

  constructor(
    private afDatabase: AngularFireDatabase,
    public afAuth: AngularFireAuth
    ) { }

  getReferences(rolUser, keyUser) {
    return this.Referencias = this.afDatabase.list(`${rolUser}/${keyUser}/historial`);
  }

  deleteReference(keyReferencia, rolUser, keyUser) {
    return this.afDatabase.list(`${rolUser}/${keyUser}/historial`).remove(keyReferencia);
    }

}
