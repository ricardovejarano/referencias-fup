import { Routes } from '@angular/router';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';
import { GraficasComponent } from './components/graficas/graficas.component';
import { RankingComponent } from './ranking.component';


export const rankingRoute: Routes = [
    {
        path: 'ranking', component: RankingComponent, children: [
            { path: '', component: EstadisticasComponent },
            { path: 'graficas', component: GraficasComponent }
        ]
    }

];
