import { Routes } from '@angular/router';
import { PerfilComponent } from './perfil.component';
import { ImageProfileComponent } from './image-profile/image-profile.component';
import { UpdateInfoComponent } from './update-info/update-info.component';

export const perfilRoute: Routes = [
    {
        path: 'perfil', component: PerfilComponent, children: [
            {path: '', component: UpdateInfoComponent },
            { path: 'cambiar-imagen', component: ImageProfileComponent },
        ]
    }
];
