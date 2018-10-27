import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loginRoute } from './components/login/login.routing';
import { homeRoute } from './components/home/home.routing';
import { icontecRoutes } from './components/icontec/icontec.routing';


const appRoutes: Routes = [
    ...loginRoute,
    ...homeRoute,
    ...icontecRoutes
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ], exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
