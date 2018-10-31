import { Routes } from '@angular/router';
import { IcontecComponent } from './icontec.component';
import { ArticuloRevistaIcontecComponent } from './components/articulo-revista/articulo-revista.component';
import { ArticuloWebIcontecComponent } from './components/articulo-web/articulo-web.component';
import { CongresoReunionComponent } from './components/congreso-reunion/congreso-reunion.component';
import { LibrosIcontecComponent } from './components/libros/libros.component';
import { NormasJuridicasComponent } from './components/normas-juridicas/normas-juridicas.component';
import { NormasTecnicasComponent } from './components/normas-tecnicas/normas-tecnicas.component';
import { TesisIcontecComponent } from './components/tesis/tesis.component';


export const icontecRoutes: Routes = [
    {
        path: 'icontec', component: IcontecComponent, children: [
            { path: 'articulo-web', component: ArticuloWebIcontecComponent },
            { path: 'articulo-revista', component: ArticuloRevistaIcontecComponent },
            { path: 'congreso-reunion', component: CongresoReunionComponent },
            { path: 'libros', component: LibrosIcontecComponent },
            { path: 'normas-juridicas', component: NormasJuridicasComponent },
            { path: 'normas-tecnicas', component: NormasTecnicasComponent },
            { path: 'tesis', component: TesisIcontecComponent },
        ]
    }

];
