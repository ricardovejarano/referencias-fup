import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class ReferenciaService {

  Referencias: AngularFireList<any>;
  icontecList: AngularFireList<any>;
  ieeeList: AngularFireList<any>;
  apaList: AngularFireList<any>;

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

  getRefIcontec() {
    return this.icontecList = this.afDatabase.list('contador-referencias/icontec');
  }

  getRefApa() {
    return this.apaList = this.afDatabase.list('contador-referencias/apa');
  }

  getRefIeee() {
    return this.ieeeList = this.afDatabase.list('contador-referencias/ieee');
  }

}
