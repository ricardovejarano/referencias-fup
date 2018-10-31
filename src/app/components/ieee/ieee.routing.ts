import { Routes } from '@angular/router';
import { IeeeComponent } from './ieee.component';
import { ArticuloWebComponent } from './components/articulo-web/articulo-web.component';
import { ArticuloRevistaComponent } from './components/articulo-revista/articulo-revista.component';
import { CapituloLibroIeeeComponent } from '../ieee/components/capitulo-libro-ieee/capitulo-libro-ieee.component';
import { NormaTecnicaIeeeComponent } from './components/norma-tecnica-ieee/norma-tecnica-ieee.component';
import { LibroComponent } from './components/libro/libro.component';
import { PatenteComponent } from './components/patente/patente.component';
import { InformeTecnicoComponent } from './components/informe-tecnico/informe-tecnico.component';


export const ieeeRoutes: Routes = [
    {
        path: 'ieee', component: IeeeComponent, children: [
            { path: 'articulo-web', component: ArticuloWebComponent },
            { path: 'articulo-revista', component: ArticuloRevistaComponent },
            { path: 'capitulo-libro', component: CapituloLibroIeeeComponent },
            { path: 'norma-tecnica', component: NormaTecnicaIeeeComponent },
            { path: 'libro', component: LibroComponent },
            { path: 'patente', component: PatenteComponent },
            { path: 'informe-tecnico', component: InformeTecnicoComponent },
        ]
    }

];
