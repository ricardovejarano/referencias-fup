import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class RankingService {

  constructor(
    public afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase) {

  }

  addCounter(programa: String, contadorActual: Number) {
    const contadorActualizado = Number(contadorActual) + 1;
    const myRefSale = this.afDatabase.object(`contador-programas/${programa}`);
    return myRefSale.update({
         contadorActualizado
    });
  }

  /**
    editAssignetAndSold(quantity, assigned, sold) {
        const key = this.getUid();
        const date = this.getTodayDate();
        const myRefSale = this.database.object(`seller/${key}/register/${date}`);
        return myRefSale.update({
            'assigned': Number(assigned) - quantity,
            'sold': Number(sold) + quantity
        });
    }
   */

}
