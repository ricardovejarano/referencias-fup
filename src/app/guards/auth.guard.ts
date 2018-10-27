import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
    ) { }
    canActivate() {
        console.log('VARIABLE LOGGED EN CANACTIVE', localStorage.getItem('logged'));
        if (localStorage.getItem('logged') === 'true') {
            console.log('Verificar si está registrado');
            return true;
        } else {
            console.log('REDIRIGE AL LOGIN');
            this.router.navigate(['/login']);
        }
    }
}
