import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

export const homeRoute: Routes = [
    {path: '', component: HomeComponent }
];
