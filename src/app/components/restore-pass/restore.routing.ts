import { Routes } from '@angular/router';
import { RestorePassComponent } from './restore-pass.component';
import { LoginGuard } from 'src/app/guards/login.guard';

export const restoreRoute: Routes = [
    {path: 'restablecer', component: RestorePassComponent, canActivate: [LoginGuard]}
];
