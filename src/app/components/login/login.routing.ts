import { Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { LoginGuard } from 'src/app/guards/login.guard';
import { NotFoundComponent } from '../not-found/not-found.component';

export const loginRoute: Routes = [
    {path: 'login', component: LoginComponent, canActivate: [LoginGuard]}
];
