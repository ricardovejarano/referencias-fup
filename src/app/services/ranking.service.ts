import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class RankingService {
  adminsList: AngularFireList<any>;
  constructor(
    public afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase) {

  }

  addCounterProgram(programa: String, contadorActual: Number) {
    const contadorActualizado = Number(contadorActual) + 1;
    const myRefSale = this.afDatabase.object(`contador-programas/${programa}`);
    return myRefSale.update({
         contadorActualizado
    });
  }

  addCounterPerson(rol: String, uid: String, contadorActual: Number) {
    const contadorActualizado = Number(contadorActual) + 1;
    const myRefSale = this.afDatabase.object(`${rol}/${uid}`);
    return myRefSale.update({
         'contador': contadorActualizado
    });
  }

  addCounterReference(ref: String, subRef: String, contadorActual: Number) {
    const contador = Number(contadorActual) + 1;
    const myRefSale = this.afDatabase.object(`contador-referencias/${ref}/${subRef}`);
    return myRefSale.update({
         contador
    });
  }

  getContadorPersona(uid, rol) {
    return this.adminsList = this.afDatabase.list(`${rol}/${uid}`);
  }

  getContadorReferencia(ref, subRef) {
    return this.adminsList = this.afDatabase.list(`contador-referencias/${ref}/${subRef}`);
  }

}
