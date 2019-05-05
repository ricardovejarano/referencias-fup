import { Routes } from '@angular/router';
import { PerfilComponent } from './perfil.component';
import { ImageProfileComponent } from './image-profile/image-profile.component';
import { UpdateInfoComponent } from './update-info/update-info.component';
import { ProfileGuard } from 'src/app/guards/profile.guard';
import { NotFoundComponent } from '../not-found/not-found.component';

export const perfilRoute: Routes = [
    {
        path: 'perfil', component: PerfilComponent, children: [
            { path: '', component: UpdateInfoComponent, canActivate: [ProfileGuard] },
            { path: 'cambiar-imagen', component: ImageProfileComponent, canActivate: [ProfileGuard] },
            { path: ':id', component: NotFoundComponent }
        ]
    },
    { path: '**', redirectTo: '' }
];
