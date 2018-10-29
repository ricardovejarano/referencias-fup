import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Estilos
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ImageCropperModule} from 'ng2-img-cropper';
import { CommonModule } from '@angular/common';

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
import { LibrosIcontecComponent } from './components/icontec/components/libros/libros.component';
import { ArticuloWebIcontecComponent } from './components/icontec/components/articulo-web/articulo-web.component';
import { TesisIcontecComponent } from './components/icontec/components/tesis/tesis.component';
import { CongresoReunionComponent } from './components/icontec/components/congreso-reunion/congreso-reunion.component';
import { NormasJuridicasComponent } from './components/icontec/components/normas-juridicas/normas-juridicas.component';
import { NormasTecnicasComponent } from './components/icontec/components/normas-tecnicas/normas-tecnicas.component';
import { IcontecComponent } from './components/icontec/icontec.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LibroApaComponent } from './components/apa/components/libro/libro.component';
import { RevistaComponent } from './components/apa/components/revista/revista.component';
import { SitioWebComponent } from './components/apa/components/sitio-web/sitio-web.component';
import { CongresosComponent } from './components/apa/components/congresos/congresos.component';
import { PeriodicosComponent } from './components/apa/components/periodicos/periodicos.component';
import { CapituloLibroComponent } from './components/apa/components/capitulo-libro/capitulo-libro.component';
import { ApaComponent } from './components/apa/apa.component';
import { InformeTecnicoComponent } from './components/ieee/components/informe-tecnico/informe-tecnico.component';
import { PatenteComponent } from './components/ieee/components/patente/patente.component';
import { IeeeComponent } from './components/ieee/ieee.component';
import { RankingComponent } from './components/ranking/ranking.component';
import { RegistroComponent } from './components/registro/registro.component';
import { GraficasComponent } from './components/ranking/components/graficas/graficas.component';
import { EstadisticasComponent } from './components/ranking/components/estadisticas/estadisticas.component';
import { TesisComponent } from './components/apa/components/tesis/tesis.component';
import { ArticuloWebComponent } from './components/ieee/components/articulo-web/articulo-web.component';
import { ArticuloRevistaComponent } from './components/ieee/components/articulo-revista/articulo-revista.component';
import { ArticuloRevistaIcontecComponent } from './components/icontec/components/articulo-revista/articulo-revista.component';
import { LibroComponent } from './components/ieee/components/libro/libro.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { PerfilService } from './services/perfil.service';
import { CapituloLibroIeeeComponent } from './components/ieee/components/capitulo-libro-ieee/capitulo-libro-ieee.component';
import { NormaTecnicaIeeeComponent } from './components/ieee/components/norma-tecnica-ieee/norma-tecnica-ieee.component';
import { RankingService } from './services/ranking.service';
import { ImageProfileComponent } from './components/perfil/image-profile/image-profile.component';
import { UpdateInfoComponent } from './components/perfil/update-info/update-info.component';
import { HistorialComponent } from './components/historial/historial.component';
import { CardReferenciaComponent } from './components/historial/components/card-referencia/card-referencia.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ArticuloWebIcontecComponent,
    LibroApaComponent,
    ArticuloWebComponent,
    TesisComponent,
    TesisIcontecComponent,
    ArticuloRevistaIcontecComponent,
    ArticuloRevistaComponent,
    CongresoReunionComponent,
    LibrosIcontecComponent,
    NormasJuridicasComponent,
    NormasTecnicasComponent,
    IcontecComponent,
    NavBarComponent,
    LibroComponent,
    RevistaComponent,
    SitioWebComponent,
    CongresosComponent,
    PeriodicosComponent,
    CapituloLibroComponent,
    ApaComponent,
    InformeTecnicoComponent,
    PatenteComponent,
    IeeeComponent,
    RankingComponent,
    RegistroComponent,
    GraficasComponent,
    EstadisticasComponent,
    PerfilComponent,
    CapituloLibroIeeeComponent,
    NormaTecnicaIeeeComponent,
    ImageProfileComponent,
    UpdateInfoComponent,
    HistorialComponent,
    CardReferenciaComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    ImageCropperModule,
    CommonModule,
  ],
  providers: [AuthService, PerfilService, RankingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
