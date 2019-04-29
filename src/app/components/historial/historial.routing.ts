import { Routes } from '@angular/router';
import { HistorialComponent } from './historial.component';
import { ProfileGuard } from 'src/app/guards/profile.guard';

export const historialRoute: Routes = [
    {path: 'historial', component: HistorialComponent, canActivate: [ProfileGuard]}
];
