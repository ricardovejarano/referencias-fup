import { Component, OnInit } from '@angular/core';
import { PerfilService } from 'src/app/services/perfil.service';
import { Usuario } from 'src/app/models/usuario.model';
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

  // Usuario que más usa la aplicación
  estudiante = '';
  estudianteUsos = 0;
  administrativo = '';
  administrativoUsos = 0;
  egresado = '';
  egresadoUsos = 0;
  docente = '';
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


  constructor(public profileService: PerfilService, public rankingService: RankingService) { }

  ngOnInit() {
    this.estudiantesPromedio();
    this.docentesPromedio();
    this.administrativosPromedio();
    this.egresadosPromedio();
    this.rankingProgramas();
    this.listaAdministrativos();
    setTimeout(() => {
      this.edadPromedio();
    }, 1000);
  }

  edadPromedio() {
    this.promedioEdad = (this.averageAdminstrativos + this.averageDocentes + this.averageEgresados + this.averageEstuaidntes) / 4;
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
        this.averageEstuaidntes = sum / this.arrayEstudiantes.length;
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
        this.averageDocentes = sum / this.arrayDocentes.length;
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
        this.averageAdminstrativos = sum / this.arrayAdministrativos.length;
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
        this.averageEgresados = sum / this.arrayEgresados.length;
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
        });
        this.mejorAdministrativo();
        console.log('ARRAY DE ADMINISTRATIVOS', this.arrayNombresAdministrativo, this.arrayContadoresAdministrativo);
      });
  }

  mejorAdministrativo() {
    let pos = 0;
    for (let x = 0; x < this.arrayNombresAdministrativo.length; x++) {
      if (this.arrayContadoresAdministrativo[x] > this.arrayContadoresAdministrativo[pos]) {
        pos = x;
      }
    }
    console.log('La posición ganadora es: ', pos);
  }

}
