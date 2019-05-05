import { Routes } from '@angular/router';
import { RegistroComponent } from './registro.component';
import { LoginGuard } from 'src/app/guards/login.guard';

export const registronRoute: Routes = [
    {path: 'registro', component: RegistroComponent, canActivate: [LoginGuard]}
];
