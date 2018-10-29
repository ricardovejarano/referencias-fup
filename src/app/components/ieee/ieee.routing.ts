import { Routes } from '@angular/router';
import { IeeeComponent } from './ieee.component';
import { ArticuloWebComponent } from './components/articulo-web/articulo-web.component';
import { ArticuloRevistaComponent } from './components/articulo-revista/articulo-revista.component';
import { CapituloLibroIeeeComponent } from '../ieee/components/capitulo-libro-ieee/capitulo-libro-ieee.component';
import { InformeTecnicoComponent } from './components/informe-tecnico/informe-tecnico.component';
import { LibroComponent } from './components/libro/libro.component';
import { PatenteComponent } from './components/patente/patente.component';


export const ieeeRoutes: Routes = [
    {
        path: 'ieee', component: IeeeComponent, children: [
            { path: '', component: ArticuloWebComponent },
            { path: 'articulo-revista', component: ArticuloRevistaComponent },
            { path: 'capitulo-libro', component: CapituloLibroIeeeComponent },
            { path: 'informe-tecnico', component: InformeTecnicoComponent },
            { path: 'libro', component: LibroComponent },
            { path: 'patente', component: PatenteComponent },
            { path: 'informe-tecnico', component: InformeTecnicoComponent },
        ]
    }

];
