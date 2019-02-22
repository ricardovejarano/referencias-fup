import { Component, OnInit } from '@angular/core';
import { PerfilService } from 'src/app/services/perfil.service';
import { Usuario } from 'src/app/models/usuario.model';
import { ReferenciaService } from 'src/app/services/referencia.service';
import { RankingService } from 'src/app/services/ranking.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  promedioEdad = 0;
  usuarios: Usuario[];
  keyAdmin = '';
  UsuarioPerfil: Usuario = new Usuario();
  arrayEstudiantes = [];
  averageEstuaidntes = 0;
  arrayDocentes = [];
  averageDocentes = 0;
  arrayAdministrativos = [];
  averageAdminstrativos = 0;
  arrayEgresados = [];
  averageEgresados = 0;

  // Ranking Referencias
  arrayRefenciaContadorIcontec = [];
  arrayRefenciaIcontec = [];
  arrayRefenciaContadorApa = [];
  arrayRefenciaApa = [];
  arrayRefenciaContadorIeee = [];
  arrayRefenciaIeee = [];
  referenciaIcontecTop = '';
  contadorIcontecTop = 0;
  referenciaIeeeTop = '';
  contadorIeeeTop = 0;
  referenciaApaTop = '';
  contadorApaTop = 0;


  // Usuario que más usa la aplicación
  flagRanking = false;
  estudiante = 'No aplica';
  estudianteUsos = 0;
  administrativo = 'No aplica';
  administrativoUsos = 0;
  egresado = 'No aplica';
  egresadoUsos = 0;
  docente = 'No aplica';
  docenteUsos = 0;

  zero = 0;

  // Referencias mas usadas
  icontec = '';
  apa = '';
  ieee = '';
  icontecUsos = 0;
  apaUsos = 0;
  ieeeUsos = 0;

  // Array para gráfica
  arrayProgramas = [];
  arrayContadorProgramas = [];
  posición1Programa = 0;
  posición2Programa = 0;
  posición3Programa = 0;
  programa1Nombre = '';
  programa1cuenta = 0;

  programa2Nombre = '';
  programa2cuenta = 0;

  programa3Nombre = '';
  programa3cuenta = 0;

  // Variables Ranking Administrativos
  arrayNombresAdministrativo = [];
  arrayContadoresAdministrativo = [];
  nombreAdministrativo = '';
  contadorAdministrativo = 0;

  arrayNombresEgresado = [];
  arrayNombresDocente = [];
  arrayNombresEstudiante = [];
  arrayContadoresEstudiante = [];
  arrayContadoresEgresado = [];
  arrayContadoresDocente = [];

  correoEstudiante = '';
  arrayCorreoEstudiante = [];
  correoAdministrativo = '';
  arrayCorreoAdministrativo = [];
  correoEgresado = '';
  arrayCorreoEgresado = [];
  correoDocente = '';
  arrayCorreoDocente = [];
  usosNobody = 0;

  // IMAGENES
  // tslint:disable-next-line:max-line-length
  // dataAdministrativo = '';
  // tslint:disable-next-line:max-line-length
  dataAdministrativo = 'https://firebasestorage.googleapis.com/v0/b/referencias-fup.appspot.com/o/unknown.png?alt=media&token=dc0e2e6e-05a5-47c6-bd65-026c81d69186';
  // tslint:disable-next-line:max-line-length
  dataEstudiante = 'https://firebasestorage.googleapis.com/v0/b/referencias-fup.appspot.com/o/unknown.png?alt=media&token=dc0e2e6e-05a5-47c6-bd65-026c81d69186';
  // tslint:disable-next-line:max-line-length
  dataEgresado = 'https://firebasestorage.googleapis.com/v0/b/referencias-fup.appspot.com/o/unknown.png?alt=media&token=dc0e2e6e-05a5-47c6-bd65-026c81d69186';
  // tslint:disable-next-line:max-line-length
  dataDocente = 'https://firebasestorage.googleapis.com/v0/b/referencias-fup.appspot.com/o/unknown.png?alt=media&token=dc0e2e6e-05a5-47c6-bd65-026c81d69186';

  // ARRAY CORREOS
  adminCorreoArray = [];
  docenteCorreoArray = [];
  egresadoCorreoArray = [];
  estudianteCorreoArray = [];

  constructor(public profileService: PerfilService, public rankingService: RankingService,
    public referenciaService: ReferenciaService) { }


  ngOnInit() {
    this.estudiantesPromedio();
    this.docentesPromedio();
    this.administrativosPromedio();
    this.egresadosPromedio();
    this.rankingProgramas();
    this.rankingRefencias();
    this.listaAdministrativos();
    this.getCounterNobody();
    if (localStorage.getItem('logged') === 'true') {
      this.flagRanking = true;
    }
    setTimeout(() => {
      this.edadPromedio();
    }, 1000);
  }

  getCounterNobody() {
    this.rankingService.getNobodyCounter()
      .snapshotChanges().subscribe(item => {
        item.forEach(element => {
          const x = element.payload.toJSON();
          if (element.key === 'contador') {
            this.usosNobody = Number(x);
          }
        });
      });
  }

  edadPromedio() {
    let totalEdades = 0;
    if (this.averageAdminstrativos !== 0) {
      totalEdades = totalEdades + 1;
    }
    if (this.averageEstuaidntes !== 0) {
      totalEdades = totalEdades + 1;
    }
    if (this.averageEgresados !== 0) {
      totalEdades = totalEdades + 1;
    }
    if (this.averageDocentes !== 0) {
      totalEdades = totalEdades + 1;
    }
    if (totalEdades !== 0) {
      // tslint:disable-next-line:max-line-length
      this.promedioEdad = (this.averageAdminstrativos + this.averageDocentes + this.averageEgresados + this.averageEstuaidntes) / totalEdades;
    }

    this.promedioEdad = Math.floor(this.promedioEdad);
    if (this.promedioEdad === 0 && this.zero === 0) {
      this.ngOnInit();
      this.zero++;
    }
  }

  estudiantesPromedio() {
    this.profileService.getEstudiantes()
      .snapshotChanges().subscribe(item => {
        this.arrayEstudiantes = [];
        this.usuarios = [];
        item.forEach(element => {
          const x = element.payload.toJSON();
          x['$key'] = element.key;
          if (x['edad']) {
            const entero = Number(x['edad']);
            this.arrayEstudiantes.push(entero);
          }
        });
        let sum = 0;
        for (let x = 0; x < this.arrayEstudiantes.length; x++) {
          sum += this.arrayEstudiantes[x];
        }
        if (this.arrayEstudiantes.length !== 0) {
          this.averageEstuaidntes = sum / this.arrayEstudiantes.length;
          this.averageEstuaidntes = Math.floor(this.averageEstuaidntes);
        }
        // console.log(this.arrayEstudiantes, 'Promedio', this.averageEstuaidntes);
      });
  }

  docentesPromedio() {
    this.profileService.getDocentes()
      .snapshotChanges().subscribe(item => {
        this.arrayDocentes = [];
        this.usuarios = [];
        item.forEach(element => {
          const x = element.payload.toJSON();
          x['$key'] = element.key;
          if (x['edad']) {
            const entero = Number(x['edad']);
            this.arrayDocentes.push(entero);
          }
        });
        let sum = 0;
        for (let x = 0; x < this.arrayDocentes.length; x++) {
          sum += this.arrayDocentes[x];
        }
        if (this.arrayDocentes.length !== 0) {
          this.averageDocentes = sum / this.arrayDocentes.length;
          this.averageDocentes = Math.floor(this.averageDocentes);
        }
        // console.log(this.arrayDocentes, 'Promedio', this.averageDocentes);
      });
  }

  administrativosPromedio() {
    this.profileService.getAdministrativos()
      .snapshotChanges().subscribe(item => {
        this.arrayAdministrativos = [];
        this.usuarios = [];
        item.forEach(element => {
          const x = element.payload.toJSON();
          x['$key'] = element.key;
          if (x['edad']) {
            const entero = Number(x['edad']);
            this.arrayAdministrativos.push(entero);
          }
        });
        let sum = 0;
        for (let x = 0; x < this.arrayAdministrativos.length; x++) {
          sum += this.arrayAdministrativos[x];
        }
        if (this.arrayAdministrativos.length !== 0) {
          this.averageAdminstrativos = sum / this.arrayAdministrativos.length;
          this.averageAdminstrativos = Math.floor(this.averageAdminstrativos);
        }

        // console.log(this.arrayAdministrativos, 'Promedio', this.averageAdminstrativos);
      });
  }

  egresadosPromedio() {
    this.profileService.getEgresado()
      .snapshotChanges().subscribe(item => {
        this.arrayEgresados = [];
        this.usuarios = [];
        item.forEach(element => {
          const x = element.payload.toJSON();
          x['$key'] = element.key;
          if (x['edad']) {
            const entero = Number(x['edad']);
            this.arrayEgresados.push(entero);
          }
        });
        let sum = 0;
        for (let x = 0; x < this.arrayEgresados.length; x++) {
          sum += this.arrayEgresados[x];
        }
        if (this.arrayEgresados.length !== 0) {
          this.averageEgresados = sum / this.arrayEgresados.length;
          this.averageEgresados = Math.floor(this.averageEgresados);
        }
        // console.log(this.arrayEgresados, 'Promedio', this.averageEgresados);
      });
  }

  rankingProgramas() {
    // console.log('ÉNTRA!!!');
    this.profileService.getContadorProgramas()
      .snapshotChanges().subscribe(item => {
        this.arrayProgramas = [];
        this.arrayContadorProgramas = [];
        item.forEach(element => {
          const x = element.payload.toJSON();
          this.arrayProgramas.push(element.key);
          this.arrayContadorProgramas.push(x['contadorActualizado']);
        });
        this.reorderCounterProgram();
      });
  }

  reorderCounterProgram() {
    let pos1 = 0;
    let pos2 = 1;
    let pos3 = 2;
    for (let x = 2; x < this.arrayContadorProgramas.length; x++) {
      if (this.arrayContadorProgramas[x] > this.arrayContadorProgramas[pos1]) {
        pos3 = pos2;
        pos2 = pos1;
        pos1 = x;
      } else if (this.arrayContadorProgramas[x] > this.arrayContadorProgramas[pos2]) {
        pos3 = pos2;
        pos2 = x;
      } else if (this.arrayContadorProgramas[x] > this.arrayContadorProgramas[pos3]) {
        pos3 = x;
      }
    }
    this.programa1Nombre = this.arrayProgramas[pos1];
    this.programa2Nombre = this.arrayProgramas[pos2];
    this.programa3Nombre = this.arrayProgramas[pos3];

    this.programa1cuenta = this.arrayContadorProgramas[pos1];
    this.programa2cuenta = this.arrayContadorProgramas[pos2];
    this.programa3cuenta = this.arrayContadorProgramas[pos3];

    this.posición1Programa = pos1;
    this.posición2Programa = pos2;
    this.posición3Programa = pos3;
    // console.log('POSICION 1 => ', pos1, 'POSICION 2 => ', pos2, 'POSICION 3 => ', pos3);
  }

  listaAdministrativos() {
    this.rankingService.getAdminstrativos()
      .snapshotChanges().subscribe(item => {
        this.arrayNombresAdministrativo = [];
        this.arrayContadoresAdministrativo = [];
        item.forEach(element => {
          const x = element.payload.toJSON();
          this.arrayNombresAdministrativo.push(x['nombre']);
          this.arrayContadoresAdministrativo.push(Number(x['contador']));
          this.adminCorreoArray.push(x['correo']);
          this.arrayCorreoAdministrativo.push(x['programa']);
        });
        this.mejorAdministrativo();
        console.log('ARRAY DE ADMINISTRATIVOS', this.arrayNombresAdministrativo, this.arrayContadoresAdministrativo);
      });

    this.rankingService.getEstudiantes()
      .snapshotChanges().subscribe(item => {
        this.arrayNombresEstudiante = [];
        this.arrayContadoresEstudiante = [];
        item.forEach(element => {
          const x = element.payload.toJSON();
          this.arrayNombresEstudiante.push(x['nombre']);
          this.arrayContadoresEstudiante.push(Number(x['contador']));
          this.estudianteCorreoArray.push(x['correo']);
          this.arrayCorreoEstudiante.push(x['programa']);
        });
        this.mejorEstudiante();
        console.log('ARRAY DE Estudiantes', this.arrayNombresEstudiante, this.arrayContadoresEstudiante);
      });

    this.rankingService.getDocentes()
      .snapshotChanges().subscribe(item => {
        this.arrayNombresDocente = [];
        this.arrayContadoresDocente = [];
        item.forEach(element => {
          const x = element.payload.toJSON();
          this.arrayNombresDocente.push(x['nombre']);
          this.arrayContadoresDocente.push(Number(x['contador']));
          this.docenteCorreoArray.push(x['correo']);
          this.arrayCorreoDocente.push(x['programa']);
        });
        this.mejorDocente();
        console.log('ARRAY DE ADMINISTRATIVOS', this.arrayNombresDocente, this.arrayContadoresDocente);
      });

    this.rankingService.getEgresados()
      .snapshotChanges().subscribe(item => {
        this.arrayNombresEgresado = [];
        this.arrayContadoresEgresado = [];
        item.forEach(element => {
          const x = element.payload.toJSON();
          this.arrayNombresEgresado.push(x['nombre']);
          this.arrayContadoresEgresado.push(Number(x['contador']));
          this.egresadoCorreoArray.push(x['correo']);
          this.arrayCorreoEgresado.push(x['programa']);
        });
        this.mejorEgresado();
        console.log('ARRAY DE ADMINISTRATIVOS', this.arrayNombresEgresado, this.arrayContadoresEgresado);
      });
  }

  mejorAdministrativo() {
    let pos = 0;
    for (let x = 0; x < this.arrayNombresAdministrativo.length; x++) {
      if (this.arrayContadoresAdministrativo[x] > this.arrayContadoresAdministrativo[pos]) {
        pos = x;
      }
    }
    this.nombreAdministrativo = this.arrayNombresAdministrativo[pos];
    this.contadorAdministrativo = this.arrayContadoresAdministrativo[pos];
    this.correoAdministrativo = this.arrayCorreoAdministrativo[pos];
    const correo = this.adminCorreoArray[pos];
    this.getAdministrativoImage(correo);
    // console.log('La posición ganadora es: ', pos);
  }

  getAdministrativoImage(correo) {
    let key = '';
    console.log('SE BUSCA CON LA PERSONA', correo);
    this.rankingService.getAdminstrativos()
      .snapshotChanges().subscribe(item => {
        item.forEach(element => {
          const x = element.payload.toJSON();
          console.log(x['correo']);
          if (x['correo'] === correo) {
            key = element.key;
          }
        });
        this.profileService.getProfileImage(key).then(url => {
          this.dataAdministrativo = url;
          console.log('IMAGEEEN', this.dataAdministrativo);
        });
      });
  }

  mejorEstudiante() {
    let pos = 0;
    for (let x = 0; x < this.arrayNombresEstudiante.length; x++) {
      if (this.arrayContadoresEstudiante[x] > this.arrayContadoresEstudiante[pos]) {
        pos = x;
      }
    }
    this.estudiante = this.arrayNombresEstudiante[pos];
    this.estudianteUsos = this.arrayContadoresEstudiante[pos];
    console.log('La posición ganadora es: ', pos);
    this.correoEstudiante = this.arrayCorreoEstudiante[pos];
    const correo = this.estudianteCorreoArray[pos];
    this.getEstudianteImage(correo);
  }

  getEstudianteImage(correo) {
    let key = '';
    console.log('SE BUSCA CON LA PERSONA', correo);
    this.rankingService.getEstudiantes()
      .snapshotChanges().subscribe(item => {
        item.forEach(element => {
          const x = element.payload.toJSON();
          console.log(x['correo']);
          if (x['correo'] === correo) {
            key = element.key;
          }
        });
        this.profileService.getProfileImage(key).then(url => {
          this.dataEstudiante = url;
          console.log('IMAGEEEN', this.dataAdministrativo);
        });
      });
  }

  mejorDocente() {
    let pos = 0;
    for (let x = 0; x < this.arrayNombresDocente.length; x++) {
      if (this.arrayContadoresDocente[x] > this.arrayContadoresDocente[pos]) {
        pos = x;
      }
    }
    this.docente = this.arrayNombresDocente[pos];
    this.docenteUsos = this.arrayContadoresDocente[pos];
    this.correoDocente = this.arrayCorreoDocente[pos];
    const correo = this.docenteCorreoArray[pos];
    this.getDocenteImage(correo);
    console.log('La posición ganadora es: ', pos);
  }

  getDocenteImage(correo) {
    let key = '';
    console.log('SE BUSCA CON LA PERSONA', correo);
    this.rankingService.getDocentes()
      .snapshotChanges().subscribe(item => {
        item.forEach(element => {
          const x = element.payload.toJSON();
          console.log(x['correo']);
          if (x['correo'] === correo) {
            key = element.key;
          }
        });
        this.profileService.getProfileImage(key).then(url => {
          this.dataDocente = url;
          console.log('IMAGEEEN', this.dataAdministrativo);
        });
      });
  }

  mejorEgresado() {
    let pos = 0;
    for (let x = 0; x < this.arrayNombresEgresado.length; x++) {
      if (this.arrayContadoresEgresado[x] > this.arrayContadoresEgresado[pos]) {
        pos = x;
      }
    }
    this.egresado = this.arrayNombresEgresado[pos];
    this.egresadoUsos = this.arrayContadoresEgresado[pos];
    this.correoEgresado = this.arrayCorreoEgresado[pos];
    const correo = this.egresadoCorreoArray[pos];
    this.getEgresadoImage(correo);
    console.log('La posición ganadora es: ', pos);
  }

  getEgresadoImage(correo) {
    let key = '';
    console.log('SE BUSCA CON LA PERSONA', correo);
    this.rankingService.getEgresados()
      .snapshotChanges().subscribe(item => {
        item.forEach(element => {
          const x = element.payload.toJSON();
          console.log(x['correo']);
          if (x['correo'] === correo) {
            key = element.key;
          }
        });
        this.profileService.getProfileImage(key).then(url => {
          this.dataEgresado = url;
          console.log('IMAGEEEN', this.dataAdministrativo);
        });
      });
  }

  rankingRefencias() {
    // Refencias Normas ICONTEC
    this.referenciaService.getRefIcontec()
      .snapshotChanges().subscribe(item => {
        this.arrayRefenciaIcontec = [];
        this.arrayRefenciaContadorIcontec = [];
        item.forEach(element => {
          const x = element.payload.toJSON();
          this.arrayRefenciaIcontec.push(element.key);
          this.arrayRefenciaContadorIcontec.push(x['contador']);
        });
        this.topReferenceIcontec();
      });

    // Refencias Normas APA
    this.referenciaService.getRefApa()
      .snapshotChanges().subscribe(item => {
        this.arrayRefenciaApa = [];
        this.arrayRefenciaContadorApa = [];
        item.forEach(element => {
          const x = element.payload.toJSON();
          this.arrayRefenciaApa.push(element.key);
          this.arrayRefenciaContadorApa.push(x['contador']);
        });
        this.topReferenceApa();
      });

    // Refencias Normas IEEE
    this.referenciaService.getRefIeee()
      .snapshotChanges().subscribe(item => {
        this.arrayRefenciaIeee = [];
        this.arrayRefenciaContadorIeee = [];
        item.forEach(element => {
          const x = element.payload.toJSON();
          this.arrayRefenciaIeee.push(element.key);
          this.arrayRefenciaContadorIeee.push(x['contador']);
        });
        this.topReferenceIeee();
      });

  }

  topReferenceIcontec() {
    let pos1 = 0;
    for (let x = 1; x < this.arrayRefenciaIcontec.length; x++) {
      if (this.arrayRefenciaContadorIcontec[x] > this.arrayRefenciaContadorIcontec[pos1]) {
        pos1 = x;
      }
    }
    this.referenciaIcontecTop = this.arrayRefenciaIcontec[pos1];
    this.contadorIcontecTop = this.arrayRefenciaContadorIcontec[pos1];
    console.log('Icontec Top1 => ', this.referenciaIcontecTop, 'Cont: ', this.contadorIcontecTop);
  }

  topReferenceApa() {
    let pos1 = 0;
    for (let x = 1; x < this.arrayRefenciaApa.length; x++) {
      if (this.arrayRefenciaContadorApa[x] > this.arrayRefenciaContadorApa[pos1]) {
        pos1 = x;
      }
    }
    this.referenciaApaTop = this.arrayRefenciaApa[pos1];
    this.contadorApaTop = this.arrayRefenciaContadorApa[pos1];
    console.log('APA Top1 => ', this.referenciaApaTop, 'Cont: ', this.contadorApaTop);
  }

  topReferenceIeee() {
    let pos1 = 0;
    for (let x = 1; x < this.arrayRefenciaIeee.length; x++) {
      if (this.arrayRefenciaContadorIeee[x] > this.arrayRefenciaContadorIeee[pos1]) {
        pos1 = x;
      }
    }
    this.referenciaIeeeTop = this.arrayRefenciaIeee[pos1];
    this.contadorIeeeTop = this.arrayRefenciaContadorIeee[pos1];
    console.log('IEEE Top1 => ', this.referenciaIeeeTop, 'Cont: ', this.contadorIeeeTop);
  }

}
