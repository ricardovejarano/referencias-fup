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

  getReferences(keyUser) {
    return this.Referencias = this.afDatabase.list(`${keyUser}/historial`);
  }

}
