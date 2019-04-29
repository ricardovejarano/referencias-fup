import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { Referencia } from 'src/app/models/referencia.model';
import { PerfilService } from 'src/app/services/perfil.service';
import { RankingService } from 'src/app/services/ranking.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-informe-tecnico',
  templateUrl: './informe-tecnico.component.html',
  styleUrls: ['./informe-tecnico.component.css']
})
export class InformeTecnicoComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  ejemplo = 'K. E. Elliott y C.M. Greene, "A local adaptive protocol," Argonne National Laboratory, Francia, Informe Técnico 916-1010-BB, 1997.';
  nombre = '';
  apellido = '';
  titulo = '';
  numero = 0;
  pais = '';
  responsable = '';
  userRegister = false;
  anio = [];
  anioPublicacion = 0;


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

  constructor(public profileService: PerfilService, public rankingService: RankingService,
    private toastr: ToastrService) {
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
            this.getValueConunterProgram();
          });
        break;
    }
  }

  getValueConunterProgram() {
    if (localStorage.getItem('logged') === 'true') {
      this.profileService.getContadorProgramas()
        .snapshotChanges().subscribe(item => {
          item.forEach(element => {
            const x = element.payload.toJSON();
            if (element.key === this.programa) {
              this.contadorPrograma = Number(x['contadorActualizado']);
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
    this.rankingService.getContadorReferencia('ieee', 'informe-tecnico')
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

      }, err => {
        console.log('Error', err);
      });
  }

  addCountPerson() {
    this.rankingService.addCounterPerson(this.rolUsuario, this.keyAdmin, this.contadorPersona)
      .then(res => {

      }, err => {
        console.log('Error', err);
      });
  }

  addCounterReference() {
    this.rankingService.addCounterReference('ieee', 'informe-tecnico', this.contadorReferencia)
      .then(res => {

      }, err => {
        console.log('Error', err);
      });
  }

  saveHistory() {
    this.referencia.cita = this.referenciaFinal;
    this.referencia.referencia = 'IEEE';
    this.referencia.subReferencia = 'Informe técnico';
    this.rankingService.addReference(this.rolUsuario, this.keyAdmin, this.referencia)
      .then(res => {

        window.alert('Cita guardada');
      }, err => {
        console.log('Error', err);
      });
  }


  addAuthor() {
    if (this.nombres[this.nombres.length - 1].value !== '') {
      this.nombres.push({ value: '' });
      this.apellidos.push({ value: '' });
    }
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
      }, err => {
        console.log('Ocurrió un error', err);
      });
  }

  addReference() {
    this.referenciaFinal = '';

    for (let z = 0; z < this.nombres.length; z++) {
      if (this.nombres[z].value) {
        this.referenciaFinal += this.nombres[z].value.toUpperCase() + '. ';
      }
      if (this.apellidos[z].value) {
        if (z !== (this.apellidos.length - 1) && this.apellidos.length !== 1) {
          this.referenciaFinal += this.apellidos[z].value[0].toUpperCase() + this.apellidos[z].value.substr(1).toLocaleLowerCase() + ', y ';
        } else {
          this.referenciaFinal += this.apellidos[z].value[0].toUpperCase() + this.apellidos[z].value.substr(1).toLocaleLowerCase() + '. ';
        }
      }
    }


    if (this.titulo) {
      this.referenciaFinal += '"' + this.titulo + '", ';
    }

    if (this.responsable) {
      this.referenciaFinal += this.responsable + ', ';
    }

    if (this.pais) {
      this.referenciaFinal += this.pais + ',';
    }

    if (this.numero) {
      this.referenciaFinal += ' Informe Tecnico ' + this.numero + ', ';
    }

    if (this.anioPublicacion) {
      this.referenciaFinal += this.anioPublicacion + '.';
    }
    if (this.referenciaFinal.length > 5 && this.referenciaFinal !== localStorage.getItem('prevReference')) {
      this.addCounterReference();
      if (localStorage.getItem('logged') === 'true') {
        this.addCountProgram();
        this.addCountPerson();
      } else {
        this.addCounterNobody();
      }
      this.toastr.success('Referencia generada');
    }
    localStorage.setItem('prevReference', this.referenciaFinal);

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
