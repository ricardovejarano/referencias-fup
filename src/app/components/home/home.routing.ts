import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { NotFoundComponent } from '../not-found/not-found.component';

export const homeRoute: Routes = [
    {path: '', component: HomeComponent },
];
