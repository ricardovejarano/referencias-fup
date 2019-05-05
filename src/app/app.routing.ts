import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loginRoute } from './components/login/login.routing';
import { homeRoute } from './components/home/home.routing';
import { icontecRoutes } from './components/icontec/icontec.routing';
import { apaRoutes } from './components/apa/apa.routing';
import { ieeeRoutes } from './components/ieee/ieee.routing';
import { rankingRoute } from './components/ranking/ranking.routing';
import { registronRoute } from './components/registro/registro.routing';
import { perfilRoute } from './components/perfil/perfil.routing';
import { historialRoute } from './components/historial/historial.routing';
import { restoreRoute } from './components/restore-pass/restore.routing';
import { LinkRoutes } from './components/link-validation/link-validation.routing';
import { notFoundRoute } from './components/not-found/not-found.routing';
import { NotFoundComponent } from './components/not-found/not-found.component';


const appRoutes: Routes = [
    ...loginRoute,
    ...homeRoute,
    ...icontecRoutes,
    ...apaRoutes,
    ...ieeeRoutes,
    ...rankingRoute,
    ...registronRoute,
    ...perfilRoute,
    ...historialRoute,
    ...LinkRoutes,
    ...restoreRoute,
    ...notFoundRoute
    // {path: ':id', component: NotFoundComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ], exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}
