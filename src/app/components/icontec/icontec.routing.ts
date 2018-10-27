import { Routes } from '@angular/router';
import { IcontecComponent } from './icontec.component';
import { ArticuloRevistaComponent } from './components/articulo-revista/articulo-revista.component';
import { ArticuloWebComponent } from './components/articulo-web/articulo-web.component';
import { CongresoReunionComponent } from './components/congreso-reunion/congreso-reunion.component';
import { LibrosComponent } from './components/libros/libros.component';
import { NormasJuridicasComponent } from './components/normas-juridicas/normas-juridicas.component';
import { NormasTecnicasComponent } from './components/normas-tecnicas/normas-tecnicas.component';
import { TesisComponent } from './components/tesis/tesis.component';


export const icontecRoutes: Routes = [
    {
        path: 'icontec', component: IcontecComponent, children: [
            { path: '', component: ArticuloWebComponent },
            { path: 'articulo-revista', component: ArticuloRevistaComponent },
            { path: 'congreso-reunion', component: CongresoReunionComponent },
            { path: 'libros', component: LibrosComponent },
            { path: 'normas-juridicas', component: NormasJuridicasComponent },
            { path: 'normas-tecnicas', component: NormasTecnicasComponent },
            { path: 'tesis', component: TesisComponent },
        ]
    }

];
