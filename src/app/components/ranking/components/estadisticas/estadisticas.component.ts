import { Component, OnInit } from '@angular/core';
import { PerfilService } from 'src/app/services/perfil.service';
import { Usuario } from 'src/app/models/usuario.model';

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


  constructor(public profileService: PerfilService) { }

  ngOnInit() {
    this.estudiantesPromedio();
    this.docentesPromedio();
    this.administrativosPromedio();
    this.egresadosPromedio();
    setTimeout(() => {
      this.edadPromedio();
    }, 1000);
  }

  edadPromedio() {
    this.promedioEdad = (this.averageAdminstrativos + this.averageDocentes + this.averageEgresados + this.averageEstuaidntes) / 4;
    this.promedioEdad = Math.floor(this.promedioEdad);
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
        this.averageEstuaidntes = sum /  this.arrayEstudiantes.length;
        console.log(this.arrayEstudiantes, 'Promedio', this.averageEstuaidntes);
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
        this.averageDocentes = sum /  this.arrayDocentes.length;
        console.log(this.arrayDocentes, 'Promedio', this.averageDocentes);
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
        this.averageAdminstrativos = sum /  this.arrayAdministrativos.length;
        console.log(this.arrayAdministrativos, 'Promedio', this.averageAdminstrativos);
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
        this.averageEgresados = sum /  this.arrayEgresados.length;
        console.log(this.arrayEgresados, 'Promedio', this.averageEgresados);
      });
  }

}
