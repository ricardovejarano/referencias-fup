import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { Referencia } from 'src/app/models/referencia.model';
import { PerfilService } from 'src/app/services/perfil.service';
import { RankingService } from 'src/app/services/ranking.service';

@Component({
  selector: 'app-tesis',
  templateUrl: './tesis.component.html',
  styleUrls: ['./tesis.component.css']
})
export class TesisComponent implements OnInit {
  // tslint:disable-next-line:max-line-length
  ejemplo = 'Aponte, L, & Cardona, C. (2009). Educación ambiental y evaluación de la densidad poblacional para la conservación de los cóndores reintroducidos en el Parque Nacional Natural Los Nevados y su zona amortiguadora (tesis de pregrado). Universidad de Caldas, Manizales, Colombia.';
  nombre = '';
  apellido = '';
  titulo = '';
  tipoTesis = '';
  institucion = '';
  ciudad = '';
  pais = '';

  anioPublicacion = 0;
  userRegister = false;
  anio = [];

  nombres = [{ value: '' }];
  apellidos = [{ value: '' }];

  referenciaFinal = '';
  keyAdmin = '';
  rolUsuario = '';
  usuarios: Usuario[];
  referencia: Referencia = new Referencia();
  programa = '';
  contadorPrograma = 0;
  contadorPersona = 0;
  contadorReferencia = 0;

  constructor(public profileService: PerfilService, public rankingService: RankingService) {
    this.keyAdmin = localStorage.getItem('uid');
  }

  ngOnInit() {
    this.getArray();
    this.getCounterReference();
    if (localStorage.getItem('logged') === 'true') {
      this.userRegister = true;
      this.getRol();
    } else {
      console.log('NO ENTRA');
    }
  }

  getRol() {
    this.profileService.getRol()
      .snapshotChanges().subscribe(item => {
        item.forEach(element => {
          const x = element.payload.toJSON();
          if (element.key === this.keyAdmin) {
            this.rolUsuario = x.toString();
            if (this.rolUsuario !== 'administrativo') {
              console.log('ROL', this.rolUsuario);
              this.getProgram();
              this.getCounterPerson();
            }
          }
        });
      });
  }

  getProgram() {
    switch (this.rolUsuario) {
      case 'estudiante':
        this.profileService.getEstudiantes()
          .snapshotChanges().subscribe(item => {
            this.usuarios = [];
            item.forEach(element => {
              const x = element.payload.toJSON();
              if (element.key === this.keyAdmin) {
                x['$key'] = element.key;
                if (x['programa']) {
                  this.programa = x['programa'];
                }
              }
            });
            console.log('Programa', this.programa);
            this.getValueConunterProgram();
          });
        break;
      case 'docente':
        this.profileService.getDocentes()
          .snapshotChanges().subscribe(item => {
            this.usuarios = [];
            item.forEach(element => {
              const x = element.payload.toJSON();
              x['$key'] = element.key;
              if (x['programa']) {
                this.programa = x['programa'];
              }
            });
            console.log('Programa', this.programa);
            this.getValueConunterProgram();
          });
        break;
      case 'egresado':
        this.profileService.getEgresado()
          .snapshotChanges().subscribe(item => {
            this.usuarios = [];
            item.forEach(element => {
              const x = element.payload.toJSON();
              x['$key'] = element.key;
              if (x['programa']) {
                this.programa = x['programa'];
              }
            });
            console.log('Programa', this.programa);
            this.getValueConunterProgram();
          });
        break;
    }
  }

  getValueConunterProgram() {
    if (localStorage.getItem('logged') === 'true') {
      console.log('ÉNTRA!!!');
      this.profileService.getContadorProgramas()
        .snapshotChanges().subscribe(item => {
          item.forEach(element => {
            const x = element.payload.toJSON();
            if (element.key === this.programa) {
              this.contadorPrograma = Number(x['contadorActualizado']);
              console.log('VALOR', this.contadorPrograma);
            }
          });
        });
    }
  }

  getCounterPerson() {
    this.rankingService.getContadorPersona(this.keyAdmin, this.rolUsuario)
      .snapshotChanges().subscribe(item => {
        item.forEach(element => {
          const x = element.payload.toJSON();
          if (element.key === 'contador') {
            this.contadorPersona = Number(x);
          }
        });
      });
  }

  getCounterReference() {
    this.rankingService.getContadorReferencia('apa', 'tesis')
      .snapshotChanges().subscribe(item => {
        item.forEach(element => {
          const x = element.payload.toJSON();
          this.contadorReferencia = Number(x);
        });
      });
  }

  addCountProgram() {

    this.rankingService.addCounterProgram(this.programa, this.contadorPrograma)
      .then(res => {
        console.log(res);
      }, err => {
        console.log('Error', err);
      });
  }

  addCountPerson() {
    this.rankingService.addCounterPerson(this.rolUsuario, this.keyAdmin, this.contadorPersona)
      .then(res => {
        console.log(res);
      }, err => {
        console.log('Error', err);
      });
  }

  addCounterReference() {
    this.rankingService.addCounterReference('apa', 'tesis', this.contadorReferencia)
      .then(res => {
        console.log(res);
      }, err => {
        console.log('Error', err);
      });
  }

  saveHistory() {
    this.referencia.cita = this.referenciaFinal;
    this.referencia.referencia = 'APA';
    this.referencia.subReferencia = 'Tesis';
    this.rankingService.addReference(this.rolUsuario, this.keyAdmin, this.referencia)
      .then(res => {
        console.log(res);
        window.alert('Cita guardada');
      }, err => {
        console.log('Error', err);
      });
  }

  addAuthor() {
    this.nombres.push({ value: '' });
    this.apellidos.push({ value: '' });
  }

  quitAuthor(index) {
    this.nombres.splice(index, 1);
    this.apellidos.splice(index, 1);
  }

  getArray() {

    for (let x = 1940; x < 2020; x++) {
      this.anio.push(x);
    }
  }

  addReference() {
    this.referenciaFinal = '';

    for (let z = 0; z < this.nombres.length; z++) {
      if (this.apellidos[z].value) {
        this.referenciaFinal += this.apellidos[z].value.toUpperCase() + '. ';
      }
      if (this.nombres[z].value) {
        if (z !== (this.nombres.length - 1) && this.nombres.length !== 1) {
          this.referenciaFinal += this.nombres[z].value[0].toUpperCase() + this.nombres[z].value.substr(1).toLocaleLowerCase() + ', & ';
        } else {
          this.referenciaFinal += this.nombres[z].value[0].toUpperCase() + this.nombres[z].value.substr(1).toLocaleLowerCase() + '. ';
        }
      }
    }

    if (this.anioPublicacion) {
      this.referenciaFinal += '(' + this.anioPublicacion + '). ';
    }

    if (this.titulo) {
      this.referenciaFinal += this.titulo;
    }


    if (this.tipoTesis) {
      this.referenciaFinal += ' (' + this.tipoTesis + ')';
    }

    if (this.institucion) {
      this.referenciaFinal += '. ' + this.institucion + ', ';
    }

    if (this.ciudad) {
      this.referenciaFinal += this.ciudad + ', ';
    }

    if (this.pais) {
      this.referenciaFinal += this.pais + '. ';
    }

  }

  copyInputMessage(inputElement) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

  resetForm(validForm?: NgForm) {
    if (validForm != null) {
      validForm.reset();
    }
  }
}
