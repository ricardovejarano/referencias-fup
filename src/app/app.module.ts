import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// FIREBASE
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthService } from './services/auth.service';
import { AppRoutingModule } from './app.routing';
import { environment } from 'src/environments/environment';
import { LibrosComponent } from './components/icontec/components/libros/libros.component';
import { ArticuloWebComponent } from './components/icontec/components/articulo-web/articulo-web.component';
import { TesisComponent } from './components/icontec/components/tesis/tesis.component';
import { ArticuloRevistaComponent } from './components/icontec/components/articulo-revista/articulo-revista.component';
import { CongresoReunionComponent } from './components/icontec/components/congreso-reunion/congreso-reunion.component';
import { NormasJuridicasComponent } from './components/icontec/components/normas-juridicas/normas-juridicas.component';
import { NormasTecnicasComponent } from './components/icontec/components/normas-tecnicas/normas-tecnicas.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    LibrosComponent,
    ArticuloWebComponent,
    TesisComponent,
    ArticuloRevistaComponent,
    CongresoReunionComponent,
    NormasJuridicasComponent,
    NormasTecnicasComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AppRoutingModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
