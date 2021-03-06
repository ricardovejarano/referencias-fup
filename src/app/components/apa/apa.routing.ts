import { Routes } from '@angular/router';
import { SitioWebComponent } from './components/sitio-web/sitio-web.component';
import { ApaComponent } from './apa.component';
import { CongresosComponent } from './components/congresos/congresos.component';
import { LibroApaComponent } from './components/libro/libro.component';
import { PeriodicosComponent } from './components/periodicos/periodicos.component';
import { CapituloLibroComponent } from './components/capitulo-libro/capitulo-libro.component';
import { TesisComponent } from './components/tesis/tesis.component';
import { RevistaComponent } from './components/revista/revista.component';
import { NotFoundComponent } from '../not-found/not-found.component';



export const apaRoutes: Routes = [
    {
        path: 'apa', component: ApaComponent, children: [
            { path: 'articulo-web', component: SitioWebComponent },
            { path: 'periodico', component: PeriodicosComponent },
            { path: 'congreso', component: CongresosComponent },
            { path: 'libros', component: LibroApaComponent },
            { path: 'capitulo-libro', component: CapituloLibroComponent },
            { path: 'revista', component: RevistaComponent },
            { path: 'tesis', component: TesisComponent },
            { path: ':id', component: NotFoundComponent }
        ]
    }

];
