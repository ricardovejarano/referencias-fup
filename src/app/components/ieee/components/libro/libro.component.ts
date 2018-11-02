import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { Referencia } from 'src/app/models/referencia.model';
import { PerfilService } from 'src/app/services/perfil.service';
import { RankingService } from 'src/app/services/ranking.service';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css']
})
export class LibroComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  ejemplo = 'G. F. Knoll. Radiation detection and measurement, 4th ed. Hoboken (N.J.): John Wiley & Sons, 2010.';
  nombre = '';
  apellido = '';
  titulo = '';
  ciudad = '';
  editorial = '';
  edicion = '';
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
  contadorNobody = 0;

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
      this.getCounterNobody();
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
            this.getCounterPerson();
            if (this.rolUsuario !== 'administrativo') {
              console.log('ROL', this.rolUsuario);
              this.getProgram();
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
    this.rankingService.getContadorReferencia('ieee', 'libro')
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
    this.rankingService.addCounterReference('ieee', 'libro', this.contadorReferencia)
      .then(res => {
        console.log(res);
      }, err => {
        console.log('Error', err);
      });
  }

  saveHistory() {
    this.referencia.cita = this.referenciaFinal;
    this.referencia.referencia = 'IEEE';
    this.referencia.subReferencia = 'Libro';
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

  getCounterNobody() {
    this.rankingService.getNobodyCounter()
    .snapshotChanges().subscribe(item => {
      item.forEach(element => {
        const x = element.payload.toJSON();
        if (element.key === 'contador') {
          this.contadorNobody = Number(x);
        }
      });
    });
  }

  addCounterNobody() {
    this.rankingService.addNobodyCounter(this.contadorNobody)
    .then(res => {
      console.log('Se registra evento');
    }, err => {
      console.log('Ocurrió un error', err);
    });
  }

  addReference() {
    this.addCounterReference();
    if (localStorage.getItem('logged') === 'true') {
      this.addCountProgram();
      this.addCountPerson();
    } else {
      this.addCounterNobody();
    }
    this.referenciaFinal = '';

    for (let z = 0; z < this.nombres.length; z++) {
      if (this.nombres[z].value) {
        this.referenciaFinal += this.nombres[z].value.toUpperCase() + '. ';
      }
      if (this.apellidos[z].value) {
        if (z !== (this.apellidos.length - 1) && this.apellidos.length !== 1) {
          this.referenciaFinal += this.apellidos[z].value[0].toUpperCase() + this.apellidos[z].value.substr(1).toLocaleLowerCase() + ', ';
        } else {
          this.referenciaFinal += this.apellidos[z].value[0].toUpperCase() + this.apellidos[z].value.substr(1).toLocaleLowerCase() + '. ';
        }
      }
    }

    if (this.titulo) {
      this.referenciaFinal += this.titulo + ', ';
    }

    if (this.edicion) {
      this.referenciaFinal += this.edicion + '. ';
    }

    if (this.ciudad) {
      this.referenciaFinal += this.ciudad + ': ';
    }

    if (this.editorial) {
      this.referenciaFinal += this.editorial + ', ';
    }

    if (this.anioPublicacion) {
      this.referenciaFinal += this.anioPublicacion + '.';
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
