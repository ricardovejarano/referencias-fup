import { Routes } from '@angular/router';
import { HistorialComponent } from './historial.component';
import { ProfileGuard } from 'src/app/guards/profile.guard';
import { NotFoundComponent } from '../not-found/not-found.component';

export const historialRoute: Routes = [
    {path: 'historial', component: HistorialComponent, canActivate: [ProfileGuard], children: [
        {path: ':id', component: NotFoundComponent}
    ]}
];
